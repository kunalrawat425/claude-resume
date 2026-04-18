# Screenshots

Images referenced by the main README.md. Add your own when you fork.

Expected files:

- `cover-image.png` — 1200×630 cover image shown at the top of the README. Suggested: resume mockup + "Claude Resume" + target-role ribbon. Keep filesize under 300 KB.
- `resume-command-demo.gif` — ~10 s animated GIF of running `/resume build` end-to-end.
- `resume-build-demo.gif` — ~5 s animated GIF showing a before/after resume side-by-side.

Until you add real assets, the README links will 404 on GitHub — this is harmless, the repo still installs fine. Replace them with real screenshots before promoting the repo.

## How to capture

- **Asciinema** for terminal demos: `asciinema rec` then `agg demo.cast demo.gif` (via [`agg`](https://github.com/asciinema/agg)).
- **Screen recording** on macOS: Cmd+Shift+5 → record region → open in QuickTime → export as GIF via `ffmpeg`.
- **Cover image**: Figma → 1200×630 canvas → export as PNG with `-q 85` through `pngquant` for size.

## Optimization

```bash
pngquant --quality 65-80 cover-image.png -o cover-image.png
gifsicle -O3 --lossy=80 demo.gif -o demo.gif
```
