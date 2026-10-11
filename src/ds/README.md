# src/ds: Deltalk design system (copied, do not edit)

Mirror of `./reference`, created by `npm run ds:sync`. Edit the source, not this folder.

Copied from `./reference`:

- `styles.css`, imported once globally in `src/Root.tsx`
- `tokens/**`
- `assets/**`: fonts, logo SVGs
- `components/**/*.jsx` and their `.d.ts`

Never copied: `uploads/` (superseded logos and fonts), `scraps/`, `.thumbnail`,
`ui_kits/deltalk-app` (it still shows the removed blur-to-clear photo reveal), and
`_ds_bundle.js` (a browser global that can't be tree-shaken or typed).

`index.ts` is generated: a typed barrel that imports each component from its
source `.jsx`. Import components as `import {TypingDots} from '../ds'`.

After syncing, `ds:sync` checks the copy against `src/ds-contract.ts` (token names,
keyframes, font files, logo paths) and lists every mismatch.
