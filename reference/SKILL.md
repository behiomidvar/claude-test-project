---
name: deltalk-design
description: Use this skill to generate well-branded interfaces and assets for Deltalk (a conversation-first connection/dating app), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Deltalk essentials to hold onto:
- **Talk first.** Conversation is the product; words come before faces. Warm ↔ cool duality is the brand: warm (apricot→magenta) = the user/reach/affection/primary action; cool (blue→indigo→violet) = the other person/conversation-active/structure. They meet at a clean seam — the Deltalk gradient `--gradient-brand` (**#F24C9A → #BB48F8**, 135°), used for ONE hero moment per screen only, and never as a CTA fill or a screen/card background. `--gradient-celebration` (#FFB565 → #F24C9A) is the demoted warm sweep, reserved for the match/celebration moment.
- **Warm, not hot.** Never heat/flame/hookup/nightclub energy. Age-neutral warmth (works for a 47- and a 26-year-old). No emoji. Ask, don't announce.
- **Persian-first / RTL.** Persian leads and is the source language; English is the adaptation. The whole system is RTL-first (`html{direction:rtl}`, logical properties, `data-dir-icon` mirrors directional icons). Everything — titles, UI and body — renders in **IRANSans Mobile**; zero letter-spacing and generous line-height on Persian; Persian digits (۰۱۲۳۴۵۶۷۸۹) and Jalali dates. See the "RTL & Persian rules" section of README.md.
- **Motion is the unfold, never the swipe.** The three-dots typing indicator is a recurring brand device.
- Real assets: `assets/deltalk-logo.svg`, `assets/wordmark-*.svg`, fonts in `assets/fonts/`. Tokens: `styles.css` → `tokens/`. Components: `window.DeltalkDesignSystem_288455`. App kit: `ui_kits/deltalk-app/`.
- **Typeface:** **IRANSans Mobile** (self-hosted, weights 300/400/500/700/900) is the ONLY Persian family — `--font-display`, `--font-sans` and `--font-persian` all resolve to it. Latin runs use Hanken Grotesk, spec numbers JetBrains Mono. No Morabba, no Vazirmatn.
- **Key colour roles:** primary CTA is the NEUTRAL `--action-cta` (light `#121926` / dark `#F8FAFC`) — never the brand pink. `--accent` is one pink identity per theme (light `#F24C9A`, dark `#E481AF`) and equals `--focus-ring`. `--conversation-active` (light `#0D79AE` / dark `#82C4FF`) means "the other person / conversation active". `--premium` (light `#9E2183` / dark `#FFC2DD`) is super-like and boost. Danger is light `#C81E3A` / dark `#FF6B5B`. Accent, danger and premium must stay mutually separable (≥1.5:1 luminance or ≥30° hue).
- **Spacing & shape:** 4px grid with semantic roles — `--gutter-screen` 20, `--gap-section` 24, `--pad-card` 16, `--gap-card` 12, `--gap-stack` 16, `--gap-inline` 8. Radius roles: `--radius-button` 16, `--radius-input` 12, `--radius-card` 20, `--radius-sheet` 28, `--radius-chip` pill. Primary CTA 52px tall, inputs 48px, min touch target 48dp, focus ring 2dp.
- **Themes:** light + dark. Enable dark with `data-theme="dark"` on an ancestor; all colors are semantic tokens (dark scope in `tokens/colors.css`) tuned to pass WCAG AA. Preview cards include a ☾/☀ toggle.
