#!/usr/bin/env bash
set -euo pipefail

case "$(uname -s)" in
  Darwin*) TARGET="$HOME/.claude/skills" ;;
  Linux*) TARGET="${XDG_CONFIG_HOME:-$HOME/.config}/claude/skills" ; [ -d "$TARGET" ] || TARGET="$HOME/.claude/skills" ;;
  *) echo "Unsupported OS." ; exit 1 ;;
esac

for skill in resume resume-score resume-jd-tune; do
  if [ -d "$TARGET/$skill" ]; then
    rm -rf "$TARGET/$skill"
    echo "  [removed] $skill"
  fi
done
echo "Done."
