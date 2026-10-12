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
	scene2: {
		// DRAFT, awaiting approval. Lines from the app prototype's sample data;
		// who says which is the brief's assumption. ZWNJ written as \u200c.
		// No-break spaces (\u00a0) keep «عین حال خودم بود» and «کافه‌ی دنج و گپ
		// طولانی‌ام» each on one line, so the bubbles break between clauses.
		// "Your answer to the ideal-evening question was exactly how I feel."
		theirs: 'جوابت به سؤال عصر ایده\u200cآل عین\u00a0حال\u00a0خودم\u00a0بود',
		// "I'm that cozy-café, long-chat person too."
		yours: 'منم همون آدمِ کافه\u200cی\u00a0دنج\u00a0و\u00a0گپ\u00a0طولانی\u200cام.',
		// "Here, we talk first."
		caption: 'اینجا اول حرف می\u200cزنیم.',
	},
	dev: {
		// Setup test scene only (Dev/Test-9x16), not in the promo.
		testSentence: 'می‌خوای گفتگو رو با یه سؤال شروع کنی؟',
	},
} as const;
