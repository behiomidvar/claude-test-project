/**
 * All on-screen Persian copy. The single source: scenes import from here and
 * never inline strings, so copy edits never touch scene code.
 *
 * Rules (CLAUDE.md): colloquial, ask-don't-announce, no emoji. ZWNJ in
 * «می‌…», but the locked word «گفتگو» has no half-space. Persian digits and
 * «،» «؟». Vocabulary «لایک» / «مچ».
 */
// "When did you last have a real conversation?" Shared by the first promo's
// Scene 1 and StorePromo's S1, which reuses that scene.
// Keep the kasre on «کِی». The two \u00a0 (no-break spaces) keep the phrase
// «یه گفتگوی واقعی» on one line, so it breaks after «کِی».
const HOOK_QUESTION = 'آخرین بار کِی یه\u00a0گفتگوی\u00a0واقعی داشتی؟';

/**
 * A headline with one highlighted word. `highlight` must equal one
 * space-separated word of `text` exactly; a \u00a0 inside it keeps a two-word
 * unit («هر دو») together as one word.
 */
export type Headline = {readonly text: string; readonly highlight: string};

export const COPY = {
	scene1: {
		question: HOOK_QUESTION,
	},
	/**
	 * StorePromo (30 s). Copy is final from the brief unless marked ADDED
	 * (needed by the UI, not in the brief, awaiting approval) or PENDING.
	 * ZWNJ is a literal U+200C here (check with a hex view, not by eye).
	 */
	store: {
		s1: {question: HOOK_QUESTION},
		s2: {
			headline: {text: 'آشنایی، از یه گفتگو شروع می‌شه', highlight: 'گفتگو'},
			profile: 'آیدا، ۲۹',
			// The user (dark bubble, from="me").
			mine: 'نوشتی عصر ایده‌آلت یه پیاده‌روی کنار دریاچه‌ست. کدوم دریاچه؟',
			// Aida (white bubble, from="them").
			theirs: 'چیتگر، غروب‌ها. تو کجا راه می‌ری؟',
		},
		s3: {
			headline: {text: 'دنبال چی هستی؟ همون اول بگو', highlight: 'دنبال'},
			goals: {
				serious: 'رابطه‌ی جدی',
				friendship: 'دوستی و هم‌صحبتی',
				unsure: 'فعلاً مطمئن نیستم',
			},
		},
		s4: {
			headline: {text: 'قبل از مچ هم می‌شه حرف زد', highlight: 'قبل'},
			// ADDED (assumption): the recipient is Sara, who answers in S7 and matches in S8.
			name: 'سارا',
			message: 'منم عاشق کافه‌های دنجم. تو معمولاً کجا می‌شینی؟',
			remaining: '۲ پیام برات مونده',
			// PENDING: label not final.
			send: 'لایک و ارسال',
		},
		s5: {
			headline: {text: 'پشت این نشان، یه آدم واقعیه', highlight: 'آدم'},
			profile: 'نگار، ۲۷',
			// The DS VerificationBadge default label, passed explicitly.
			badge: 'تأییدشده',
			toastTitle: 'حسابت تأیید شد',
			toastBody: 'از حالا کنار اسمت نشان تأیید می‌شینه.',
		},
		s6: {
			headline: {text: 'دنبال چیزی بگرد که برات مهمه', highlight: 'بگرد'},
			// ADDED: slider labels.
			ageLabel: 'سن',
			distanceLabel: 'فاصله',
			distanceUnit: 'کیلومتر',
			verifiedOnly: 'فقط آدم‌های تأییدشده',
			verifiedOnlyNote: 'رایگان، برای همه',
		},
		s7: {
			headline: {text: 'حرف که گل بندازه، بقیه‌ش راحته', highlight: 'گل'},
			name: 'سارا',
			theirs1: 'پس پیاده‌روی. کدوم مسیر رو بیشتر دوست داری؟',
			mine1: 'دربند، صبح‌های جمعه. تو چی؟',
			voiceDuration: '۰:۱۸',
			mine2: 'صدات رو شنیدم، خوب تعریف می‌کنی.',
			theirs2: 'ممنون! حالا نوبت توئه، از اون کافه‌ی دنجت بگو.',
		},
		s8: {
			// The brief marks one word; «هر» alone is not a unit, so «هر دو» stays whole.
			headline: {text: 'هر دو که لایک کنید، گفتگو باز می‌شه', highlight: 'هر دو'},
			title: 'دل‌هاتون به هم رسید',
			body: 'تو و سارا همدیگه رو لایک کردید',
			goal: 'هدف هر دوتون: رابطه‌ی جدی',
			cta: 'شروع گفتگو',
		},
		s9: {
			logoLabel: 'دلتاک',
			line: 'اول حرف بزن، بعد دل بده',
			// PENDING: the store name. A Persian placeholder, so no Latin reaches the screen.
			cta: 'دلتاک رو از [نام فروشگاه] بگیر',
		},
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
