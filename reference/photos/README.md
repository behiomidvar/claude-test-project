# StorePromo photos

Drop the real, licensed portraits here. StorePromo bundles them as local files
and waits for every one to load before a frame renders (no remote URLs).

Expected file names (`.jpg`, `.jpeg`, `.png` or `.webp`):

| File      | Who                                   | Scenes |
|-----------|---------------------------------------|--------|
| `aida.*`  | آیدا، ۲۹                               | S2     |
| `sara.*`  | سارا (the user writes to her, matches) | S4, S7, S8 |
| `negar.*` | نگار، ۲۷ (verified)                    | S5     |
| `me.*`    | the user                              | S8     |

A missing file falls back to the design system's neutral
`assets/portrait-tone-{light,dark}.png`, and the render logs which ones.
