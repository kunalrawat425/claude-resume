$ErrorActionPreference = "Stop"
$Target = "$env:USERPROFILE\.claude\skills"

foreach ($skill in @("resume", "resume-score", "resume-jd-tune")) {
  $path = Join-Path $Target $skill
  if (Test-Path $path) {
    Remove-Item -Recurse -Force $path
    Write-Host "  [removed] $skill"
  }
}
Write-Host "Done."
