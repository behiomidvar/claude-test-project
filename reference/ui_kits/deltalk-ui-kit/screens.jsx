/* Deltalk UI Kit — assembled screens. Real product content, kit components only.
   No prototype scaffolding: no tweaks panel, no theme toggle, no fake data. */
const S = window.DeltalkDesignSystem_288455;
const SI = window.DeltalkIcons;
const P_AVA = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=70&fit=crop&crop=faces';
const P_SARA = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=faces';
const P_NIMA = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=faces';
const P_MARYAM = 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&q=80&fit=crop&crop=faces';
const P_ME = 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&q=80&fit=crop&crop=faces';

const StatusBar = () => <div className="statusbar">
  <span style={{ fontVariantNumeric: 'tabular-nums' }}>۹:۴۱</span>
  <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
    <svg width="20" height="11" viewBox="0 0 20 11" fill="none"><rect x=".6" y=".6" width="15.6" height="9.8" rx="2.6" stroke="currentColor" strokeWidth="1.2" opacity=".5" /><rect x="2.2" y="2.2" width="11" height="6.6" rx="1.4" fill="currentColor" /><path d="M18 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".5" /></svg>
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7.5" width="3" height="3.5" rx="1" /><rect x="4.6" y="5" width="3" height="6" rx="1" /><rect x="9.2" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.8" y="0" width="3" height="11" rx="1" /></svg>
  </span>
</div>;

// logo-compact.svg carries its wordmark as currentColor, and currentColor does NOT
// cross an <img> boundary — an externally referenced SVG resolves it against its own
// document. The compact lockup is therefore INLINED so it follows --logo-wordmark.
let _compact = null;
const CompactLogo = () => {
  const [m, setM] = React.useState(_compact);
  React.useEffect(() => { if (m) return; fetch('../../assets/logo-compact.svg').then(r => r.text()).then(t => { _compact = t; setM(t); }); }, [m]);
  return <span role="img" aria-label="دل‌تاک" style={{ display: 'block', height: 36, color: 'var(--logo-wordmark)' }}
    dangerouslySetInnerHTML={{ __html: (m || '').replace('<svg ', '<svg style="display:block;height:36px;width:auto" ') }} />;
};

const TopBar = ({ title, back, trailing, logo }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px var(--gutter-screen) 8px', flexShrink: 0, minHeight: 'var(--size-48)' }}>
  {back && <S.IconButton label="بازگشت" variant="ghost" size="md"><SI.Back size={22} /></S.IconButton>}
  {logo ? <CompactLogo />
    : <span style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-bold)' }}>{title}</span>}
  <span style={{ flex: 1 }} />
  {trailing}
</div>;

const TabBar = ({ active }) => {
  const items = [
    { id: 'talks', label: 'گفتگوها', icon: <SI.ChatHeart />, badge: '۲' },
    { id: 'discover', label: 'کاوش', icon: <SI.Compass /> },
    { id: 'you', label: 'تو', icon: <SI.User /> }];
  return <nav style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-around', background: 'var(--surface-card)', borderTop: '1px solid var(--border)', padding: '6px', flexShrink: 0 }}>
    {items.map(it => { const on = it.id === active; return <span key={it.id} style={{ flex: 1, minHeight: 'var(--size-48)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: on ? 'var(--nav-active)' : 'var(--text-subtle)' }}>
      <span style={{ position: 'relative', width: 'var(--size-24)', height: 'var(--size-24)', display: 'block' }}>{it.icon}
        {it.badge && <S.Badge variant="count" style={{ position: 'absolute', insetBlockStart: -7, insetInlineEnd: -11 }}>{it.badge}</S.Badge>}</span>
      <span style={{ fontSize: 'var(--text-micro)', fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)' }}>{it.label}</span>
    </span>; })}
  </nav>;
};

const Body = ({ children, pad = true, style }) => <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: pad ? '0 var(--gutter-screen)' : 0, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
const Section = ({ label, children }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-inline)' }}>
  <span style={{ fontSize: 'var(--text-micro)', fontWeight: 'var(--fw-bold)', color: 'var(--text-subtle)' }}>{label}</span>{children}</div>;

window.KIT_SCREENS = [
{ id: 'onboarding', name: 'Onboarding', fa: 'ثبت‌نام — پرسش اول', note: 'Step 3 of 6. The product asks before it shows: the first thing a new person gives Deltalk is a sentence, not a photo.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar back trailing={<span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>۳ از ۶</span>} />
    <Body>
      <S.StepProgress current={3} total={6} />
      <div style={{ height: 'var(--gap-section)' }} />
      <span style={{ fontSize: 'var(--text-micro)', fontWeight: 'var(--fw-bold)', color: 'var(--accent)' }}>اولین پرسش تو</span>
      <h1 style={{ margin: '8px 0 12px', fontSize: 'var(--text-h1)', fontWeight: 900, lineHeight: 'var(--lh-tight)' }}>دربارهٔ چه چیزی می‌تونی ساعت‌ها حرف بزنی؟</h1>
      <p style={{ margin: '0 0 var(--gap-stack)', fontSize: 'var(--text-body-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-secondary)' }}>هرچه واقعی‌تر، بهتر. لازم نیست جالب باشد — کافی است خودت باشی.</p>
      <S.Input multiline rows={5} placeholder="مثلاً: شب‌ها که همه خواب‌اند، آشپزخانه مال من است…" defaultValue="آشپزی، ولی نه دستور پخت — دربارهٔ اینکه چرا یک غذا آدم را یاد یک خانهٔ خاص می‌اندازد." />
      <div style={{ marginTop: 'var(--gap-inline)', fontSize: 'var(--text-micro)', color: 'var(--text-subtle)' }}>۹۶ از ۳۰۰ نویسه</div>
      <span style={{ flex: 1 }} />
      <S.SafetyTipsBanner variant="tip" linkLabel={null} title="جواب‌ها را همه می‌بینند.">شمارهٔ تماس و نشانی را اینجا ننویس.</S.SafetyTipsBanner>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-inline)', padding: 'var(--gap-stack) 0 var(--gutter-screen)' }}>
        <S.Button block size="lg">ادامه</S.Button>
        <S.Button block variant="ghost">این پرسش را رد کن</S.Button>
      </div>
    </Body>
  </React.Fragment> },

{ id: 'discover', name: 'Discover', fa: 'کاوش', note: 'A vertically-scrollable single card — not a swipe stack. Like and pass are ordinary buttons; the photo stays soft until the conversation earns it.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar logo trailing={<S.IconButton label="فیلترها" variant="ghost" size="md"><SI.Settings size={21} /></S.IconButton>} />
    <Body>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden', height: 232, flexShrink: 0 }}>
        <img src={P_AVA} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px)', transform: 'scale(1.14)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-media-scrim)' }} />
        <div style={{ position: 'absolute', insetInline: 14, insetBlockEnd: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <S.VerificationBadge size="sm" onPhoto /><S.DistanceChip km={3} onMedia /><S.AgeChip years={41} onMedia />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 'var(--text-h2)', fontWeight: 900, color: '#fff' }}>آوا</span>
            <S.PresenceIndicator status="online" onMedia />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', marginTop: 'var(--gap-card)', overflow: 'hidden' }}>
        <S.PromptCard label="پرسش اول" question="دربارهٔ چه چیزی می‌تونی ساعت‌ها حرف بزنی؟" answer="نقشه‌های قدیمی تهران. می‌دانی خیابانی که هر روز از آن رد می‌شوی هفتاد سال پیش چه بوده؟" />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <S.Chip variant="cool">کتاب</S.Chip><S.Chip variant="cool">پیاده‌روی</S.Chip><S.Chip variant="cool">موسیقی</S.Chip>
        </div>
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 'var(--gap-inline)', padding: 'var(--gap-card) 0' }}>
        <S.Button variant="secondary" style={{ flex: 1 }}>فعلاً نه</S.Button>
        <S.Button variant="gradient" style={{ flex: 2 }} iconLeft={<SI.Heart size={18} />}>جواب می‌دهم</S.Button>
      </div>
    </Body>
    <TabBar active="discover" />
  </React.Fragment> },

{ id: 'chat', name: 'Chat', fa: 'گفت‌وگو', note: 'Sent messages align to the left edge, received to the right. Read receipts and the typing indicator carry the cool role — the other person.',
  render: () => <React.Fragment>
    <StatusBar />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px var(--gutter-screen) 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
      <S.IconButton label="بازگشت" variant="ghost" size="md"><SI.Back size={22} /></S.IconButton>
      <S.Avatar name="آوا" size="sm" src={P_AVA} ring="cool" online />
      <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><b style={{ fontSize: 'var(--text-body-sm)' }}>آوا</b><S.VerificationBadge size="mini" /></span>
        <S.PresenceIndicator status="online" />
      </span>
      <S.IconButton label="بیشتر" variant="ghost" size="md"><SI.More size={21} /></S.IconButton>
    </div>
    <Body style={{ paddingTop: 12 }}>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8 }}>
        <S.DateSeparator label="امروز" />
        <S.SystemMessage variant="match">شما مچ شدید — چون هر دو یک جواب را انتخاب کردید.</S.SystemMessage>
        <S.ChatBubble from="received" time="۹:۳۸">خوشحالم که یه چیزی گفتی. بیشتر آدم‌ها فقط نگاه می‌کنن.</S.ChatBubble>
        <S.ChatBubble from="sent" status="read" time="۹:۴۰">جواب تو دربارهٔ نقشه‌های قدیمی رو دو بار خوندم.</S.ChatBubble>
        <S.VoicePlayer from="received" duration="۰:۲۴" playing progress={0.38} />
        <S.ChatBubble from="sent" status="delivered" time="۹:۴۳">فردا ساعت پنج جلوی کتاب‌فروشی؟</S.ChatBubble>
        <S.TypingIndicator />
      </div>
      <div style={{ flexShrink: 0, padding: '12px 0 var(--gutter-screen)' }}><S.MessageInput state="empty" placeholder="یک چیز واقعی بنویس…" onChange={() => {}} /></div>
    </Body>
  </React.Fragment> },

{ id: 'likes', name: 'Likes', fa: 'کسانی که جواب دادند', note: 'Faces stay soft until a conversation starts — the list is about what people said, not how they look. New answers carry the match ring.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar title="جواب‌ها" trailing={<S.Badge variant="count">۵</S.Badge>} />
    <Body>
      <S.SegmentedControl value="all" options={[{ value: 'all', label: 'همه' }, { value: 'voice', label: 'صوتی' }, { value: 'new', label: 'تازه' }]} onChange={() => {}} />
      <div style={{ height: 'var(--gap-card)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', overflow: 'hidden' }}>
        {[{ n: 'سارا', a: 43, p: P_SARA, r: 'match', q: 'به جواب تو دربارهٔ آشپزی', t: 'آن غذا که آدم را یاد یک خانه می‌اندازد — مال من آش رشتهٔ مادربزرگ است.', b: <S.Badge variant="warm">تازه</S.Badge> },
          { n: 'نیما', a: 47, p: P_NIMA, r: 'cool', q: 'پیام صوتی فرستاد', t: 'صدایش آرام است. ۰:۳۱ ثانیه دربارهٔ همان نقشه‌های قدیمی.', b: <S.Badge variant="cool">صوتی</S.Badge> },
          { n: 'مریم', a: 38, p: P_MARYAM, r: null, q: 'به پرسش دوم تو', t: 'آخرین چیزی که یاد گرفتم: چطور نان بربری خانگی بپزم. هنوز ذوقش را دارم.', b: null }].map(x =>
          <S.Card key={x.n} interactive pad="sm">
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <S.Avatar name={x.n} size="md" src={x.p} blur={10} ring={x.r || undefined} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <b style={{ fontSize: 'var(--text-body-sm)' }}>{x.n}</b>
                  <S.AgeChip years={x.a} variant="inline" />
                  <span style={{ flex: 1 }} />{x.b}
                </div>
                <span style={{ fontSize: 'var(--text-micro)', color: 'var(--conversation-active-fg)' }}>{x.q}</span>
                <p style={{ margin: 0, fontSize: 'var(--text-caption)', lineHeight: 'var(--lh-normal)', color: 'var(--text-secondary)' }}>{x.t}</p>
              </div>
            </div>
          </S.Card>)}
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ paddingBottom: 'var(--gap-card)' }}><S.SafetyTipsBanner variant="tip" linkLabel="راهنمای ایمنی" onLink={() => {}} title="عجله نکن.">اول چند جمله رد و بدل کن، بعد تصمیم بگیر.</S.SafetyTipsBanner></div>
    </Body>
    <TabBar active="talks" />
  </React.Fragment> },

{ id: 'profile', name: 'Profile', fa: 'تو', note: 'Your own profile leads with words. The photo is present but subordinate; the prompt answers are the content.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar title="تو" trailing={<S.IconButton label="تنظیمات" variant="ghost" size="md"><SI.Settings size={21} /></S.IconButton>} />
    <Body>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexShrink: 0 }}>
        <S.Avatar name="رضا" size="lg" src={P_ME} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><b style={{ fontSize: 'var(--text-h3)' }}>رضا</b><S.AgeChip years={44} variant="inline" /></div>
          <S.VerificationBadge size="sm" />
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>تهران · معلم موسیقی</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 'var(--gap-inline)', margin: 'var(--gap-card) 0' }}>
        <S.Button variant="secondary" size="sm" style={{ flex: 1 }}>ویرایش پروفایل</S.Button>
        <S.Button variant="ghost" size="sm" style={{ flex: 1 }} iconLeft={<SI.Eye size={16} />}>پیش‌نمایش</S.Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-card)', overflow: 'hidden' }}>
        <S.PromptCard label="پرسش اول" question="دربارهٔ چه چیزی می‌تونی ساعت‌ها حرف بزنی؟" answer="سازهای دست‌ساز. یک سه‌تار دارم که خودم کوکش را عوض کردم و هنوز پشیمانم." />
        <S.PromptCard label="پرسش دوم" question="آخرین چیزی که یاد گرفتی و هنوز ذوقش را داری چه بود؟" answer="نت‌نویسی با دست. کند است، اما آدم آهنگ را جور دیگری می‌شنود." />
        <Section label="علاقه‌مندی‌ها">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <S.Chip selected>موسیقی قدیمی</S.Chip><S.Chip selected>کتاب</S.Chip><S.Chip selected>پیاده‌روی شبانه</S.Chip><S.Chip>آشپزی</S.Chip>
          </div>
        </Section>
      </div>
      <span style={{ flex: 1 }} />
    </Body>
    <TabBar active="you" />
  </React.Fragment> },

{ id: 'settings', name: 'Settings', fa: 'تنظیمات', note: 'Switch variant is decided by meaning: enabling adds something and takes the gradient; restricting limits or hides and takes the neutral track.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar back title="تنظیمات" />
    <Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)', overflow: 'hidden' }}>
        <Section label="گفت‌وگو">
          <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <S.SettingsRow variant="switch" icon={<SI.Mic size={20} />} title="پیام صوتی" subtitle="اجازه بده برایت صدا بفرستند" trailing={<S.Switch defaultChecked />} />
            <S.SettingsRow variant="switch" icon={<SI.ChatHeart size={20} />} title="اعلان گفتگوی تازه" trailing={<S.Switch defaultChecked />} />
            <S.SettingsRow variant="value" icon={<SI.Compass size={20} />} title="حداکثر فاصله" value="۱۲ کیلومتر" onClick={() => {}} />
          </div>
        </Section>
        <Section label="حریم خصوصی">
          <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <S.SettingsRow variant="switch" icon={<SI.Eye size={20} />} title="عکس‌هایم تا وقتی مچ نشید مه‌آلود بمانند" trailing={<S.Switch defaultChecked />} />
            <S.SettingsRow variant="switch" icon={<SI.Shield size={20} />} title="پنهان شدن از مخاطبان" subtitle="کسانی که شماره‌ات را دارند تو را نمی‌بینند" trailing={<S.Switch variant="restricting" defaultChecked />} />
            <S.SettingsRow variant="chevron" icon={<SI.Shield size={20} />} title="ایمنی و مسدودشده‌ها" subtitle="۲ نفر مسدود شده‌اند" onClick={() => {}} />
          </div>
        </Section>
        <Section label="حساب">
          <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <S.SettingsRow variant="value" title="شمارهٔ موبایل" value="۰۹۱۲ ۳۴۵ ۶۷۸۹" />
            <S.SettingsRow variant="destructive" title="حساب را غیرفعال کن" onClick={() => {}} />
          </div>
        </Section>
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ padding: '10px 0 var(--gutter-screen)', textAlign: 'center' }}><span className="mono" style={{ fontSize: 10 }}>Deltalk 1.0 · دل‌تاک</span></div>
    </Body>
  </React.Fragment> },

{ id: 'paywall', name: 'Paywall', fa: 'دل‌تاک بیشتر', note: 'The only screen that uses the --premium family — a tonal step of the brand pink ramp, never a new hue. The primary action stays the neutral --action-cta; premium colours the affordance, not the button.',
  render: () => <React.Fragment>
    <StatusBar />
    <TopBar trailing={<S.IconButton label="بستن" variant="ghost" size="md"><SI.Back size={22} /></S.IconButton>} />
    <Body>
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <span style={{ display: 'inline-flex', padding: '7px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--accent-tint)', color: 'var(--accent-tint-fg)', fontSize: 'var(--text-micro)', fontWeight: 'var(--fw-bold)' }}>دل‌تاک بیشتر</span>
        <h1 style={{ margin: '14px 0 8px', fontSize: 'var(--text-h1)', fontWeight: 900, lineHeight: 'var(--lh-tight)' }}>وقت بیشتری برای حرف زدن</h1>
        <p style={{ margin: 0, fontSize: 'var(--text-body-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--text-secondary)' }}>همان دل‌تاک، بدون محدودیت روزانه. هر وقت خواستی لغوش کن.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: 'var(--gap-section) 0' }}>
        {['جواب دادن به هر تعداد پرسش در روز', 'دیدن اینکه چه کسی به حرف‌هایت جواب داده', 'پیام صوتی بلندتر — تا سه دقیقه', 'انتخاب اینکه چه وقت عکس‌ها روشن شوند'].map(t =>
          <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--premium)', flexShrink: 0, marginTop: 1 }}><SI.Check size={19} /></span>
            <span style={{ fontSize: 'var(--text-body-sm)', lineHeight: 'var(--lh-normal)' }}>{t}</span>
          </div>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-inline)' }}>
        <div style={{ position: 'relative', background: 'var(--surface-card)', border: '2px solid var(--premium)', borderRadius: 'var(--radius-card)', padding: 'var(--pad-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 'var(--fw-bold)' }}>۶ ماهه</div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>ماهی ۹۹٬۰۰۰ تومان</div>
          </div>
          <span style={{ background: 'var(--premium)', color: 'var(--premium-on-fill)', borderRadius: 'var(--radius-pill)', padding: '5px 11px', fontSize: 'var(--text-micro)', fontWeight: 'var(--fw-bold)' }}>۳۰٪ کمتر</span>
        </div>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: 'var(--pad-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 'var(--fw-bold)' }}>ماهانه</div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>۱۴۲٬۰۰۰ تومان</div>
          </div>
        </div>
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-inline)', padding: 'var(--gap-card) 0 var(--gutter-screen)' }}>
        <S.Button block size="lg">ادامه</S.Button>
        <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--text-micro)', color: 'var(--text-subtle)', lineHeight: 'var(--lh-normal)' }}>پرداخت خودکار تمدید می‌شود. هر وقت خواستی از تنظیمات لغو کن.</p>
      </div>
    </Body>
  </React.Fragment> }];
