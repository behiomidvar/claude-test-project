# CLAUDE.md

## Deltalk promo video (Remotion): read first

This repo holds a Remotion + TypeScript promo for **Deltalk**, a Persian-first (RTL),
conversation-first connection app.

### Source of truth
- `./reference/` is the design system, extracted from `Motions/Deltalk Design System.zip`
  (the ignored parts below are not committed; re-extract the zip if you need them).
  Before acting, read `readme.md`,
  `SKILL.md`, `CLAUDE.md` and `tokens/*.css`, and list `assets/`. The files win
  over any summary, including this one.
- Ignore `reference/uploads`, `reference/scraps`, `reference/.thumbnail` and
  `reference/ui_kits/deltalk-app`. `uploads/` holds superseded logos and fonts.
  The app kit still shows a blur-to-clear photo reveal that the product removed:
  never show or imply that reveal.
- Report contradictions. Do not guess missing values. Every name this project
  expects from the design system lives in `src/ds-contract.ts`, and `npm run ds:sync`
  checks each one.

### Commands
- `npm run dev`: Remotion Studio.
- `npm run ds:sync`: copy `./reference` into `src/ds/` and check the contract
  (`ds:check` only checks).
- `npm run typecheck`, `npm run lint:rules` (the hard rules below that can be
  checked mechanically, plus: every `var(--token)` used must exist in `src/ds`).
- `npm run test:framesync`: renders TypingDots stills at frames 0/10/40, twice
  each. They must differ from each other and repeat exactly. Add `-- --harness`
  to run without `src/ds`.
- `npm run render:scene1`: Scene 1 (9:16) to `renders/scene1.mp4`.
- `npm run render:scene1-2`: Scenes 1-2 (9:16, 270 frames) to `renders/scene1-2.mp4`.
- `npm run render:test`: 2 s setup test (`Dev/Test-9x16`) to `renders/test.mp4`.
- StorePromo (30 s, `src/store/`; compositions `StorePromo` 9:16 and `StorePromo-16x9`):
  `npm run storyboard:store` renders one key pose per scene to `out/storyboard/`;
  `npm run timeline:store` prints the scene cuts snapped to the music's beat map and checks
  them. S2-S6 are one continuous phone (`src/store/flow/`): poses on beats, a camera
  window over it. Music: `MUSIC_FILE` in `src/store/audio.ts` (currently a generated TEMP track; see
  `assets/audio/README.md` to swap in a licensed one). Plan: `docs/store-promo-storyboard.md`.
- Deliverable renders go to `renders/` and are committed (reviewers work from
  GitHub). `out/` is gitignored scratch (stills, framesync checks).
- If Remotion can't download its Chrome, pass
  `--browser-executable <chrome-headless-shell>` to renders.

### Architecture
- 30 fps. Three compositions (`Deltalk-9x16` 1080x1920, `Deltalk-16x9` 1920x1080,
  `Deltalk-1x1` 1080x1080) render one scene tree, `<Promo>`. Layout comes from
  `useLayout()` (orientation, unit `u`, safe area), never from the composition id.
  Scenes live in `src/scenes/` (built so far: `Scene1` 0-4 s, `Scene2` 4-9 s). Each
  scene has its own `<FrameSync>` (scene-local time). Scenes may overlap across a cut
  so the three-dots motif stays one element (Scene 1 stays mounted 1.5 s into Scene 2).
- Real DS components go inside `<DeviceScale>`: it lays them out at the logical
  393 dp device width and scales the subtree with one transform (393 dp maps to the
  frame's short edge). Never re-derive component sizes by hand; for a hero moment
  pass `scale` (a multiplier on the same transform).
- `src/ds/` mirrors the design system: `styles.css` (imported once in `Root.tsx`),
  `tokens/`, `assets/`, and `components/**/*.jsx` + `.d.ts`. Import components from
  `src/ds` (generated barrel over the source `.jsx`). Never use `_ds_bundle.js`.
- Every scene goes inside `<ThemeScope theme>` and `<FrameSync>`:
  - `ThemeScope` sets `data-theme` and re-declares `background`/`color` from tokens,
    because tokens don't re-resolve on their own.
  - `FrameSync` pauses every CSS animation in its subtree and seeks it to the
    current frame, and turns transitions off. Without it, DS animations
    (`dt-typing`, `dt-unfold`) run on wall-clock time and flicker. If a DS
    component mounts mid-scene, put it in `<SyncedSequence>`.
- `<FontGate>` self-hosts IRANSansMobile 300/400/500/700/900 and blocks rendering
  until they load. There is no 600; `--fw-semibold` resolves to Bold. A fallback
  face changes Persian digit widths and line breaks, so a missing weight fails
  the render.
- Drive our own motion with `useCurrentFrame()` + `interpolate`/`spring`, not CSS
  transitions. Durations come from the motion tokens via `useDurationFrames('base')`
  (`--dur-fast/base/slow/unfold`); easings are `--ease-*` in `tokens/motion.css`.
- Use the DS type scale (`--text-*`, `.dt-display`) and spacing tokens (`--space-*`),
  multiplied by `useLayout().u`. The DS is drawn for a phone; scale small UI up as a
  unit.
- React is pinned to 18.3.1 because the DS targets it (its `.d.ts` files use the global
  `JSX` namespace). Pass a numeric `scale` style as a string, because React 18 appends
  `px` to numbers.
- `tokens/fonts.css` imports Hanken Grotesk / JetBrains Mono from Google Fonts (for
  Latin runs only). Renders without network fall back for Latin, so self-host them
  before showing Latin text.

### Hard rules
- No hardcoded hex. Every color goes through `var(--token)`.
- Logos come only from the `assets/` SVGs, never redrawn. The compact logo
  (`logo-compact.svg`, 152x36) uses `currentColor` for its wordmark: inline it
  (`<InlineLogo>`, colored `--logo-wordmark`, scaled by height only), but only ONE
  inlined logo per frame, because SVG gradient ids like `dtwc`/`dtcc` collide when
  duplicated (`<LogoBudget>` enforces this). So don't `premountFor` a sequence that
  holds an `<InlineLogo>`. Full lockups come per theme
  (`wordmark-{horizontal,vertical}-{light,dark}.svg`) and work as `<img>` (`<LockupLogo>`).
- `--gradient-brand` is only for selected/active/branded states, never a CTA
  fill or a background. `--gradient-celebration` is only for the match moment.
  ONE hero gradient per frame.
- The primary CTA is neutral `--action-cta`. The active tab is flat lavender,
  not a gradient.
- Discover is one vertically scrolling card. No swipe, no drag, no rewind.
  Like and pass are plain buttons.
- The blur-to-clear photo reveal is removed from the product. The DS still ships it
  (`dt-unblur`, `Avatar blur`, readme "signature reveal"): never use or imply it.
- Motion is the "unfold", never the swipe. Durations are 140/240/420/560 ms. Three
  dots are the transition motif.
- Copy: colloquial Persian, ask-don't-announce, no emoji, no zap/fire/heat
  language, no outcome promises, no urgency or countdowns, no counters on cards.
  Matches never expire.

### RTL and Persian
- `direction: rtl` (`dir="rtl" lang="fa"` on the scene root). Logical properties
  only: no `left`/`right`, `margin-left` or `text-align: left`.
- Isolate Latin runs with `dir="ltr"` + `unicode-bidi: isolate` (`<Ltr>`).
- Persian digits ۰-۹ (`faDigits()`) and Persian punctuation «،» «؟» «؛».
  Persian ی/ک, never Arabic ي/ك.
- ZWNJ (نیم‌فاصله) in copy, e.g. «می‌شود», «می‌خوای». The one exception is the
  locked word «گفتگو», written WITHOUT a half-space. That holds even though the DS
  readme's ZWNJ example writes «گفت‌وگو».
- Vocabulary: «لایک» and «مچ». Never «پسند» or «همدل» («همدل» is a competitor's
  name).
- All on-screen copy lives in `src/copy.ts` (the single source; scenes import it,
  never inline strings). Use `\u00a0` there to keep a phrase on one line.

### Verify
- Render stills (`npx remotion still ... --frame N`) and look at them before
  calling anything done. Check all three formats and both themes.
