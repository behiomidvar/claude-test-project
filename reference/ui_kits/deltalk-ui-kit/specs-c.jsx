/* Deltalk UI Kit — component specimens, part C: Onboarding, Feedback, Safety. */
const C = window.DeltalkDesignSystem_288455;
const CI = window.DeltalkIcons;
const CIt = ({ lb, children, col }) => <div className="it"><span className="lb">{lb}</span><div className="itrow" style={col ? { flexDirection: 'column', alignItems: 'stretch', width: '100%' } : null}>{children}</div></div>;
const CItems = ({ children }) => <div className="items">{children}</div>;
const Cw = ({ w, children }) => <div style={{ width: w || 300 }}>{children}</div>;
const CStage = ({ children }) => <div className="stage"><div className="stage-bg">{[52, 86, 74, 90, 40, 80].map((w, i) => <i key={i} style={{ width: w + '%' }} />)}</div>{children}</div>;
const Q1 = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&fit=crop&crop=faces';
const Q2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=faces';

window.KIT_C = [
{ group: 'Onboarding', num: '02.6',
  intro: 'Numerals are Persian everywhere except the two entry controls transcribed from an SMS — PhoneInput and OtpInput use Latin digits, and the phone control is the one fully LTR field in the system (its label, helper and error stay RTL). Iran-only means +98 is static text: no chevron, no country picker.',
  items: [
  { name: 'PhoneInput', desc: 'Phone entry with a static +98 affix. The wrapper is LTR so the caret sits after the divider and typing grows rightward.', render: () => <CItems>
      <CIt lb="rest · filled" col><Cw><C.PhoneInput label="شمارهٔ موبایل" placeholder="912 345 6789" onChange={() => {}} /></Cw><Cw><C.PhoneInput label="شمارهٔ موبایل" value="912 345 6789" onChange={() => {}} /></Cw></CIt>
      <CIt lb="hint · error · disabled" col><Cw><C.PhoneInput label="شمارهٔ موبایل" value="912 345" hint="کد تأیید را با پیامک می‌فرستیم." onChange={() => {}} /></Cw><Cw><C.PhoneInput label="شمارهٔ موبایل" value="912 34" error="شماره کامل نیست." onChange={() => {}} /></Cw><Cw><C.PhoneInput label="شمارهٔ ثبت‌شده" value="912 345 6789" disabled onChange={() => {}} /></Cw></CIt>
    </CItems> },
  { name: 'OtpInput', desc: 'Code entry. Each box is its own single frame; the active box takes the 2dp focus ring — never an inner box. The resend countdown is prose, so it stays in Persian digits.', render: () => <CItems>
      <CIt lb="empty (first box focused) · partial" col><Cw><C.OtpInput value="" autoFocus onChange={() => {}} /></Cw><Cw><C.OtpInput value="4821" onChange={() => {}} /></Cw></CIt>
      <CIt lb="error · resend countdown" col><Cw><C.OtpInput value="48213" error="کد درست نیست. دوباره نگاه کن." onChange={() => {}} /></Cw><Cw><C.OtpInput value="482" resendSeconds={38} onResend={() => {}} onChange={() => {}} /></Cw></CIt>
    </CItems> },
  { name: 'PhotoGrid', desc: 'Photo slots with every upload state. Photos start soft-blurred and clarify as the conversation builds — the signature reveal.', render: () => <Cw w="100%"><C.PhotoGrid slots={[
      { state: 'uploaded', src: Q1 }, { state: 'uploading', progress: 0.6 }, { state: 'error' },
      { state: 'empty' }, { state: 'empty' }, { state: 'empty' }]} onAdd={() => {}} onRemove={() => {}} onRetry={() => {}} /></Cw> },
  { name: 'StepProgress', desc: 'Where you are in onboarding. Three variants; the filled portion is --gradient-brand and mirrors in RTL.', render: () => <CItems>
      <CIt lb='variant="bar"' col><Cw w="100%"><C.StepProgress current={3} total={6} /></Cw></CIt>
      <CIt lb='variant="dots"' col><Cw w="100%"><C.StepProgress current={3} total={6} variant="dots" /></Cw></CIt>
      <CIt lb='variant="labeled"' col><Cw w="100%"><C.StepProgress current={3} total={6} variant="labeled" label="عکس‌ها" /></Cw></CIt>
    </CItems> },
  { name: 'InterestPicker', desc: 'Multi-select chips with a maximum. The count is Persian; reaching the max disables the rest rather than hiding them.', render: () => <Cw w="100%"><C.InterestPicker label="چه چیزهایی برایت مهم است؟" max={5} value={['books', 'night', 'cook']} options={[
      { value: 'books', label: 'کتاب' }, { value: 'night', label: 'گفت‌وگوی شبانه' }, { value: 'cook', label: 'آشپزی' },
      { value: 'walk', label: 'پیاده‌روی' }, { value: 'music', label: 'موسیقی قدیمی' }, { value: 'film', label: 'سینما' },
      { value: 'garden', label: 'باغبانی' }, { value: 'travel', label: 'سفر جاده‌ای' }]} onChange={() => {}} /></Cw> },
]},
{ group: 'Feedback & states', num: '02.7',
  intro: 'Empty states ask a question rather than announcing a lack. Overlays are shown here inside a phone-sized stage — in the product each covers the whole viewport. Dialog is the bottom-sheet dialog with free-form actions; ConfirmDialog is the two-button decision; BottomSheet is the content surface.',
  items: [
  { name: 'Snackbar', desc: 'Transient confirmation at the bottom of the screen. Three tones, optional action and dismiss.', render: () => <Cw w="100%"><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <C.Snackbar variant="info" actionLabel="بازگردانی" onAction={() => {}}>گفت‌وگو بایگانی شد.</C.Snackbar>
      <C.Snackbar variant="success">عکس‌ها ذخیره شدند.</C.Snackbar>
      <C.Snackbar variant="error" actionLabel="تلاش دوباره" onAction={() => {}} onDismissClick={() => {}}>پیام فرستاده نشد.</C.Snackbar>
    </div></Cw> },
  { name: 'Dialog', desc: 'The bottom-sheet dialog: title, body, and free-form actions you compose from Button.', render: () => <CStage><C.Dialog open title="گفت‌وگو را ببندیم؟" actions={<React.Fragment><C.Button block onClick={() => {}}>بله، ببند</C.Button><C.Button block variant="secondary" onClick={() => {}}>بی‌خیال</C.Button></React.Fragment>}>این گفت‌وگو بایگانی می‌شود. هر وقت خواستی می‌توانی پیام تازه‌ای بفرستی.</C.Dialog></CStage> },
  { name: 'ConfirmDialog', desc: 'The two-button decision, info and destructive. Destructive confirms with the danger fill; the cancel stays secondary.', render: () => <div className="itrow" style={{ gap: 14 }}>
      <div style={{ flex: 1, minWidth: 220 }}><CStage><C.ConfirmDialog open variant="info" title="شمارهٔ تازه ثبت شود؟" confirmLabel="ثبت می‌کنم" cancelLabel="انصراف" onConfirm={() => {}} onCancel={() => {}}>کد تأیید به شمارهٔ جدید فرستاده می‌شود.</C.ConfirmDialog></CStage></div>
      <div style={{ flex: 1, minWidth: 220 }}><CStage><C.ConfirmDialog open variant="destructive" title="سارا مسدود شود؟" confirmLabel="مسدود کن" cancelLabel="انصراف" onConfirm={() => {}} onCancel={() => {}}>او دیگر نمی‌تواند تو را ببیند یا پیام بدهد و همدلی شما برداشته می‌شود.</C.ConfirmDialog></CStage></div>
    </div> },
  { name: 'BottomSheet', desc: 'Content surface at --radius-sheet 28. Standard, full, and a grip-only form with no title.', render: () => <div className="itrow" style={{ gap: 14 }}>
      <div style={{ flex: 1, minWidth: 220 }}><CStage><C.BottomSheet open size="standard" title="مرتب‌سازی" onClose={() => {}}><C.Radio value="newest" options={[{ value: 'newest', label: 'تازه‌ترین' }, { value: 'near', label: 'نزدیک‌ترین' }, { value: 'talkative', label: 'بیشترین گفت‌وگو' }]} onChange={() => {}} /></C.BottomSheet></CStage></div>
      <div style={{ flex: 1, minWidth: 220 }}><CStage><C.BottomSheet open size="full" title="راهنمای ایمنی" onClose={() => {}}><p style={{ margin: 0, fontSize: 'var(--text-body-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-secondary)' }}>نشانی خانه یا محل کارت را در گفت‌وگوهای اول نگو. اولین دیدار را جای عمومی بگذار. هر گفت‌وگو را هر وقت خواستی می‌توانی ترک کنی — لازم نیست توضیح بدهی.</p></C.BottomSheet></CStage></div>
    </div> },
  { name: 'EmptyState', desc: 'Four variants, each asking something. An empty screen is a question, not an apology.', render: () => <div className="grid2" style={{ gap: 14, width: '100%' }}>
      <C.EmptyState variant="noProfiles" onAction={() => {}} /><C.EmptyState variant="noMatches" onAction={() => {}} />
      <C.EmptyState variant="noMessages" onAction={() => {}} /><C.EmptyState variant="noResults" actionLabel={null} />
    </div> },
  { name: 'ErrorState', desc: 'Network and server failure, each with a retry. Plain language, never a code.', render: () => <div className="grid2" style={{ gap: 14, width: '100%' }}>
      <C.ErrorState variant="network" onRetry={() => {}} /><C.ErrorState variant="server" onRetry={() => {}} />
    </div> },
  { name: 'Skeleton', desc: 'Loading placeholders that match the shape they replace. The skeleton avatar is the one documented exception to Avatar being canonical — it is a shimmer block, with no image, ring or dot.', render: () => <CItems>
      <CIt lb='variant="profileCard" (alias: swipeCard) · "chatList"' col><div className="grid2" style={{ gap: 14, width: '100%' }}><C.Skeleton variant="profileCard" /><C.Skeleton variant="chatList" /></div></CIt>
      <CIt lb='variant="profile" · "text" · "avatar"' col><div className="grid2" style={{ gap: 14, width: '100%' }}><C.Skeleton variant="profile" /><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}><C.Skeleton variant="text" lines={3} /><C.Skeleton variant="avatar" /></div></div></CIt>
    </CItems> },
  { name: 'PullToRefresh', desc: 'The three phases of a pull. The indicator is the three-dots device, not a spinner.', render: () => <div className="grid3" style={{ gap: 14, width: '100%' }}>
      <div><span className="lb">pull · 40%</span><C.PullToRefresh state="pull" progress={0.4} /></div>
      <div><span className="lb">release</span><C.PullToRefresh state="release" progress={1} /></div>
      <div><span className="lb">refreshing</span><C.PullToRefresh state="refreshing" /></div>
    </div> },
  { name: 'PermissionCard', desc: 'Asks for a system permission in the product’s own voice, before the OS dialog. Four kinds; “later” is always a real option.', render: () => <div className="grid2" style={{ gap: 14, width: '100%' }}>
      <C.PermissionCard kind="location" onAllow={() => {}} onLater={() => {}} /><C.PermissionCard kind="notifications" onAllow={() => {}} onLater={() => {}} />
      <C.PermissionCard kind="camera" onAllow={() => {}} onLater={() => {}} /><C.PermissionCard kind="photos" onAllow={() => {}} onLater={() => {}} />
    </div> },
]},
{ group: 'Safety', num: '02.8',
  intro: 'Safety copy is calm and never alarming. A protective action is a restricting switch or a destructive confirm — never a celebratory brand colour. Blocking is reversible and says so.',
  items: [
  { name: 'SafetyTipsBanner', desc: 'An in-context safety note. tip is informational, warn is the raised-attention form; both are dismissible.', render: () => <Cw w="100%"><div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <C.SafetyTipsBanner variant="tip" linkLabel="راهنمای کامل" onLink={() => {}} onDismiss={() => {}} title="اولین دیدار را جای عمومی بگذار.">و به یک نفر بگو کجا می‌روی. عجله لازم نیست.</C.SafetyTipsBanner>
      <C.SafetyTipsBanner variant="warn" linkLabel="گزارش می‌دهم" onLink={() => {}} title="کسی از تو پول خواست؟">این را گزارش کن. ما پیگیری می‌کنیم و اسمت جایی نمی‌رود.</C.SafetyTipsBanner>
    </div></Cw> },
  { name: 'ReportFlow', desc: 'Reason list, then confirmation. Two steps only — a report should never feel like a form.', render: () => <div className="itrow" style={{ gap: 14, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 260 }}><span className="lb">step="reason"</span><C.ReportFlow step="reason" name="سارا" value="money" reasons={[{ value: 'money', label: 'درخواست پول' }, { value: 'fake', label: 'پروفایل جعلی' }, { value: 'rude', label: 'بی‌احترامی' }, { value: 'other', label: 'چیز دیگری' }]} onSelect={() => {}} onSubmit={() => {}} /></div>
      <div style={{ flex: 1, minWidth: 260 }}><span className="lb">step="done"</span><C.ReportFlow step="done" name="سارا" onDone={() => {}} /></div>
    </div> },
  { name: 'BlockedUserItem', desc: 'A blocked person in the safety list. Grayscale plus a scrim is a treatment layered on a real Avatar, not a second avatar component.', render: () => <Cw w="100%"><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <C.BlockedUserItem name="سارا" avatar={Q2} meta="مسدود شده در ۱۴ تیر" onUnblock={() => {}} />
      <C.BlockedUserItem name="نیما" avatar={Q1} meta="مسدود شده در ۲ خرداد" unblocking onUnblock={() => {}} />
    </div></Cw> },
]}];
