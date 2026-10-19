# Local design-system patches

`src/ds/` is a copy of `./reference` (the Deltalk design system). A few DS bugs
block this project, so `npm run ds:sync` re-applies a minimal patch to the copy
after every sync, and `npm run ds:check` fails if one is missing. The patches
live in `scripts/ds-patches.mjs`, one exact string swap each. `./reference` itself
is never edited.

Each bug is reported upstream. When the design system ships a fix, the sync
reports the patch as "already in place"; delete it from `scripts/ds-patches.mjs`
and from this table. If upstream changes the patched line, the sync fails and the
patch has to be re-checked.

| id | file | change | why |
|---|---|---|---|
| `message-input-style-id` | `components/messaging/MessageInput.jsx` | style id `dt-input-css` → `dt-msginput-css` | `forms/Input` registers the same id through `useOnceStyle`, which skips an id it already has. Whichever of the two mounts second renders with no stylesheet (seen in StorePromo S6: the composer drew as a bare textarea). The readme records the same failure for VoiceNote / VoicePlayer and rules that every component's style id must be unique. The class prefixes already differ (`dt-field*` vs `dt-input*`), so only the id changes. |
| `photo-grid-first-photo` | `components/onboarding/PhotoGrid.jsx` | label «عکس اصلی» → «عکس اول» | The locked term for the first photo is «عکس اول». The component hardcodes the retired «عکس اصلی» and has no prop to override it (known DS debt). `npm run lint:rules` bans «عکس اصلی» in our own source. |
