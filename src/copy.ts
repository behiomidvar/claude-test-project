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
 * space-separated word of `text`, optionally followed there by Persian
 * punctuation («بخون،»), which stays unhighlighted. A \u00a0 keeps a two-word
 * unit together as one word.
 */
export type Headline = {readonly text: string; readonly highlight: string};

export const COPY = {
	scene1: {
		question: HOOK_QUESTION,
	},
	/**
	 * StorePromo (30 s): one person's journey, علی from sign-up to a conversation
	 * with سارا. Copy is final from the brief unless marked KIT (taken from the DS
	 * UI kit's real screens) or ADDED (needed by the UI, not in the brief; awaiting
	 * approval). ZWNJ is a literal U+200C here (check with a hex view, not by eye).
	 */
	store: {
		// The phone status bar, as in the UI kit (ui_kits/deltalk-ui-kit/screens.jsx).
		statusTime: '۹:۴۱',
		user: {name: 'علی', profile: 'علی، ۴۱', city: 'تهران'},
		match: {name: 'سارا', profile: 'سارا، ۳۸', city: 'تهران'},
		goals: {
			serious: 'رابطه‌ی جدی',
			// ADDED: the other two goal options, as in the earlier brief.
			friendship: 'دوستی و هم‌صحبتی',
			unsure: 'فعلاً مطمئن نیستم',
		},
		s1: {question: HOOK_QUESTION},
		s2: {
			headline: {text: 'چند قدم ساده، و پروفایلت آماده‌ست', highlight: 'چند'},
			// KIT: the onboarding screen's continue button.
			next: 'ادامه',
			steps: {
				name: 'اسمت چیه؟',
				goal: 'دنبال چی هستی؟',
				birth: 'تولدت کِیه؟',
				gender: 'جنسیتت چیه؟',
				city: 'کجا زندگی می‌کنی؟',
				photo: 'چه عکسی ازت ببینیم؟',
				ready: 'قبل از شروع',
			},
			// «۴۱ ساله» is printed by the DS DateOfBirthFieldGroup itself from the date.
			// The DS Select's default placeholder, passed explicitly (city step, before the tap).
			cityPlaceholder: 'انتخاب کن…',
			// ADDED: the other gender option.
			genders: {woman: 'زن', man: 'مرد'},
			start: 'شروع کنیم',
			verify: 'بذار مطمئن بشن خودتی',
			// The DS VerificationBadge default label, passed explicitly.
			badge: 'تأییدشده',
		},
		s3: {
			headline: {text: 'بخون، گوش بده، بعد لایک کن', highlight: 'بخون'},
			// Her prompt, split at the ellipsis into PromptCard's question and answer.
			promptQuestion: 'یک عصر ایده‌آل برای من…',
			promptAnswer: 'یه پیاده‌روی طولانی، بعد یه کافه‌ی دنج و گپ‌زدن تا شب.',
			// ADDED: her Discover voice note's length.
			voiceDuration: '۰:۲۴',
			// KIT: Discover's pass button. «لایک» is the DS vocabulary's control label.
			pass: 'فعلاً نه',
			like: 'لایک',
		},
		s4: {
			headline: {text: 'قبل از مچ هم می‌شه حرف زد', highlight: 'قبل'},
			sheetTitle: 'پیام همراه لایک برای سارا',
			message: 'منم عاشق کافه‌های دنجم. تو معمولاً کجا می‌شینی؟',
			remaining: '۲ پیام برات مونده',
			send: 'ارسال لایک',
			sentTitle: 'لایک و پیامت برای سارا رفت',
			sentBody: 'اگه اونم لایکت کنه، مچ می‌شید و پیامت اولین حرف گفتگوئه.',
		},
		s5: {
			later: 'یه روز بعد',
			headline: {text: 'هر دو که لایک کنید، گفتگو باز می‌شه', highlight: 'گفتگو'},
			title: 'دل‌هاتون به هم رسید',
			body: 'تو و سارا همدیگه رو لایک کردید',
			goal: 'هدف هر دوتون: رابطه‌ی جدی',
			cta: 'شروع گفتگو',
		},
		s6: {
			headline: {text: 'حرف که گل بندازه، بقیه‌ش راحته', highlight: 'گل'},
			// ADDED: day separators and message times, spread over two days.
			yesterday: 'دیروز',
			today: 'امروز',
			likeMessageTime: '۲۱:۴۰',
			theirs1: 'کافه‌ی کوچیکه نزدیک پارک ملت. پس پیاده‌روی هم اهلشی؟',
			mine1: 'دربند، صبح‌های جمعه. تو چی؟',
			voiceDuration: '۰:۱۸',
			mine2: 'صدات رو شنیدم، خوب تعریف می‌کنی.',
			theirs2: 'ممنون! حالا نوبت توئه، از اون کافه‌ی دنجت بگو.',
			times: ['۷:۵۰', '۸:۱۵', '۸:۴۰', '۹:۰۵', '۹:۴۰'],
			// KIT: the chat composer's placeholder.
			placeholder: 'یک چیز واقعی بنویس…',
		},
		s7: {
			logoLabel: 'دلتاک',
			line: 'گفتگو با مچ‌هات، رایگانه.',
			// One store for now; a Google Play cut changes only this line.
			cta: 'دلتاک رو از بازار بگیر',
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
