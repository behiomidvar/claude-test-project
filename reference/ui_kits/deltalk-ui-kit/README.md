# Deltalk UI Kit — v1.0

The standard hand-off deliverable: cover, foundations, components, screens. Open `index.html`
and follow the contents, or open any sheet directly. Every sheet is a fixed 1280px canvas, so
print / PDF export sizes itself with no extra work (one sheet per page).

| File | What it holds |
|---|---|
| `index.html` | Cover with the Full lockup + version, and the contents page. |
| `01-foundations.html` | Logo lockups · colour (6 accent stops, 6 nine-step ramps, neutral ladder, gradients, every semantic role in light **and** dark, on-media veils) · typography · spacing · shape · elevation · motion · iconography. |
| `02-components.html` | All 48 components, grouped by concern, each with its variants and states — rendered twice, in a light and a dark panel. |
| `03-screens.html` | Onboarding · Discover · Chat · Likes · Profile · Settings · Paywall, at 390 × 844, each in both themes. |

Supporting files: `kit.css` (kit chrome only — no design decisions live here),
`specs-a/b/c.jsx` (the component specimens), `screens.jsx` (the assembled screens),
The icon set is **not** duplicated here: both kits read `window.DeltalkIcons`, published by the single `components/core/icons.jsx` when `_ds_bundle.js` loads.

## Rules this kit follows

- **Nothing is re-derived.** Colours are read from the live tokens at render time; components are
  the real compiled ones from `_ds_bundle.js` (`window.DeltalkDesignSystem_288455`).
- **Documentation is English, product content is Persian**, with Persian numerals — except the
  phone field and the OTP boxes, the two documented Latin-digit exceptions.
- **No prototype scaffolding.** No theme toggle, no tweaks panel, no fake placeholder data. For a
  click-through demo with dummy content, use `ui_kits/deltalk-app/` instead — that kit stays
  interactive on purpose; this one is a reference and presentation artifact.
- Portrait imagery uses Unsplash placeholders; replace with licensed photography before hand-off.

## Changing it

Add a component specimen by appending an entry to the right group in `specs-a/b/c.jsx`
(`{ name, desc, render }` — the sheet renders `render()` twice, once per theme). Add a screen by
appending to `window.KIT_SCREENS` in `screens.jsx`.
