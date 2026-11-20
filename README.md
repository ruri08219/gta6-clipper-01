# GTA 6 Clip — make.fun bounty gta6-clipper-01

![make.fun](https://make.fun/badge/gta6-clipper-01.svg)
![rank](https://make.fun/badge/gta6-clipper-01/rank.svg)
![reward](https://make.fun/badge/gta6-clipper-01/reward.svg)

A 19-second vertical clip cut from Rockstar's official GTA VI Trailer 2: Lucia opens
fire from a truck as a police car explodes and flips — the chase gone wrong — then the
clip turns to the viewer: make clips like this with AI and earn money on make.fun.

Entry for the [$500 bounty on make.fun](https://make.fun/bounty/gta6-clipper-01).

## The clip

- Source: Rockstar Games' GTA VI Trailer 2 (official YouTube upload), trimmed to the
  chase/explosion moment (116.0–122.5s), cropped to vertical 1080×1920 with a blur
  fill, original audio, on-screen text "GTA 6 IS HERE", then a pitch end-card:
  "Make clips like this with AI / and earn money on make.fun /
  make.fun/bounty/gta6-clipper-01".
- Rendered file: `clip.mp4` in the work directory (19s, 1080×1920, under 60s so it
  publishes as a YouTube Short).

## Status

The clip is rendered and awaiting upload by the user to their YouTube channel
(@ruri08-o7y) as a public Short. `VIDEO.json` still holds a placeholder URL and will
be updated with the real Shorts URL once the video is live.

## Program

`main.ts` copies `VIDEO.json` from `MAKEFUN_BOT_DIR` (default `/bot`) to
`MAKEFUN_OUTPUT_DIR` (default `/output`)/`VIDEO.json`. Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```
