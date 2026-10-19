// Local patches to the copied design system (src/ds), re-applied by every
// `npm run ds:sync` and verified by `npm run ds:check`. Each one is a DS bug
// reported upstream; see docs/ds-patches.md for the reasons. Keep them minimal:
// one exact string swap per patch.
//
// A patch whose `find` is gone and whose `replace` is present is already fixed
// upstream (reported as a note, so it can be retired). A patch with neither
// fails the sync: the upstream file changed and the patch must be re-checked.
export const PATCHES = [
	{
		id: 'message-input-style-id',
		file: 'components/messaging/MessageInput.jsx',
		find: "useOnceStyle('dt-input-css', CSS);",
		replace: "useOnceStyle('dt-msginput-css', CSS);",
		why: 'forms/Input registers the same style id, so whichever mounts second renders unstyled.',
	},
	{
		id: 'photo-grid-first-photo',
		file: 'components/onboarding/PhotoGrid.jsx',
		find: '</svg>عکس اصلی</span>',
		replace: '</svg>عکس اول</span>',
		why: 'The locked term for the first photo is «عکس اول»; the default label still carries the retired «عکس اصلی», with no prop to override it.',
	},
];
