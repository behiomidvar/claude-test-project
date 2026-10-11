/* Deltalk UI Kit — component specimens, part A: Forms & Core.
   Each entry renders ONCE; the sheet renders it twice, in a light and a dark panel. */
const A = window.DeltalkDesignSystem_288455;
const AI = window.DeltalkIcons;
const AIt = ({ lb, children, col }) => <div className="it"><span className="lb">{lb}</span><div className="itrow" style={col ? { flexDirection: 'column', alignItems: 'stretch', width: '100%' } : null}>{children}</div></div>;
const AItems = ({ children }) => <div className="items">{children}</div>;
const Aw = ({ w, children }) => <div style={{ width: w || 260 }}>{children}</div>;

window.KIT_A = [
{ group: 'Forms & selection', num: '02.1',
  intro: 'Button is the declared source of truth for every button-shaped control — rank is carried by weight (solid → gradient → bordered → transparent), never by hue, so the hierarchy survives the theme flip and colour-blind viewing. Fields follow the ONE FRAME rule: the wrapper owns the surface, the border, the height and the padding; the inner control is naked and every state lives on the wrapper.',
  items: [
  { name: 'Button', desc: 'Primary action control. Heights 40 / 48 / 56, --radius-button, five variants.', render: () => <AItems>
      <AIt lb="variants"><A.Button>ثبت‌نام</A.Button><A.Button variant="gradient">شروع گفت‌وگو</A.Button><A.Button variant="secondary">بعداً</A.Button><A.Button variant="ghost">رد کردن</A.Button><A.Button variant="destructive">حذف حساب</A.Button></AIt>
      <AIt lb="sizes — sm 40 · md 48 · lg 56"><A.Button size="sm">کوچک</A.Button><A.Button size="md">متوسط</A.Button><A.Button size="lg">بزرگ</A.Button></AIt>
      <AIt lb="states"><A.Button>پیش‌فرض</A.Button><A.Button className="is-hover">هاور</A.Button><A.Button className="is-press">فشرده</A.Button><A.Button className="is-focus">فوکوس</A.Button><A.Button disabled>غیرفعال</A.Button></AIt>
      <AIt lb="block + leading icon" col><A.Button block iconLeft={<AI.Send size={18} />}>فرستادن پیام</A.Button></AIt>
    </AItems> },
  { name: 'IconButton', desc: 'Icon-only action. Rounded square by DEFAULT (a chrome utility whose label did not fit); shape="circle" is an explicit opt-in for controls floating over content or in the avatar family. Requires a label for assistive tech; visual size never grows to reach 48dp — a transparent inset does.', render: () => <AItems>
      <AIt lb="variants"><A.IconButton label="بیشتر" variant="ghost"><AI.More /></A.IconButton><A.IconButton label="پسند" variant="solid" shape="circle"><AI.Heart /></A.IconButton><A.IconButton label="ایمنی" variant="outline"><AI.Shield /></A.IconButton></AIt>
      <AIt lb="square 36/48/52 (default) — search · filter · settings · back · three-dot · close"><A.IconButton label="بازگشت" variant="outline" size="sm"><AI.Back /></A.IconButton><A.IconButton label="بازگشت" variant="outline" size="md"><AI.Back /></A.IconButton><A.IconButton label="بازگشت" variant="outline" size="lg"><AI.Back /></A.IconButton></AIt>
      <AIt lb="circle 36/48/52 (opt-in) — Like/Pass · on-photo hearts · composer send"><A.IconButton label="پسند" variant="outline" shape="circle" size="sm"><AI.Heart /></A.IconButton><A.IconButton label="پسند" variant="outline" shape="circle" size="md"><AI.Heart /></A.IconButton><A.IconButton label="پسند" variant="outline" shape="circle" size="lg"><AI.Heart /></A.IconButton></AIt>
      <AIt lb="states"><A.IconButton label="صدا" variant="outline"><AI.Mic /></A.IconButton><A.IconButton label="صدا" variant="outline" className="is-press"><AI.Mic /></A.IconButton><A.IconButton label="صدا" variant="outline" className="is-focus"><AI.Mic /></A.IconButton><A.IconButton label="صدا" variant="outline" disabled><AI.Mic /></A.IconButton></AIt>
    </AItems> },
  { name: 'Input', desc: 'Single-line and multiline field. One bordered surface only; RTL, right-aligned, leading icons at the RTL start.', render: () => <AItems>
      <AIt lb="rest · filled" col><Aw><A.Input label="نام" placeholder="اسمی که دوست داری صدایت کنند" /></Aw><Aw><A.Input label="شهر" defaultValue="تهران" /></Aw></AIt>
      <AIt lb="hint · error · disabled" col><Aw><A.Input label="شغل" defaultValue="معلم موسیقی" hint="اختیاری — می‌توانی خالی بگذاری." /></Aw><Aw><A.Input label="نام" defaultValue="" error="اسمت را بنویس تا بدانیم چه صدایت کنیم." /></Aw><Aw><A.Input label="شمارهٔ ثبت‌شده" defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" disabled /></Aw></AIt>
      <AIt lb="multiline · with icon" col><Aw><A.Input label="جواب پرسش" multiline rows={3} defaultValue="شب‌ها که همه خوابند، آشپزخانه مال من است و رادیو روشن." /></Aw><Aw><A.Input placeholder="جست‌وجو در گفتگوها" iconLeft={<AI.Compass size={18} />} /></Aw></AIt>
    </AItems> },
  { name: 'Switch', desc: 'Two semantic variants. Enabling adds something (gradient track); restricting limits or hides (neutral --action-cta track). The choice is decided by meaning, never by visual density.', render: () => <AItems>
      <AIt lb='variant="enabling" — on / off' col><A.Switch label="پیام صوتی" defaultChecked /><A.Switch label="نشان دادن فاصله" /></AIt>
      <AIt lb='variant="restricting" — on / off' col><A.Switch label="حالت ناشناس" variant="restricting" defaultChecked /><A.Switch label="پنهان شدن از مخاطبان" variant="restricting" /></AIt>
      <AIt lb="pressed · disabled" col><A.Switch label="اعلان گفتگوی تازه" defaultChecked pressed /><A.Switch label="در دسترس نیست" disabled /><A.Switch label="غیرفعال و روشن" defaultChecked disabled /></AIt>
    </AItems> },
  { name: 'Checkbox', desc: 'Multi-select and consent. Neutral --action-cta fill: a checkbox is not a branded state.', render: () => <AItems>
      <AIt lb="unchecked · checked · indeterminate" col><A.Checkbox label="کتاب و متن‌های بلند" onChange={() => {}} /><A.Checkbox label="گفت‌وگوی شبانه" checked onChange={() => {}} /><A.Checkbox label="همه علاقه‌مندی‌ها" indeterminate onChange={() => {}} /></AIt>
      <AIt lb="with hint · error · disabled" col><A.Checkbox label="قواعد گفت‌وگو را خواندم" hint="خلاصه‌اش: مهربان باش و عجله نکن." checked onChange={() => {}} /><A.Checkbox label="قواعد گفت‌وگو را خواندم" error hint="برای ادامه لازم است." onChange={() => {}} /><A.Checkbox label="در دسترس نیست" disabled onChange={() => {}} /></AIt>
    </AItems> },
  { name: 'Radio', desc: 'Single choice from a short list, with optional per-option hint and disabled options.', render: () => <Aw w={300}><A.Radio value="women" options={[
      { value: 'women', label: 'زن‌ها' }, { value: 'men', label: 'مرد‌ها' },
      { value: 'both', label: 'هر دو', hint: 'گفتگوها را از هر دو گروه نشان بده.' },
      { value: 'none', label: 'فعلاً هیچ‌کدام', disabled: true }]} onChange={() => {}} /></Aw> },
  { name: 'SegmentedControl', desc: 'Two to four mutually exclusive views. Selected segment takes --gradient-brand.', render: () => <AItems>
      <AIt lb="selected · first" col><Aw w={300}><A.SegmentedControl value="all" options={[{ value: 'all', label: 'همه' }, { value: 'unread', label: 'خوانده‌نشده' }, { value: 'voice', label: 'صوتی' }]} onChange={() => {}} /></Aw></AIt>
      <AIt lb="selected · middle, with a disabled option" col><Aw w={300}><A.SegmentedControl value="unread" options={[{ value: 'all', label: 'همه' }, { value: 'unread', label: 'خوانده‌نشده' }, { value: 'archive', label: 'بایگانی', disabled: true }]} onChange={() => {}} /></Aw></AIt>
    </AItems> },
  { name: 'Select', desc: 'Dropdown trigger for a longer list. Same one-frame geometry as Input.', render: () => <AItems>
      <AIt lb="placeholder · value" col><Aw><A.Select label="شهر" placeholder="شهرت را انتخاب کن" options={[{ value: 'thr', label: 'تهران' }, { value: 'isf', label: 'اصفهان' }, { value: 'shz', label: 'شیراز' }]} onChange={() => {}} /></Aw><Aw><A.Select label="شهر" value="isf" options={[{ value: 'thr', label: 'تهران' }, { value: 'isf', label: 'اصفهان' }]} onChange={() => {}} /></Aw></AIt>
      <AIt lb="error · disabled" col><Aw><A.Select label="شهر" placeholder="انتخاب کن" error="یک شهر انتخاب کن." options={[{ value: 'thr', label: 'تهران' }]} onChange={() => {}} /></Aw><Aw><A.Select label="کشور" value="ir" disabled options={[{ value: 'ir', label: 'ایران' }]} onChange={() => {}} /></Aw></AIt>
    </AItems> },
  { name: 'RangeSlider', desc: 'Single value and dual-handle range. RTL-aware: the track fills from the inline start.', render: () => <AItems>
      <AIt lb="single" col><Aw w={320}><A.RangeSlider label="حداکثر فاصله" min={1} max={100} value={12} unit="کیلومتر" onChange={() => {}} /></Aw></AIt>
      <AIt lb="dual" col><Aw w={320}><A.RangeSlider label="بازهٔ سن" dual min={18} max={70} values={[36, 52]} unit="سال" onChange={() => {}} /></Aw></AIt>
      <AIt lb="disabled" col><Aw w={320}><A.RangeSlider label="حداکثر فاصله" min={1} max={100} value={40} unit="کیلومتر" disabled onChange={() => {}} /></Aw></AIt>
    </AItems> },
  { name: 'SettingsRow', desc: 'The settings list row, in four shapes. Destructive rows carry the danger text token, never a filled red row.', render: () => <Aw w="100%"><div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <A.SettingsRow variant="chevron" icon={<AI.Shield size={20} />} title="ایمنی و حریم خصوصی" subtitle="مسدودشده‌ها، گزارش‌ها، پنهان‌سازی" onClick={() => {}} />
      <A.SettingsRow variant="value" icon={<AI.Compass size={20} />} title="حداکثر فاصله" value="۱۲ کیلومتر" onClick={() => {}} />
      <A.SettingsRow variant="switch" icon={<AI.Eye size={20} />} title="عکس‌هایم تا وقتی مچ نشید مه‌آلود بمانند" trailing={<A.Switch defaultChecked />} />
      <A.SettingsRow variant="destructive" title="حساب را غیرفعال کن" onClick={() => {}} />
    </div></Aw> },
  { name: 'DateOfBirthFieldGroup', desc: 'Typed Jalali date-of-birth entry — three single frames reading right to left, with a live age confirmation. Deliberately not a wheel or a calendar.', render: () => <AItems>
      <AIt lb="empty" col><Aw w={340}><A.DateOfBirthFieldGroup onChange={() => {}} /></Aw></AIt>
      <AIt lb="valid — live confirmation" col><Aw w={340}><A.DateOfBirthFieldGroup day="۱۴" month={4} year="۱۳۶۳" onChange={() => {}} /></Aw></AIt>
      <AIt lb="error — blur-gated" col><Aw w={340}><A.DateOfBirthFieldGroup day="۳۲" month={1} year="۱۴۱۰" showErrors onChange={() => {}} /></Aw></AIt>
    </AItems> },
]},
{ group: 'Core', num: '02.2',
  intro: 'Avatar is the declared source of truth for the circular user image and its presence dot; Badge for tinted status pills and the numeric count pill. Badge states a fact and is never tappable; Chip is a user choice with a 48dp target — a selected chip is filled with the gradient, drops its border and gains a checkmark, so selection is never colour-only.',
  items: [
  { name: 'Card', desc: 'The raised paper surface. Four variants, three padding steps; interactive cards lift 2px on hover.', render: () => <AItems>
      <AIt lb="variants" col><div className="grid2" style={{ gap: 12, width: '100%' }}>
        <A.Card pad="sm"><b>raised</b><div style={{ fontSize: 14, marginTop: 6, color: 'var(--text-secondary)' }}>روی پس‌زمینه</div></A.Card>
        <A.Card variant="flat" pad="sm"><b>flat</b><div style={{ fontSize: 14, marginTop: 6, color: 'var(--text-secondary)' }}>سطح فرورفته</div></A.Card>
        <A.Card variant="cool" pad="sm"><b>cool</b><div style={{ fontSize: 14, marginTop: 6, opacity: .85 }}>طرف مقابل</div></A.Card>
        <A.Card variant="gradient" pad="sm"><b>gradient</b><div style={{ fontSize: 14, marginTop: 6, opacity: .9 }}>فقط لحظهٔ ویژه</div></A.Card>
      </div></AIt>
      <AIt lb="padding — sm 12 · md 16 (default) · lg 24" col><div className="grid3" style={{ gap: 12, width: '100%' }}>
        <A.Card pad="sm"><span style={{ fontSize: 13 }}>pad="sm"</span></A.Card><A.Card><span style={{ fontSize: 13 }}>pad="md"</span></A.Card><A.Card pad="lg"><span style={{ fontSize: 13 }}>pad="lg"</span></A.Card>
      </div></AIt>
      <AIt lb="interactive — rest / hover" col><div className="grid2" style={{ gap: 12, width: '100%' }}>
        <A.Card interactive pad="sm"><span style={{ fontSize: 13 }}>قابل لمس</span></A.Card><A.Card interactive pad="sm" style={{ transform: 'translateY(-2px)', boxShadow: 'var(--shadow-lg)' }}><span style={{ fontSize: 13 }}>هاور — بلند شدن ۲ پیکسل</span></A.Card>
      </div></AIt>
    </AItems> },
  { name: 'Avatar', desc: 'The user image and its presence dot. Named rungs xs–xl or a numeric size; the dot is 26% of the diameter, centre-anchored on the perimeter at the inline-end.', render: () => <AItems>
      <AIt lb="sizes — xs 32 · sm 40 · md 52 · lg 72 · xl 112"><A.Avatar name="د" size="xs" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=faces" /><A.Avatar name="د" size="sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=faces" /><A.Avatar name="آوا" size="md" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&q=80&fit=crop&crop=faces" /><A.Avatar name="سارا" size="lg" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=faces" /><A.Avatar name="نیما" size="xl" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=faces" /></AIt>
      <AIt lb="online · initials fallback · soft reveal (blur)"><A.Avatar name="آوا" size="lg" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=faces" online /><A.Avatar name="ری" size="lg" /><A.Avatar name="رضا" size="lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=faces" blur={12} /></AIt>
      <AIt lb='rings — match · cool · both (match wins)'><A.Avatar name="آوا" size="lg" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=faces" ring="match" /><A.Avatar name="سارا" size="lg" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=faces" ring="cool" /><A.Avatar name="نیما" size="lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=faces" ring={['match', 'cool']} online /></AIt>
    </AItems> },
  { name: 'Badge', desc: 'Read-only status pill, plus variant="count" — the unread numeric pill on --gradient-brand-strong.', render: () => <AItems>
      <AIt lb="variants"><A.Badge variant="active">همین الان در گفت‌وگو</A.Badge><A.Badge variant="success">تأییدشده</A.Badge><A.Badge variant="danger">گزارش‌شده</A.Badge><A.Badge variant="warm">تازه</A.Badge><A.Badge variant="cool">صوتی</A.Badge><A.Badge variant="neutral">بایگانی</A.Badge><A.Badge variant="solid">ویژه</A.Badge></AIt>
      <AIt lb="muted · count"><A.Badge variant="warm" muted>تازه</A.Badge><A.Badge variant="cool" muted>صوتی</A.Badge><A.Badge variant="count">۲</A.Badge><A.Badge variant="count">۱۲</A.Badge></AIt>
    </AItems> },
  { name: 'Chip', desc: 'Interactive selection pill, ≥48dp. Selected = gradient fill + checkmark + no border.', render: () => <AItems>
      <AIt lb="default · selected · with icon"><A.Chip>کتاب و متن‌های بلند</A.Chip><A.Chip selected>گفت‌وگوی شبانه</A.Chip><A.Chip iconLeft={<AI.Compass size={15} />}>نزدیک من</A.Chip></AIt>
      <AIt lb="states"><A.Chip>پیش‌فرض</A.Chip><A.Chip className="is-hover">هاور</A.Chip><A.Chip className="is-press">فشرده</A.Chip><A.Chip className="is-focus">فوکوس</A.Chip><A.Chip disabled>غیرفعال</A.Chip></AIt>
      <AIt lb='variant="cool" — relational'><A.Chip variant="cool">او هم اهل کتاب است</A.Chip><A.Chip variant="cool" selected>هم‌سلیقه</A.Chip></AIt>
    </AItems> },
]}];
