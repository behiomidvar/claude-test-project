# StorePromo audio

> **`temp-music.wav` is a GENERATED TEMP TRACK, not the final music.** It was
> synthesised in code so there is no licensing risk and every beat is known
> exactly. Replace it with a licensed track before release.

| File | What |
|---|---|
| `temp-music.wav` | 30.000 s, 96 BPM, 4/4, D major, 48 beats. Warm pad, soft e-piano, light low pulse; no drum kit, risers or whooshes. Follows the story's beat-snapped scenes: S1 hook b0–5 (three-note "dots" figure at 0) · S2 account montage b5–15 (brisk but soft eighths, pulse every beat) · S3 discover b15–22 (eases down) · S4 like with a message b22–29 (sparse eighths, room for typing ticks) · S5 b29–34 (held suspension for "a day later", small swell blooming on b32 = 20.0 s, the match chime) · S6 conversation b34–43 (slowest, quietest; suspension on b42) · S7 resolve to Dadd9 on b43 = 26.875 s (the logo). Stem at about -16 LUFS; the master to -14 LUFS happens in the mix. |
| `temp-music.beats.json` | Its beat map (`"source": "generated"`): 48 beats, 12 downbeats, and the events `timePass` 18.125, `swellStart` 19.375, `match` 20.0, `suspension` 26.25, `resolve` 26.875. Times in seconds; the timeline converts to frames. |
| `sfx/tick-1..4.wav` | Typing ticks (very short, soft; their level is set in the mix). |
| `sfx/pop.wav` | Soft pop for bubble entrances. |
| `sfx/chime.wav` | The one gentle chime for the match. |
| `sfx/logo-tone.wav` | Low warm tone under the logo reveal. |

All files are 48 kHz, 16-bit stereo. SFX are peak-normalized to -6 dBFS.

## Regenerate

```sh
python3 scripts/audio/gen_temp_music.py   # temp-music.wav + temp-music.beats.json
python3 scripts/audio/gen_sfx.py          # sfx/*.wav
```

Both are deterministic (fixed RNG seed). Needs `numpy scipy soundfile pyloudnorm`
(and `librosa` for detection).

## Swap in a licensed track

1. Put the file here, e.g. `assets/audio/licensed.wav`.
2. Detect its beats into the same schema (`"source": "detected"`):
   ```sh
   python3 scripts/audio/detect_beats.py assets/audio/licensed.wav --bpm-hint <tempo>
   ```
   This writes `assets/audio/licensed.beats.json`. Check the BPM and the
   downbeats it reports; fix by hand if the track has a pickup or tempo changes.
3. Point the `MUSIC` constant in `src/store/audio.ts` at the new file and beat
   map. The timeline snaps its cues (scene cuts, headline reveals, bubble
   entrances) to the nearest beats of the new map, so it re-snaps on its own.
4. Re-render and re-check the cuts against the music and the loudness of the
   master.
