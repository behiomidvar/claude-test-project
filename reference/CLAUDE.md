# Deltalk — Project Conventions

Apply these to every component built from here on.

## Platform & language
- Android mobile app, Material-style patterns.
- Persian, RTL layout. All demo content, labels, sample text in Persian.
- Persian numerals (۰–۹) everywhere: ages, distances, timestamps, counters, prices.
- Font: IranSans throughout.

## Theming & tokens
- All colors reference semantic tokens (surface, border, text, fill) — never hardcoded hex.
- Every component ships both light and dark theme.
- Every component covers all states: default, hover/pressed, focus, disabled, selected, error, loading, empty.

## Documentation
- Each component gets its own design-system section: heading, short English description, variants side by side.
- Design-system terminology and component names in English; UI content in Persian.

## Accessibility
- Touch targets minimum 48dp.
- WCAG AA contrast in both themes.

## Discover is a vertically-scrollable single card (decided)
- NOT a swipe stack. There are no drag gestures, no directional overlays, no rewind/super-like/boost.
- Like and pass are ordinary buttons; RTL affects only their inline order.
- The former "RTL swipe convention" (right = like, left = pass, up = super-like) is **retired** along with `SwipeCard`, `SwipeActions` and their specimen cards. Do not re-introduce it or document it on discovery components.

## Accessibility hit areas
- A control whose visual size is below 48dp keeps its visual size and gains a transparent `::after` inset to `--size-48` — never grow the glyph to hit the minimum.
