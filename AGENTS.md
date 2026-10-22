# MeditationSquares: notes for agents

A browser instrument built with p5.js and p5.sound (NYU ITP Creative Computing, 2017). Eight looping sounds are triggered from the keyboard, with a Kalinda-inspired animated background. See [README.md](README.md) for the intent and inspiration. Live at https://adamnnagy.github.io/MeditationSquares/.

## Running it

There is no build step, package manager or test suite. It is plain `<script>` tags in [index.html](index.html).

- Serve the folder over HTTP, e.g. `python3 -m http.server`, and open `index.html`. Don't open it as `file://`: `loadSound` fetches the WAVs and fails there.
- Loading takes a while because the WAVs are large and there is no loading screen (a listed TODO).
- Browsers block audio until a user gesture. The first keypress or click starts the audio context.
- Verify changes in a real browser. Nothing can be checked headlessly except syntax (`node --check file.js`).

## Layout

Scripts load in this order (order matters, they share globals):

| File | Role |
|---|---|
| `libraries/` | Vendored p5.js, p5.sound.js, p5.dom.js (dom is not loaded). Don't edit. |
| [audio.js](audio.js) | Sound config and loading: `keys`, `reverbKeys`, `volumes`, `description`, `preload()`, the `myAudio` class, the global `amplitude`. |
| [rectangles.js](rectangles.js) | `Rectangle`: a centered square that rotates with `frameCount` and `mouseY`. |
| [introtext.js](introtext.js) | `introText`: the key instructions, which fade out. |
| [controls.js](controls.js) | `keyPressed()` and `mouseClicked()`. |
| [visuals.js](visuals.js) | `setup()` and `draw()`: background squares, per-sound progress bars, intro text, panning. |
| `sounds/` | 8 mono/stereo 48 kHz WAVs: 4 guitar samples (~12 s) and 4 nature loops (14-39 s). |

## How the pieces connect

- **Index alignment.** `sounds[]`, `soundsClass[]`, `keys`, `reverbKeys`, `volumes` and `description` are parallel arrays. Index 0-3 are guitars, 4-7 are nature. To add or reorder a sound, change all of them together. `visuals.js` also assumes `i < 4` means guitar when panning.
- **`myAudio`** wraps one sound: `key`, `reverbKey`, `volume`, one `p5.Reverb` created up front, and `reverbOn`.
- **Keys** are single characters matched via `key.toLowerCase()` (not `keyCode`, which differs across browsers and layouts). Music: `a s d f j k l ;`. Reverb: `q w e r u i o p`, in the same order.
- **Playback.** A music key loops the sound at its configured volume, or stops it if playing. A mouse click stops everything.
- **Reverb toggle.** On: `audioFile.disconnect()` then `reverb.process(...)`. Off: `reverb.disconnect()` then `audioFile.connect()`. Always go through `reverbOn` so the routing and the flag stay in sync, and never create a new `p5.Reverb` per toggle (they leak and stack).
- **Mouse.** `mouseX` sets the background gradient and stereo panning (guitars pan one way, nature the opposite way). `mouseY` sets the rotation speed.
- **Amplitude.** The global `p5.Amplitude` level, mapped 0 to 0.15, blends the outer squares from blue toward yellow.
- **Progress bars** use `currentTime() / duration()`, so keep loops as proper full-length files.
- **Intro text** stays until the first keypress (`firstRun` in `visuals.js`), then fades out.

## Gotchas

- Volumes are very low (0.001 to 0.1) because the WAVs are loud. Tune them by ear if you re-encode assets.
- Globals are used freely (`item`, `colorFrom1`, `myIntroText`, ...). Check for name clashes before adding one.
- `draw()` calls `translate()` after its `pop()` and never resets it. The sound-bar section depends on that, so keep the order in mind when you reorganize.
- `visuals.js` logs `version 1.1` in `setup()`. Bump it if you want to track deploys.
- Deploys come from `master` (GitHub Pages). Remote: `git@github.com:adamnnagy/MeditationSquares.git`. Other branches: `dev`, `loading-screen`.

## Conventions

Match the existing style: `var`, function-prototype classes, 2-space indent, minimal comments. Don't introduce a bundler or modules without being asked.
