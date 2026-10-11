# Audit — decisions made in isolation, never checked against the six-ramp system or an existing token

> **Status 2026-07-27:** items 1–5, 7, 10, 11, 12, 14, 16 and part of 9 are **RESOLVED** (see `readme.md` → "Reconciliation rulings" and "Two token families that were missing"). Item 4 was also **corrected**: `--conversation-active` is the cool BLUE `#0D79AE / #82C4FF`, already its own deliberate family — the `#3B4CC0` in the original finding was info only. Item **20** is now fully closed (dark danger row re-measured; every guidelines colour row carries an exact-step or labelled-exception source per readme §Colour labelling rule). **Closed since:** **13** (card literals repointed), **14** — a *seventh* literal bubble radius was later found in `TypingIndicator` and removed, **15** (stamp 14px → `--radius-md`; the four 2px bars → new `--radius-hairline` role), **18** (stamp 30px → `--text-h1`), **21** (`ShamsiDatePicker` line replaced with `DateOfBirthFieldGroup`), **22** (grep-checkable guard comment above the ramps: every `--brand-*-N` and `--neutral-*` is declared once in `:root` and never inside a theme scope).

**19 — reruled, do NOT delete.** Both `tweaks-panel.js` copies are *live*: `components/core/core.card.html` and `components/feedback/feedback.card.html` each load their sibling copy. They are vendored starter scaffold, already carrying `@ds-adherence-ignore`, and their foreign palette never reaches product UI. Leaving them in place; the only alternative worth doing later is hoisting one shared copy out of the component tree.

**17 and 15-remainder are CLOSED.** `tokens/sizes.css` now holds a 4px-grid size scale (`--size-20`…`--size-76`) plus content-width measures, and the nested-in-bubble radii (`--radius-bubble-image` 18, `--radius-bubble-quote` 12) are a documented exception. 26 literals across 15 components repointed. Every audit item is now closed or explicitly reruled.

## 23 — Button re-implemented locally in seven components (**A**, RESOLVED)

`Button.jsx` defines 40/48/56 heights, `--radius-button`, semibold, `--ring` focus, four variants. These seven bypass it with their own CSS: `ChatState.__btn` (48), `EmptyState.__cta` (48), `ErrorState.__retry` (48), `PermissionCard.__allow` (**52**), `ConfirmDialog.__btn` (**52**), `ReportFlow.__submit` (**52**) + `.__donebtn` (48), `BlockedUserItem.__btn` (**40**, and a 1.5px outline where Button's secondary uses 1px). Three heights and two outline weights for what is one component — the exact "two ghost buttons on two screens" case the production rules name. `ReportFlow.__submit` also fills `--danger` directly, a destructive variant Button doesn't have. **Fixed:** Button gained a `destructive` variant (`--danger-fill` / `--danger-on-fill`, press = same fill darkened since no `--danger-press` token exists), its `md`/`lg` heights now read `--size-48`/`--size-56`, and all seven import it. No local button CSS remains in any of them.

## 24 — Avatar re-implemented in three components (**B**, RESOLVED)
`ChatListItem.__av` (56), `BlockedUserItem.__av` (48), `Skeleton.__av` (56) each draw their own circle instead of using `Avatar`. **Fixed:** Avatar's named rungs now read `--size-*` tokens and it accepts a numeric `size={N}` that resolves to `var(--size-N)`, so any rung is reachable without a literal. `ChatListItem` uses `size={56}` + `online` (its duplicate presence dot is gone); `BlockedUserItem` uses `size={48}` and keeps only the blocked *treatment* (grayscale + scrim) locally. `Skeleton` is a documented exception — a shimmer block with no image, ring or dot — and now points at `--size-56`/`--size-52` instead of literals.

## 25 — Count badge has no Badge variant (**C**, RESOLVED)
`ChatListItem.__badge` defines the unread-count pill (`--gradient-brand-strong`, 22px min-width) locally because `Badge` has no count variant. The kit's inline `TabBar` now defines a second one. **Fixed:** `Badge` gained `variant="count"` (+ `muted`) owning the `--gradient-brand-strong` numeric pill with tabular numerals and a 22px min-width. `ChatListItem` and the kit's `TabBar` both use it; neither draws the pill.

Source-of-truth comments were added to `Button.jsx`, `Avatar.jsx` and `Badge.jsx` naming each as canonical and pointing at these items, so the next author sees the rule before copying CSS.

**Inner glyph sizes (19px / 22px) — RULED deliberate, closed.** They sit between `--size-20` and `--size-24` but each lives inside an already-tokenised fixed-size container, so snapping them would change the glyph's optical weight without changing the control's footprint. Recorded as a documented exception in `tokens/sizes.css`; do not re-flag.

Scope: every `tokens/*.css`, `components/**`, `guidelines/**`, `ui_kits/**` file. Report only — **nothing in this list has been changed** except the two items marked FIXED (mandated in the same request).

Severity: **A** = two near-identical colour sets coexisting (the exact failure mode this audit exists to stop) · **B** = a value invented where a token/role already exists · **C** = untracked one-off with no token family to belong to · **D** = documentation drift.

---

## 1. Colour

| # | Sev | Finding | Existing thing it should have been checked against |
|---|---|---|---|
| 1 | — | **FIXED** `--premium` was `#9E2183` light / `#FFC2DD` dark — hand-nudged hexes, twice revised by eye, never compared to a ramp. Now `--brand-pink-700` / `--brand-pink-200`. | brand pink ramp |
| 2 | — | **FIXED (documented)** `--danger-fill` `#C81E3A` / `#FF6B5B` — deliberate non-brand hue, same class of exception as the presence green; now recorded as such and marked exempt from ramp-first. | — |
| 3 | **A** | `--warning-fill` `#FEAC6A` vs `--brand-gold` `#FFB565` — two warm ambers ~1.05:1 apart, indistinguishable side by side. Either warning is a reserved semantic family (document it like danger) or it should be a gold ramp step. Unresolved either way. | `--brand-gold`, gold ramp |
| 4 | **A** | `--info-fill` / `--conversation-active` `#3B4CC0` (light) vs `--brand-indigo-600` `#4437C4` — near-identical indigos, one a hand-picked hex, one a ramp step. Dark `#9F8BF8` sits the same way against `--brand-lavender-400`. | indigo/lavender ramps |
| 5 | **A** | `--gradient-brand-strong` stops `#C23D7B` / `#963AC6` were hand-darkened from the brand gradient. The ramp already contains `--brand-pink-600` `#C62277` and `--brand-purple-600` `#971ECF` — visually the same two colours, arrived at independently. | pink/purple ramp step 600 |
| 6 | **B** | `--accent-press` `#C43D6E` — invented press value; `--brand-pink-600` `#C62277` is the ramp's own answer. | pink ramp |
| 7 | **B** | `--accent-tint` `#FCE4F0` and `--accent-tint-fg` `#B21E63` — both hand-picked. Ramp equivalents are `pink-100` / `pink-700`. **Note the conflict this creates:** `pink-700` is now `--premium`, so accent-tint-fg cannot simply take it — needs a decision (accent tint fg → `pink-800`?). | pink ramp, `--premium` |
| 8 | **B** | Dark warm/cool tints `--warm-magenta #F062B0`, `--warm-700 #F7A0C4`, `--warm-50/100/200 #2A1E28/#3A2632/#4A2E3C`, `--cool-50 #EAECFB` — all invented per-theme surface hexes with no ramp or neutral-ramp reference. | pink/indigo ramps, or an explicit "dark tints are semantic, not ramp" rule |
| 9 | **C** | **No neutral ramp exists.** `--border-control #828B9C`, `--switch-track-off #828B9C`, `--ink-fixed-edge #6E7789`, `--border-strong #A9B2C0`, `--text-subtle`, `--text-disabled` were each derived by a one-off contrast measurement. Individually justified, collectively unsystematised — the same class of problem the brand ramps just solved. | (nothing — a `--neutral-100…900` ramp is the missing piece) |
| 10 | **C** | **On-media overlays have no token family.** Three different white alphas — `rgba(255,255,255,.16)` (DistanceChip, AgeChip), `.2` (Paywall close), `.4` (VoicePlayer wave) — and two ink alphas, `rgba(8,6,16,.86/.32/0)` (SwipeCard scrim) vs `rgba(8,6,16,.6)` (PhotoGrid remove chip). Each decided in its own session. | needs `--on-media-veil-{sm,md,lg}` / `--scrim-media` steps |
| 11 | **B** | `ConsumableCounter` super-like icon: `background:var(--super-like); color:var(--info-on-fill)` — borrows the **info** on-fill for a **premium** fill. Wrong family, and the exact borrow the premium note says must never happen. Real defect, not just drift. | `--premium-on-fill` |
| 12 | **C** | Card literals: `atoms.card.html` `background:#26202f` (media strip), `switch.card.html` `.vA{color:#BB48F8}` (brand purple typed as hex). | `--surface-cool` / `var(--brand-purple)` |
| 13 | **C** | `SwipeCard` stamps: `border:4px solid #fff`, `color:#fff`, `text-shadow rgba(0,0,0,.45)`, `box-shadow rgba(0,0,0,.3)` — pure white/black on media is defensible, but the border weight and shadow values are per-component inventions. | on-media family (see #10) |

## 2. Radius

| # | Sev | Finding | Role that already exists |
|---|---|---|---|
| 14 | **A** | **Bubble radius is defined three times.** `--radius-bubble-me/them` exist and `MessageBubble` uses them — but `ChatBubble` and `VoicePlayer` re-type `22px 22px 6px 22px` literally (and again for every RTL mirror), and `MessageBubble`'s own RTL override re-types it too. Six literal copies of one role. | `--radius-bubble-me` / `-them` |
| 15 | **B** | Off-role radii: `SwipeCard` stamp `14px`, `ChatBubble` image `18px`, reply quote `12px`, `Dialog` grip `2px`, `VoicePlayer` waveform bar `2px`, `VoicePlayer` shell `22px`. The documented role set is 12 / 16 / 20 / 28 / pill. | `--radius-input/button/card/sheet/chip`, `--radius-xs` |

## 3. Spacing

| # | Sev | Finding | Role that already exists |
|---|---|---|---|
| 16 | **B** | ~20 off-grid paddings/gaps in components, all decided per component: `gap:5/9/10/11/13px`, `padding:6px 11px` (chips), `10px 14px` (ChatBubble, VoicePlayer), `14px 16px` (SafetyTipsBanner), `8px 18px` (stamp), `top:26px`, `bottom:132px`. The 4px grid + six spacing roles allow none of these, and there is no documented optical-exception list. | `--gap-inline` 8, `--pad-card` 16, `--gap-card` 12, raw `--space-N` |
| 17 | **C** | Fixed component dimensions chosen per component: `VoicePlayer` `min-width:220px / max-width:300px`, `ChatBubble` image `max-width:240px`, halo `60px`, feature icon `34px`, close button `38px`, `EmptyState` icon `36px`. No size ramp exists for these. | (nothing — no component-size scale) |
| 18 | **B** | `SwipeCard` stamp `font-size:30px` — not on the type scale. Specimen-card chrome (`10px`, `12.5px`, `13px`) is off-scale too, but that is card furniture, not product UI. | `--text-h1/h2/…` |

## 4. Housekeeping / documentation

| # | Sev | Finding |
|---|---|---|
| 19 | **C** | `components/core/tweaks-panel.js` **and** `components/feedback/tweaks-panel.js` — two copies of a vendored starter panel sitting inside the component tree, carrying an entirely foreign palette (`#D97757`, `#29261b`, `#34c759`, dozens of `rgba(0,0,0,…)`). Not Deltalk components, not referenced by any card. |
| 20 | **D** | `readme.md` dark-theme table still lists danger `#F26E86` and premium `#F583B4`; the tokens are `#FF6B5B` and (now) `--brand-pink-200`. Same table's separation margins were stale — the claimed dark accent↔premium `1.74:1` measured `1.09:1` at one point. Fixed for premium/danger this turn; **the rest of that table has not been re-measured**. |
| 21 | **D** | `readme.md` lists `ShamsiDatePicker` under Onboarding components while a later paragraph says it was retired. One of the two is wrong. |
| 22 | **D** | Ramps are declared theme-independent, but nothing enforces it: a future `[data-theme="dark"]` override of a `--brand-*-N` would compile silently. |

---

## Suggested order, if you want fixes

1. **#11** (wrong token family — a defect), **#14** (one role, six copies).
2. **#3 / #4 / #5** — the three genuine "two near-identical sets" cases; each needs your ruling: reserved semantic family, or ramp step.
3. **#7** — needs a decision because `pink-700` is now taken by premium.
4. **#9 / #10** — two missing token families (neutral ramp, on-media veils); until they exist, #13 / #16 / #17 have nowhere to point.
5. **#19 / #20 / #21** — cheap cleanup.

## Prototype chrome tokens — created (closes the flagged gap)

The earlier decision to tokenize the device-mock chrome was never actually implemented; the audit found raw hex still in `App.jsx`. Now defined in `tokens/proto-chrome.css`: `--proto-desk-bg` (#EDE4D6), `--proto-bezel` (#1A1626), `--proto-bezel-edge` (#2A2440) and `--proto-device-shadow` (the 32% device drop shadow). Deliberately declared **once on `:root` with no dark-theme override** — a desk does not change colour when the phone's app switches theme — and off-limits to every real component or screen. Pure tokenization: the rendered colours are byte-identical to the literals they replaced. Do not re-flag these as hardcoded hex; this file is their tracking.


## 28 — Specimen cards hardcode hexes instead of reading `var(--token)` (**D**, OPEN — sized, not scheduled)

**This is the mechanism behind item 27, raised separately so it can be sized on its own.** A card that writes `#697488` cannot follow `--text-subtle` when the token moves. It is the same defect class as a contrast figure with no ground: a copy of a value that cannot follow its source, and that goes stale silently because nothing links the copy to the original.

**Count: 441 hex literals across 15 HTML files** (body content only — chrome inside `<style>` blocks excluded, since card chrome is not documentation). By file:

| file | literals | distinct |
|---|---|---|
| `guidelines/color-ramps.html` | 162 | 56 |
| `guidelines/color-semantic.html` | 84 | 29 |
| `guidelines/color-neutral.html` | 44 | 16 |
| `brand-guide-fa.html` | 34 | 22 |
| `guidelines/theme-accent.html` | 26 | 10 |
| `guidelines/color-danger-fix.html` | 24 | 13 |
| `guidelines/color-brand.html` | 15 | 7 |
| `guidelines/color-neutral-veils.html` | 14 | 9 |
| `guidelines/color-gradient.html` | 12 | 5 |
| `components/discovery/atoms.card.html` | 6 | 5 |
| `components/feedback/overlays.card.html` | 6 | 4 |
| `guidelines/logo-plus.html` | 5 | 4 |
| `guidelines/logo-horizontal.html` | 4 | 4 |
| `thumbnail.html` | 4 | 4 |
| `components/forms/buttons.card.html` | 1 | 1 |

**`--text-subtle` is the FIRST CONFIRMED INSTANCE of the drift actually occurring** — until item 27 this was a theoretical exposure. `guidelines/color-neutral.html` rendered `#697488` (light) and `#7A8496` (dark); the token declares `#636E82` and `#828C9E`. Both wrong, in both themes, and the card was **also the place the ratio was read from**, so the wrong hex was silently underwriting a published contrast figure. Corrected in the card, since the token has consumers and the card does not.

**Not a mechanical find-and-replace.** Two constraints make this real work:
1. **A two-column light/dark table cannot read `var(--token)` for both columns on one page** — a single element resolves to one theme. Each row needs two theme-scoped wrappers (`[data-theme="light"]` / `[data-theme="dark"]`) so both cells read the live value, which is a restructure of every colour table, not a substitution.
2. **The printed hex string must also come from the resolved value**, not be typed beside a live swatch — otherwise the swatch follows the token and the label does not, which is strictly worse than today (a wrong label next to a right colour reads as confirmation).

The pattern that works is the one `scraps/probe-figures.html` uses: a theme-scoped element, `getComputedStyle().getPropertyValue()`, and print both the swatch and its hex from that one read. **`guidelines/color-ramps.html` and `color-semantic.html` are 56% of the total and should go first.**


## 26 — on-media plate (**status 2026-08-07**)

**26b — APPLIED.** `--ink-fixed` fill + `--ink-fixed-edge` ring is retired on the on-media PLATE family (`IconButton variant="onMedia"`, `AgeChip --onmedia`, `DistanceChip --onmedia`). It now binds `--on-media-plate` / `--on-media-ink` / `--on-media-edge` / `--on-media-plate-hover`, aliases of `--bg` / `--text-primary` / `--surface-card` declared once in `:root` — one binding, no per-theme branch. The plate stays OPAQUE; nothing returned to `--veil-on-media-*`. Measured on the rendered card, both grounds, both themes: glyph **16.83:1**; boundary **16.83:1** on the dark ground and **17.61:1** on the bright one in each theme, carried by the plate in one case and the ring in the other. Grey sweep, better of plate/ring: worst **4.10:1** at `#7A7A7A`.

**26c — APPLIED 2026-08-07 (second pass).** The plate is TRANSLUCENT again, at a swept alpha: `--on-media-plate` = `--bg` at 70%, mirrored per theme (light plate + dark glyph / dark plate + light glyph). Not the rejected .20-white construction — that kept a white glyph on a whitening plate and hit 1.00:1; inverting the glyph moves each theme's worst case to the opposite end of the ramp (light → `#000000`, dark → `#FFFFFF`), and both themes were swept independently over all 256 greys. Measured floors, glyph 3:1 / text 4.5:1 / plate-or-ring 3:1 — light **0.41 / 0.52 / 0.57**, dark **0.48 / 0.61 / 0.62**. Lowest single alpha clearing everything in both themes: **0.62**, at 3.00:1 exactly in dark (#929292). **0.70 shipped** for margin: glyph/text 8.01:1 light / 6.23:1 dark, boundary 3.38:1 (#6C6C6C) / 3.29:1 (#8B8B8B), hover 8.35:1 / 5.53:1. `backdrop-filter:blur(6px)` returns as a visual effect only — it changes no luminance and no figure credits it.

**26d — RING AND BOUNDARY SEPARATED, APPLIED 2026-08-07.** One 1dp stroke cannot set visual weight and hold a boundary at once, which is why no colour worked: at `--border-control` the plate-or-ring pair bottomed at **1.60:1 light / 1.73:1 dark** (1.82 / 1.99 opaque), `--border-strong` 1.32 / 1.55, `--border` 1.19 / 1.34. Ring **width** is not a lever — `--text-primary` at 0.5dp measures identically to 1dp, since width does not enter a ratio. New `--on-media-halo` carries the boundary; `--on-media-edge` drops to `--border-control`, the outline variant's weight. Measured, best of plate-or-ring-or-halo over the sweep: **3.89:1 light at `#FAFAFA`, 5.85:1 dark at `#191919`**; glyph unchanged at 8.01 / 6.23.

The halo is **theme-following and hard 1dp**. Black-only halos fail in dark exactly as predicted (1.80–2.07:1 at every useful alpha), because `--shadow-on-photo` darkens a bright photo *away* from a light plate but pulls a dark photo *toward* a dark one. Blurred halos were rejected on model risk, not on colour: a blur's boundary alpha is ~half nominal, and `0 1px 4px` at .90 measures 3.33:1 light on that model but 2.77:1 on a 0.4× one — light's worst ground `#FAFAFA` is where plate and ring both vanish and the halo is the only separator, so there is no slack for an assumption. A hard 1dp contour has none.

**26a — FIXED 2026-08-07.** `--ink-fixed-edge` moves from `--neutral-700` `#6E7789` to `--neutral-400` `#C3CBD6`. The old pair had no complement — fill and edge both move dark, and the better of the two bottomed out at **1.99:1 at `#4A4A4A`** (fill 1.99, edge 1.97). A light edge gives the fixed fill the complement the theme-following plate gets for free. Re-measured after the change: best of fill-or-edge **3.30:1 at `#6B6B6B`**; against the `--ink-fixed` fill itself 10.76:1; for `Avatar` and `ConfirmDialog`, which add a 2dp `--on-ink-fixed` ring outside it, best of the three is **4.22:1 at `#7C7C7C`**. `--neutral-400` is the first rung that clears (500 → 2.89:1, 600 → 2.28:1, 700 → 1.99:1); lighter rungs clear too but merge into that white outer ring (300 → 1.12:1, 200 → 1.05:1 against it) where 400 keeps 1.64:1. **Visual consequence, recorded:** `VerificationBadge`'s pill draws this edge with no outer ring and now carries a light hairline instead of a dark one.

**26e — RING RETIRED, APPLIED 2026-08-07.** `--on-media-edge` is removed from the token set and from all three components; the plate now carries only `--on-media-halo`. Swept over 256 greys at α .70, all three options measure the SAME worst case in each theme:

| ring | light | dark |
|---|---|---|
| none | **3.89:1** @ `#FAFAFA` | **5.85:1** @ `#191919` |
| `--border` | 3.89:1 @ `#FAFAFA` | 5.85:1 @ `#191919` |
| `--border-control` (shipped 26d) | 3.89:1 @ `#FAFAFA` | 5.85:1 @ `#191919` |

Glyph and text are untouched by the removal (8.01:1 light @ `#000000`, 6.23:1 dark @ `#FFFFFF`) — nothing sat between the glyph and the photo but the plate. The ring was residue: at every ground where the plate fails, the halo already dominates, so no rung of the border ramp adds a thing. **The sequence is the recordable part** — the ring could not be lightened while it was the sole boundary, and became removable only once a complement existed. Same shape as the plate-and-ring pairing rule: a lever is only free once something else carries its load.

**Halo visibility, checked as asked.** It does not silently become the ring again, but it is not invisible either, and the figure differs by ground. Light theme over BRIGHT photography: 3.81:1 against the plate — a discernible dark hairline, which is exactly where it is the only separator and cannot be otherwise. Over dark photography it recedes into the ground it is separating from (8.80:1 vs the ground, plate doing the work). Dark theme is milder both ways (5.41:1 / 6.36:1). Net: the control reads visibly lighter than with ring + halo, and the contour that remains is load-bearing rather than decorative.

**Also fixed in this pass — the theme-following claim was FALSE in shipped code.** The `--on-media-*` aliases were declared once in `:root`. A custom property whose value is `var(--bg)` resolves **where it is declared**, not where it is used, so `[data-theme="dark"]` inherited the already-resolved light values: measured in the dark panel, `--text-primary` was `#F8FAFC` while the glyph computed `rgb(18,25,38)` on a light plate. Dark theme had been rendering the light construction since 26b, and every dark figure recorded in 26b–26d was measured against that wrong render. The set is now redeclared in both theme blocks; the dark figures above are the first honest ones. Comments in `tokens/colors.css` asserting that substitution resolves at the use site have been corrected.

---

## 27 — Focus ring: one chromatic ring cannot clear 3:1 on any ground set (**A**, RESOLVED 2026-08-08)

**Finding.** `--ring` was `0 0 0 3px color-mix(in srgb, var(--focus-ring) 35%, transparent)` — a single chromatic ring, never swept against anything but `--surface-card`. Swept properly (256 greys, both themes, against `--surface-card`, `--bg`, `--surface-well` and the composited `--on-media-plate`) **no alpha and no hue clears 3:1 everywhere**: the accent reaches only **2.98** against the light well at *full* opacity, and ring-vs-raw-photograph floors at **1.00** at every alpha, because a chromatic ring on a grey of its own luminance cannot separate. Over free photography that grey always exists.

**Resolved by changing the construction, not the value.** The ring is now a **pair at opposite ends of the neutral ladder** — `--ring-ink: var(--neutral-900)` inner 2px, `--ring-edge: var(--neutral-100)` outer 2px — the same pairing principle as `--ink-fixed-edge` (26a) and `--on-media-halo`. Best-of-two, read from the rendered page 2026-08-08:

| ground | light | dark |
|---|---|---|
| `--surface-card` | 17.61 ✓ | 15.55 ✓ |
| `--bg` (page) | 16.83 ✓ | 17.61 ✓ |
| `--surface-well` | 15.66 ✓ | 16.89 ✓ |
| **raw photograph, worst of 256 greys** (`#7C7C7C`) | **4.22 ✓** | **4.22 ✓** |
| composited `--on-media-plate`, worst of 256 | 8.01 ✓ | 6.52 ✓ |
| greys failing 3:1 | 0 of 256 | 0 of 256 |

**4.22 is the construction's ceiling, not a value to improve** — pure `#FFF`/`#000` reaches only 4.58. Do not re-open this looking for a better pair.

**Three sub-findings recorded rather than left implicit:**

- **The accent was dropped because it measured 0.00.** As a third band between the two tones it moves the worst case by nothing at any ground — dominated everywhere — so it would have been 2px of width no figure credits. **General rule: a decorative band inside a functional construction is kept only if it changes a number.** Brand still reads at focus where a bordered control can express it — `Select` and `Input` recolour their border to `--focus-ring`.
- **The light-theme halo merge is an accepted cost.** Halo (dark) abuts `--ring-ink` (dark) and the two read as one band; still composited, still 3.89:1, not visually separable. **Do not reorder the tones** — that relocates the merge to dark theme. Resolving it needs a halo outside the ring's tone family, not pursued because the measured boundary holds.
- **Four components hardcoded a 35% replica** — `Switch` 3px, `Radio` 4px, `Checkbox` 4px, `RangeSlider` 6px — so no token change reached them. All four now consume `--ring` / `--ring-wide`. Widths were **geometric** (inverse to control size; the slider's set by the track it sits on) so they were kept and split, not unified: 3→2+2, 4→2+2, 6→3+3. Consumer count is now **7 references, 0 replicas**.

**Related hazard.** The first attempt parameterised width as `--ring-w-in`/`--ring-w-out`, which cannot work — see readme hazard **9**, the third instance of the `var()`-resolves-where-declared mechanism in this project, and the amendment to hazard **8**.

---

## 29 — Chip: three ruling changes reviewed; "ds-requests item 18" does not exist in this project (2026-08-13)

**No file or record named `ds-requests` exists anywhere in this project** (grepped project-wide) and no item 18 exists under that name — this file's own item 18 is unrelated (SwipeCard stamp font-size, closed 2026-07-27) and `audit-pending.md` uses a different lettered scheme. The six-selected-gradient-chips concern is recorded here for the first time, not reopened.

**1 — unselected fill.** Already `--surface-well`, not a bordered-transparent surface — `Chip.jsx` and `core.card.html` documented this before this session. No change made. `--surface-well` separates from its own theme's page/card by only 1.04–1.12:1 (a well is meant to sit close to its ground); the label on it is ≥15.6:1 both themes.

**2 — emoji, `Chip`'s `emoji` prop, interest chips only.** See `Chip.jsx` and readme's no-emoji rule, both dated 2026-08-13. Readme's rule also got a factual correction in the same pass — see the rule itself.

**3 — selected chip, per-theme pair — the first exception to "branded fills use the gradient identically in both themes."** `--chip-selected-fill`/`--chip-selected-text`, declared at `:root` and redeclared in the dark block (hazard 9 discipline). Light unchanged (5.39/6.17:1). Dark: undarkened `--gradient-brand` + `--brand-navy-900` (5.95/5.11:1), because the darkened stops separated from dark `--surface-well` by only 2.74–3.13:1; the swap lifts that to 4.34–5.05:1. Switch, progress, badges, avatar match-rings are untouched.

**Does the pair fix the density problem? No — flagged, not closed.** A per-theme pair changes which two colors render, not how many chips can carry them before the gradient stops reading as emphasis; that's a count question, orthogonal to a color swap. Six selected chips in dark theme now each separate better from the neutral ground individually, but six of them together are still six saturated fills competing for the same "this is special" signal. **New open question, since none existed under this name:** does the interests screen need a cap on simultaneous visible-selected chips, a muted treatment past some count, or is six-as-background an accepted cost of unconstrained multi-select? Left open — a product decision, not a color one.
