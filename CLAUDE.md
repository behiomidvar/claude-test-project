# CLAUDE.md

## Deltalk promo video (Remotion): read first

This repo holds a Remotion + TypeScript promo for **Deltalk**, a Persian-first (RTL),
conversation-first connection app. This section overrides the generic website
rules further down wherever they conflict (single `index.html`, Tailwind CDN,
font pairing, layered gradients, `brand_assets/`, the Windows screenshot flow).

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
  checked mechanically).
- `npm run test:framesync`: renders TypingDots stills at frames 0/10/40, twice
  each. They must differ from each other and repeat exactly. Add `-- --harness`
  to run without `src/ds`.
- `npm run render:test`: 2 s test render to `out/test.mp4`.
- If Remotion can't download its Chrome, pass
  `--browser-executable <chrome-headless-shell>` to renders.

### Architecture
- 30 fps. Three compositions (`Deltalk-9x16` 1080x1920, `Deltalk-16x9` 1920x1080,
  `Deltalk-1x1` 1080x1080) render one scene tree, `<Promo>`. Layout comes from
  `useLayout()` (orientation, unit `u`, safe area), never from the composition id.
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
- On-screen copy lives in `src/copy/fa.ts`.

### Verify
- Render stills (`npx remotion still ... --frame N`) and look at them before
  calling anything done. Check all three formats and both themes.

---

## Generic website rules (not for the Remotion video)

### Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

### Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

### Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

### Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

### Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

### Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

### Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

### Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
