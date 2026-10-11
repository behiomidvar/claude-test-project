/* Deltalk UI Kit — component specimens, part B: Conversation, Discovery, Messaging. */
const B = window.DeltalkDesignSystem_288455;
const BI = window.DeltalkIcons;
const BIt = ({ lb, children, col }) => <div className="it"><span className="lb">{lb}</span><div className="itrow" style={col ? { flexDirection: 'column', alignItems: 'stretch', width: '100%' } : null}>{children}</div></div>;
const BItems = ({ children }) => <div className="items">{children}</div>;
const Bw = ({ w, children }) => <div style={{ width: w || 300 }}>{children}</div>;
const P1 = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=faces';
const P2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=faces';
const P3 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=faces';
const PIMG = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=80';

window.KIT_B = [
{ group: 'Conversation', num: '02.3',
  intro: 'The brand-signature surface: words before faces. Warm means you — the reach, the feeling. Cool means the other person, and conversation active. Received bubbles stay neutral on purpose: if every reply were cool, cool would stop meaning conversation active and decay into not you.',
  items: [
  { name: 'MessageBubble', desc: 'The conversation surface primitive. Sent bubbles carry the warm fill, received stay neutral; the tail corner mirrors in RTL from one definition.', render: () => <Bw w={340}><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <B.MessageBubble from="them" time="۹:۳۸">تو هم شب‌ها رادیو گوش می‌دی یا فقط من این‌طوری‌ام؟</B.MessageBubble>
      <B.MessageBubble from="me" time="۹:۴۱">فقط شب‌ها. صبح‌ها حوصلهٔ هیچ صدایی رو ندارم.</B.MessageBubble>
      <B.MessageBubble from="them" typing />
    </div></Bw> },
  { name: 'VoiceNote', desc: 'A voice message in the conversation. Both sides, idle and playing; the inactive waveform uses --veil-on-media-strong.', render: () => <BItems>
      <BIt lb="them — idle / playing" col><Bw><B.VoiceNote from="them" duration="۰:۲۴" /></Bw><Bw><B.VoiceNote from="them" duration="۰:۲۴" playing /></Bw></BIt>
      <BIt lb="me — idle / playing" col><Bw><B.VoiceNote from="me" duration="۰:۱۱" /></Bw><Bw><B.VoiceNote from="me" duration="۰:۱۱" playing /></Bw></BIt>
    </BItems> },
  { name: 'PromptCard', desc: 'A question answered in words. Profiles lead with these — the product mechanic, not decoration. The question is set in the cool role.', render: () => <BItems>
      <BIt lb="answered" col><Bw w="100%"><B.PromptCard label="پرسش دوم" question="دربارهٔ چه چیزی می‌تونی ساعت‌ها حرف بزنی؟" answer="آشپزی، ولی نه دستور پخت — دربارهٔ اینکه چرا یه غذا آدم رو یاد یه خونهٔ خاص می‌ندازه." /></Bw></BIt>
      <BIt lb="unanswered — the prompt itself" col><Bw w="100%"><B.PromptCard label="پرسش تازه" question="آخرین چیزی که یاد گرفتی و هنوز ذوقش را داری چه بود؟" /></Bw></BIt>
    </BItems> },
  { name: 'TypingDots', desc: 'The three dots from the logo, reused as the system’s core micro-motion — loading, section breaks, the typing state.', render: () => <BItems>
      <BIt lb="sizes"><B.TypingDots size="sm" /><B.TypingDots size="md" /><B.TypingDots size="lg" /></BIt>
      <BIt lb="brand fill · custom colour"><B.TypingDots size="lg" brand /><B.TypingDots size="lg" color="var(--conversation-active)" /></BIt>
    </BItems> },
]},
{ group: 'Discovery atoms', num: '02.4',
  intro: 'Discover is a vertically-scrollable single card, not a swipe stack: like and pass are ordinary buttons and RTL affects only their inline order. Verification is ONE badge and it is never green — the Lucide badge-check rosette filled with --verification #1D9BF0. At lg/sm it sits on a dark fixed-ink pill; at mini the pill is dropped and the rosette sits on the avatar directly with a 1dp --ink-fixed silhouette rim.',
  items: [
  { name: 'VerificationBadge', desc: 'Identity verification. Three locked sizes. Verified mini has no pill and no ring — a 22dp rosette on a 24dp footprint, separated by a 1dp ink rim on its own silhouette; pending mini keeps the pill.', render: () => <BItems>
      <BIt lb="sizes — lg 28 · sm 20 · mini 24"><B.VerificationBadge size="lg" /><B.VerificationBadge size="sm" /><B.VerificationBadge size="mini" /></BIt>
      <BIt lb='status="pending" · custom label'><B.VerificationBadge size="lg" status="pending" /><B.VerificationBadge size="sm" status="pending" /><B.VerificationBadge size="lg" label="چهره تأیید شد" /></BIt>
      <BIt lb="onPhoto — adds --shadow-on-photo"><div style={{ position: 'relative', width: 190, height: 108, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}><img src={PIMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><span style={{ position: 'absolute', insetBlockEnd: 10, insetInlineStart: 10 }}><B.VerificationBadge size="lg" onPhoto /></span></div></BIt>
    </BItems> },
  { name: 'PresenceIndicator', desc: 'Online / recently active / offline — one semantic set across avatars, chat rows and profiles.', render: () => <BItems>
      <BIt lb="statuses"><B.PresenceIndicator status="online" /><B.PresenceIndicator status="recent" minutesAgo={12} /><B.PresenceIndicator status="offline" /></BIt>
      <BIt lb="bare dot · on media"><B.PresenceIndicator status="online" bare /><B.PresenceIndicator status="recent" bare /><B.PresenceIndicator status="offline" bare /><span style={{ background: 'var(--ink-fixed)', padding: '6px 10px', borderRadius: 'var(--radius-pill)' }}><B.PresenceIndicator status="online" onMedia /></span></BIt>
    </BItems> },
  { name: 'DistanceChip', desc: 'How far away, in Persian numerals. Chip form for cards, plain form for dense metadata rows.', render: () => <BItems>
      <BIt lb="chip · plain"><B.DistanceChip km={3} /><B.DistanceChip km={12} /><B.DistanceChip km={48} plain /></BIt>
      <BIt lb="on media"><span style={{ background: 'var(--ink-fixed)', padding: 8, borderRadius: 'var(--radius-pill)' }}><B.DistanceChip km={3} onMedia /></span></BIt>
    </BItems> },
  { name: 'AgeChip', desc: 'Age in Persian numerals, chip or inline. The unit is a word, never a bare number.', render: () => <BItems>
      <BIt lb="chip · inline"><B.AgeChip years={41} /><B.AgeChip years={47} variant="inline" /><B.AgeChip years={29} unit="سال" /></BIt>
      <BIt lb="on media"><span style={{ background: 'var(--ink-fixed)', padding: 8, borderRadius: 'var(--radius-pill)' }}><B.AgeChip years={41} onMedia /></span></BIt>
    </BItems> },
]},
{ group: 'Messaging', num: '02.5',
  intro: 'RTL bubble alignment: sent messages align to the left edge, received to the right. Delivery status runs sending → sent → delivered → read, with read receipts in the cool role; failed offers a retry. Every bubble in the system composes from --radius-bubble 22 + --radius-bubble-tail 6.',
  items: [
  { name: 'ChatListItem', desc: 'The conversations list row. Four states, plus an outgoing preview and the unread count pill.', render: () => <Bw w="100%"><div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <B.ChatListItem state="unread" name="آوا" avatar={P1} preview="یه چیزی بگو که هیچ‌وقت به کسی نگفتی — الکی نه، واقعی." time="۹:۴۱" unread={2} online />
      <B.ChatListItem state="read" name="سارا" avatar={P2} preview="فردا ساعت پنج جلوی کتاب‌فروشی؟" time="دیروز" outgoing />
      <B.ChatListItem state="newMatch" name="نیما" avatar={P3} preview="تازه مچ شدید — اولین حرف مال تو." time="سه‌شنبه" />
      <B.ChatListItem state="muted" name="مریم" avatar={P1} preview="پیام صوتی · ۰:۲۴" time="۱۴ تیر" />
    </div></Bw> },
  { name: 'ChatBubble', desc: 'The full chat bubble with delivery status, image, emoji and reply-quote variants.', render: () => <BItems>
      <BIt lb="received · sent" col><Bw w={330}><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <B.ChatBubble from="received" time="۹:۳۸">اسم کتابی که گفتی چی بود؟ می‌خوام سفارش بدم.</B.ChatBubble>
        <B.ChatBubble from="sent" status="read" time="۹:۴۱">«چراغ‌ها را من خاموش می‌کنم». آرام بخوان.</B.ChatBubble>
      </div></Bw></BIt>
      <BIt lb="status — sending · sent · delivered · read · failed" col><Bw w={330}><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <B.ChatBubble from="sent" status="sending" time="الان">دارم می‌فرستم…</B.ChatBubble>
        <B.ChatBubble from="sent" status="sent" time="۹:۴۲">رسید؟</B.ChatBubble>
        <B.ChatBubble from="sent" status="delivered" time="۹:۴۲">آره رسید.</B.ChatBubble>
        <B.ChatBubble from="sent" status="read" time="۹:۴۳">پس تا فردا.</B.ChatBubble>
        <B.ChatBubble from="sent" status="failed" time="۹:۴۴" onRetry={() => {}}>این یکی نرفت.</B.ChatBubble>
      </div></Bw></BIt>
      <BIt lb="emoji · image + caption · reply quote" col><Bw w={330}><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <B.ChatBubble from="received" variant="emoji" time="۹:۴۵">♡</B.ChatBubble>
        <B.ChatBubble from="sent" variant="image" image={PIMG} caption="همون کتاب‌فروشی که گفتم." status="delivered" time="۹:۴۶" />
        <B.ChatBubble from="received" variant="reply" replyTo={{ name: 'تو', text: 'فردا ساعت پنج جلوی کتاب‌فروشی؟' }} time="۹:۴۷">قبوله. من زودتر می‌رسم.</B.ChatBubble>
      </div></Bw></BIt>
    </BItems> },
  { name: 'MessageInput', desc: 'The composer, in four states. The recording state replaces the field with a live timer and a cancel affordance.', render: () => <BItems>
      <BIt lb="empty · typing" col><Bw w="100%"><B.MessageInput state="empty" placeholder="یک چیز واقعی بنویس…" onChange={() => {}} /></Bw><Bw w="100%"><B.MessageInput state="typing" value="داشتم فکر می‌کردم که" onChange={() => {}} /></Bw></BIt>
      <BIt lb="recording · disabled (blocked)" col><Bw w="100%"><B.MessageInput state="recording" recordTime="۰:۰۹" onChange={() => {}} /></Bw><Bw w="100%"><B.MessageInput state="disabled" blockedText="این گفت‌وگو بسته شده است." onChange={() => {}} /></Bw></BIt>
    </BItems> },
  { name: 'VoicePlayer', desc: 'Playback inside a chat bubble. Width sits between --width-voice-min 220 and --width-voice-max 300.', render: () => <BItems>
      <BIt lb="received — idle / playing" col><Bw><B.VoicePlayer from="received" duration="۰:۲۴" /></Bw><Bw><B.VoicePlayer from="received" duration="۰:۲۴" playing progress={0.42} /></Bw></BIt>
      <BIt lb="sent — idle / playing" col><Bw><B.VoicePlayer from="sent" duration="۰:۱۱" /></Bw><Bw><B.VoicePlayer from="sent" duration="۰:۱۱" playing progress={0.7} /></Bw></BIt>
    </BItems> },
  { name: 'TypingIndicator', desc: 'The other person is writing. A received-shaped bubble carrying TypingDots in the cool role.', render: () => <BItems>
      <BIt lb="default · with label" col><Bw><B.TypingIndicator /></Bw><Bw><B.TypingIndicator label="آوا دارد می‌نویسد" /></Bw></BIt>
    </BItems> },
  { name: 'DateSeparator', desc: 'Day break inside a thread. Persian relative dates; bare drops the rules.', render: () => <Bw w="100%"><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><B.DateSeparator label="امروز" /><B.DateSeparator label="دیروز" /><B.DateSeparator label="سه‌شنبه ۱۴ تیر" bare /></div></Bw> },
  { name: 'SystemMessage', desc: 'Thread-level system notes. match is the celebratory one; info is neutral.', render: () => <Bw w="100%"><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <B.SystemMessage variant="match">شما مچ شدید — چون هر دو یک جواب را انتخاب کردید.</B.SystemMessage>
      <B.SystemMessage variant="info">عکس‌ها روشن شدند. حالا همدیگر را می‌بینید.</B.SystemMessage>
    </div></Bw> },
  { name: 'ChatState', desc: 'What the thread shows when there is no conversation to show: new match, unmatched, blocked, ended.', render: () => <Bw w="100%"><div style={{ display: 'grid', gap: 12 }}>
      <B.ChatState state="newMatch" onAction={() => {}} />
      <B.ChatState state="unmatched" />
      <B.ChatState state="blocked" />
      <B.ChatState state="ended" actionLabel={null} />
    </div></Bw> },
]}];
