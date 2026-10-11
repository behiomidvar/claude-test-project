/**
 * All on-screen Persian copy. The single source: scenes import from here and
 * never inline strings, so copy edits never touch scene code.
 *
 * Rules (CLAUDE.md): colloquial, ask-don't-announce, no emoji. ZWNJ in
 * «می‌…», but the locked word «گفتگو» has no half-space. Persian digits and
 * «،» «؟». Vocabulary «لایک» / «مچ».
 */
export const COPY = {
	scene1: {
		// DRAFT, awaiting approval. "When did you last have a real conversation?"
		// Keep the kasre on «کِی». The two \u00a0 (no-break spaces) keep the phrase
		// «یه گفتگوی واقعی» on one line, so it breaks after «کِی».
		question: 'آخرین بار کِی یه\u00a0گفتگوی\u00a0واقعی داشتی؟',
	},
	dev: {
		// Setup test scene only (Dev/Test-9x16), not in the promo.
		testSentence: 'می‌خوای گفتگو رو با یه سؤال شروع کنی؟',
	},
} as const;
