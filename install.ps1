# install.ps1 - Install the claude-resume skill on Windows.
# Run with: powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot
$Target = "$env:USERPROFILE\.claude\skills"

Write-Host "Claude Resume installer"
Write-Host "  source : $ScriptDir"
Write-Host "  target : $Target"
Write-Host ""

if (-not (Test-Path $Target)) {
  New-Item -ItemType Directory -Force -Path $Target | Out-Null
}

Get-ChildItem "$ScriptDir\skills" -Directory | ForEach-Object {
  $name = $_.Name
  $dest = Join-Path $Target $name
  if (Test-Path $dest) {
    Write-Host "  [skip] $name (already installed at $dest)"
  } else {
    Copy-Item -Recurse -Path $_.FullName -Destination $dest
    Write-Host "  [ok]   $name"
  }
}

# Verify Node + docx
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "  [warn] node not found. Install Node.js 18+ to use the DOCX builder."
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
  $hasDocx = (npm list -g --depth=0 docx 2>$null) -match "docx@"
  if (-not $hasDocx) {
    Write-Host ""
    Write-Host "  Installing docx package globally (one-time)..."
    npm install -g docx --silent
  }
}

# Verify Python
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "  [warn] python not found. Install Python 3.9+ to use /resume score."
}

Write-Host ""
Write-Host "Done. Restart Claude Code and try:"
Write-Host "  /resume build"
Write-Host "  /resume score path\to\resume.docx"
