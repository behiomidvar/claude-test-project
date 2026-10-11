# Pending — rulings made here that have not reached the app

**This project's output is not automatically visible downstream.** The app project carries its own `_ds/` copy of this design system. Nothing written here propagates to it. A ruling made in this project is **unreached** until someone copies it by hand into `_ds/`, and neither project reports the gap on its own — the app compiles cleanly against its stale copy, and this project compiles cleanly against sources the app has never seen.

Treat every ruling below as landed HERE and unlanded THERE until a handover is confirmed.

## Unreached rulings

| ruling | date | status downstream |
|---|---|---|
| 26a — `--ink-fixed-edge` raised to `--neutral-400` | 2026-08-07 | unreached |
| 26b — on-media plate becomes theme-following | 2026-08-07 | unreached |
| 26c — plate becomes translucent at a swept α .70 | 2026-08-07 | unreached |
| 26d — ring and boundary separated, `--on-media-halo` added | 2026-08-07 | unreached |
| 26e — ring retired, `--on-media-edge` removed | 2026-08-07 | unreached |
| theme-scope defect — aliases redeclared per theme block | 2026-08-07 | unreached |

**Four of these have now been reported as missing downstream twice.** The app's `_ds/` copy still ships `--veil-on-media-*` and the opaque `--ink-fixed` family, and has zero hits for `--on-media-plate`, `--on-media-halo` or `--on-media-blur`.

## Why it cannot be copied file-by-file

The app's `_ds/` copy carries six merge-protected local rulings. Replacing whole files destroys them. The handover has to be applied as declaration-level patches — see the changed-file inventory in the handover report (`readme.md` → "On-media plate — derivation" for the reasoning; the diff itself was reported in chat on 2026-08-07 and should be pasted into the app's own pending file when it is actioned).

## Standing rule

Any future ruling that touches tokens or component CSS is not finished when it is measured and recorded here. It is finished when it is copied. Record the copy date in this file, or the ruling stays on the unreached list.
