Round avatar. Its signature feature is `blur` — photos start soft and clarify as a real conversation builds ("earn the face by having the conversation"). Falls back to initials over the brand gradient.

```jsx
<Avatar src={photo} name="Sara M" size="lg" online />
<Avatar src={photo} name="Reza" blur={14} />   {/* early in a conversation */}
<Avatar name="Nima K" size="md" ring />        {/* no photo → initials */}
<Avatar src={photo} size="lg" progress={80} />  {/* arc + ۸۰٪ pill ON the ring */}
<Avatar src={photo} size="md" progress={80} />  {/* md: arc alone — the pill drops itself */}
```

Props: `src`, `name`, `alt`, `size` (`xs–xl`), `blur` (0–20), `ring`, `online`, `progress` (0–100).

`progress` is the profile-completion arc: an **open** arc over a neutral track — never a closed ring, since a closed gradient ring already means *new match*. 300° sweep, permanent 60° gap at the bottom, and the **track shares that sweep**, so the silhouette is open at every value including 0. At 100 the fill is dropped and a check sits in the gap — never `--success`, which is presence.

**The figure lives ON the ring**, not in text: a pill sitting in the 60° gap at the bottom edge, `--ink-fixed` fill with `--on-ink-fixed` Persian digits, so the figure appears exactly once. There is **no caption beneath the avatar**. *(Superseded 2026-08-02: "the figure always stays in text — never inside the ring." Withdrawn — do not reinstate it or re-add a caption.)*

The pill and the check are **one slot whose content switches**, never two elements, so they can never both render. **The two states differ in fill, and that is part of the rule:** below 100 the slot is `--ink-fixed` with `--on-ink-fixed` digits (neutral); at 100 it is `--gradient-brand` with an `--on-ink-fixed` mark (branded) — **completion is the only branded moment on the ring**. *(Superseded 2026-08-02: the check was a flat `--accent` glyph. Withdrawn — do not reinstate.)* Below 100 the pill carries two edges — a 1dp `--ink-fixed-edge` and a light 2dp `--on-ink-fixed` ring — complementary, because the dark fill separates on light avatars and the light ring on dark ones. **At 100 there is a third: a `--ink-fixed` outer ring**, because the gradient fill is lighter than the neutral one and stops separating on pale photos (2.73:1 without it). The asymmetry is deliberate — completion is the only branded state, so it is the only one needing the extra edge. Do not reduce it to two.

**`progress` is legal at every size; the figure drops itself where it cannot fit.** The **pill needs ≥64px** (its 9px text-legibility floor makes it wider than the gap chord below that) and the **check needs ≥36px** (a symbol, so no text floor). So `lg`/`xl` show pill and check, `sm`/`md` show the arc alone below 100 and arc+check at 100, and `xs` shows the arc alone throughout. **Where the check drops, the fill stays at 100** — a full 300° sweep — because the fill is dropped at 100 only when the check replaces it; without that clause `xs` would render 0 and 100 identically. **A missing pill at a small size is not a bug** — do not "fix" it, and never shrink the 60° gap to make the figure fit.
