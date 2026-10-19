# StorePromo photos

Drop licensed portraits here (or, as uploaded so far, in `reference/` itself).
StorePromo bundles them as local files and waits for every one to load before a
frame renders (no remote URLs).

| File      | Who          | Scenes |
|-----------|--------------|--------|
| `me.*`    | علی، ۴۱ (the user) | S2, S5 |
| `*sara*`  | سارا، ۳۸     | S3–S6 |

A missing file falls back to the design system's neutral
`assets/portrait-tone-{light,dark}.png`, and the render logs which ones.
