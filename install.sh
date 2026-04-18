#!/usr/bin/env bash
# install.sh - Install the claude-resume skill into Claude Code's skills directory.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_NAME="resume"

# Claude Code skills locations (platform-specific)
case "$(uname -s)" in
  Darwin*)
    TARGET="$HOME/.claude/skills"
    ;;
  Linux*)
    TARGET="${XDG_CONFIG_HOME:-$HOME/.config}/claude/skills"
    [ -d "$TARGET" ] || TARGET="$HOME/.claude/skills"
    ;;
  *)
    echo "Unsupported OS. Use the PowerShell installer on Windows."
    exit 1
    ;;
esac

echo "Claude Resume installer"
echo "  source : $SCRIPT_DIR"
echo "  target : $TARGET"
echo

mkdir -p "$TARGET"

# Install the primary skill and any sub-skills
for skill in "$SCRIPT_DIR/skills"/*/; do
  name="$(basename "$skill")"
  dest="$TARGET/$name"
  if [ -d "$dest" ]; then
    echo "  [skip] $name (already installed at $dest)"
    continue
  fi
  cp -r "$skill" "$dest"
  echo "  [ok]   $name"
done

# Verify Node and docx package for the DOCX builder
if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  [warn] node not found. Install Node.js 18+ to use the DOCX builder."
fi

if command -v npm >/dev/null 2>&1; then
  if ! npm list -g --depth=0 docx >/dev/null 2>&1; then
    echo
    echo "  Installing docx package globally (one-time)..."
    npm install -g docx --silent || echo "  [warn] docx install failed. Run 'npm install -g docx' manually."
  fi
fi

# Verify Python for the score estimator
if ! command -v python3 >/dev/null 2>&1; then
  echo
  echo "  [warn] python3 not found. Install Python 3.9+ to use /resume score."
fi

echo
echo "Done. Restart Claude Code and try:"
echo "  /resume                         # build from scratch"
echo "  /resume path/to/resume.docx     # rewrite existing"
echo "  /resume-score path/to/resume.docx"
