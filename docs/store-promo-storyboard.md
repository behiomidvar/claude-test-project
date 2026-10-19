# StorePromo — Phase 1 storyboard (redo: one person's journey)

30 s, 30 fps, 9:16 (`StorePromo`, 1080x1920) and 16:9 (`StorePromo-16x9`), built from one
scene tree.
- **Story:** علی (۴۱، تهران, looking for رابطه‌ی جدی) signs up, finds سارا, likes her with a
  message, and they match a day later and talk.
- **Pacing:** set-up is quick; reading and talking are unhurried.
- **The phone:** one continuous phone carries S2–S6, and the camera moves over it.
- **Theme:** light for S1–S6, dark for S7.
- **Stills:** static key poses built from real DS components. Nothing animates yet.

> **Music is a GENERATED TEMP TRACK, not final.** `assets/audio/temp-music.wav`
> (`scripts/audio/gen_temp_music.py`) is 96 BPM, D major, with a warm pad, a soft e-piano
> and a light pulse. It has no drums, risers or whooshes.
> - S2: brisk.
> - S3: eases down.
> - S5: a held chord for «یه روز بعد», then a small swell that blooms at the match (20.0 s).
> - S6: the quietest section.
> - S7: resolves on its first beat.
>
> The stem sits at −16.2 LUFS with a −1.5 dBFS peak. Mastering to −14 LUFS comes with the SFX
> mix in Phase 3.

## Phase 2 (S1–S3, 0–13.75 s): built

The S1–S3 cut is `renders/store-promo-phase2.mp4` (1080x1920, temp music). Its
stills are `renders/store-promo-phase2-stills-9x16.png` and `-16x9.png`.

- **The clock.** Everything in S2–S6 is a function of film time (`FlowFrame`), so a
  storyboard still and a video frame come from the same code. The timings are in
  beats, and the durations and easings come from the DS motion tokens
  (`src/store/flow/motion.tsx`).
- **The unfold.** Every element enters as the DS unfold: fade in, 8 dp lift and a
  scale from .98. Headlines unfold word by word in reading order, one word per eighth
  note, and fold out together over `--dur-base` before the cut. Taps press to
  `--press-scale` and ripple out. Nothing slides or swipes.
- **S1.** The question arrives at b2 and the small dots return at b4. The question
  folds out over `--dur-slow` before the cut, so S2's phone unfolds over only the three
  dots.
- **S2.**
  - One onboarding step per beat. StepProgress advances, and each question and field
    unfold over `--dur-base` and fold away over `--dur-fast`.
  - Each step's input:
    - «علی» types in.
    - The radio, the date, «مرد» and «تهران» fill on taps.
    - The photo uploads (the ring, then the photo); its label reads «عکس اول».
  - The camera eases down for «شروع کنیم»; in 16:9 it eases back to keep the question
    in.
  - The verification badge settles with `--ease-gentle-over`.
  - The app's three cool dots carry the cut into S3.
- **S3.**
  - The dots give way to Sara's card: photo, prompt, voice note and buttons, staged.
  - Two slow ease-in-out scrolls, vertical only.
  - The camera pushes in from 1.00 to 1.06.
  - Her voice note plays (VoicePlayer's playhead, at real time for «۰:۲۴»).
  - His finger presses «لایک».
- **S4–S6** still hold their settled poses on their beats (Phase 3).

## Phase 1 storyboard (approved)

## Review files (`renders/store-promo-phase1/`)
- `storyboard-9x16.png` and `storyboard-16x9.png`: contact sheets of all 19 stills, in film
  order.
- `<still>-9x16.png` and `<still>-16x9.png`: each still on its own, named as in the table below.
- `animatic-9x16-half.mp4`: a low-res animatic with the temp music.
  - Poses switch hard on their beats. The unfold transitions come in Phases 2–3.
  - The cuts land on frames 94, 281, 413, 544, 638 and 806.

Re-render with `npm run storyboard:store`. Print and check the cuts with `npm run timeline:store`.

## Timeline (beat-snapped; one beat = 0.625 s)

| scene | start–end s | length | beats | stills |
|---|---|---|---|---|
| S1 Hook | 0.000–3.125 | 3.13 | 0–5 | `s1-dots`, `s1-question` |
| S2 Account | 3.125–9.375 | 6.25 | 5–15 | `s2-name`, `s2-birth`, `s2-photo`, `s2-verify` |
| S3 Discover | 9.375–13.750 | 4.38 | 15–22 | `s3-card`, `s3-voice`, `s3-like` |
| S4 Like with a message | 13.750–18.125 | 4.38 | 22–29 | `s4-typing`, `s4-send`, `s4-sent` |
| S5 A day later, match | 18.125–21.250 | 3.13 | 29–34 | `s5-later`, `s5-match` |
| S6 Conversation | 21.250–26.875 | 5.63 | 34–43 | `s6-reply`, `s6-voice`, `s6-last` |
| S7 Final (dark) | 26.875–30.000 | 3.13 | 43–48 | `s7-dots`, `s7-final` |

Every cut moves by at most 0.25 s from the brief's times.

## The flow inside the phone (poses, in beats from the scene's start)

**S2 (brisk).** Each onboarding step holds for one beat (0.625 s).
- **The seven steps:**
  - +0: «اسمت چیه؟» with «علی».
  - +1: «دنبال چی هستی؟» with «رابطه‌ی جدی».
  - +2: «تولدت کِیه؟» with the date. The DS field prints «۴۱ ساله» itself.
  - +3: «جنسیتت چیه؟» with «مرد».
  - +4: «کجا زندگی می‌کنی؟» with «تهران».
  - +5: «چه عکسی ازت ببینیم؟». His photo drops into the first slot.
  - +6: «قبل از شروع». He taps «شروع کنیم».
- **Progress:** StepProgress advances 1/7 to 7/7.
- **Tap marks:** the finger lands on each step's choice, so the camera stays on the
  question.
- **Verification:** at +7 (1.9 s), «بذار مطمئن بشن خودتی» and the VerificationBadge settles
  next to «علی، ۴۱».

**S3 (slower).** The camera pushes in gently, and Sara's single card scrolls vertically.
- +0: her photo.
- +2: her prompt.
- +4: her voice note plays.
- +5.5: his finger taps «لایک».

**S4.** The composer sheet «پیام همراه لایک برای سارا» opens over her card.
- +0 to +3.5: he types character by character, in RTL.
- +3.5: he taps «ارسال لایک».
- +5: the confirmation sheet appears.

**S5.**
- +0: the phone rests and dims. Outside it, the three cool dots carry «یه روز بعد».
- +3 (the swell's bloom): the match screen.
  - The two portraits sit inside one `--gradient-celebration` ring.
  - The DS ChatState heart, «دل‌هاتون به هم رسید» and «تو و سارا همدیگه رو لایک کردید».
  - The card «هدف هر دوتون: رابطه‌ی جدی».
- +4.25: he taps «شروع گفتگو».

**S6 (slowest).** The thread opens on his like-message (marked «دیروز»). Then the messages
arrive, about every 1.5 beats:
- her reply (marked «امروز»);
- his message;
- her voice note;
- his reply;
- her typing dots;
- her last message.

The times are spread over the morning (۷:۵۰ to ۹:۴۰), and nobody plans a meetup.

**S7.** Three cool dots on dark, then the full lockup (the asset) with «گفتگو با مچ‌هات،
رایگانه.» and «دلتاک رو از بازار بگیر», a neutral primary button.

## Gradients: one per frame
- **S2:** StepProgress's fill is `--gradient-brand` on every step, so «چند» stays flat accent
  for the whole scene. The goal step uses DS `Radio` rather than a selected Chip, because a
  Chip would be a second gradient on the same screen.
- **S3, S4 and S6:** the highlighted word («بخون», «قبل», «گل») carries the frame's gradient.
  «بخون»'s comma is not highlighted.
- **S5:** the celebration ring is the only gradient, so «گفتگو» is flat.
- **S7:** only the logo.
- **Elsewhere:** the verification rosette is flat `--verification` blue, the like and CTA
  buttons are neutral, and the background is flat.

## Assets
- **Photos:** `reference/me.jpeg` (علی) and `reference/L02-L03-L07-L08-sara.jpg` (سارا).
  Aida, Negar and the other uploads are no longer used.
- **No reference video.** `reference/video/reference.mp4` still doesn't exist.

## Copy I added, flagged in `src/copy.ts`
- **From the UI kit's real screens:** «ادامه» (onboarding), «فعلاً نه» (pass), and «۹:۴۱»
  (status bar).
- **Additions to approve:**
  - the goal options «دوستی و هم‌صحبتی» and «فعلاً مطمئن نیستم»;
  - the gender option «زن»;
  - the like label «لایک»;
  - the length of her Discover voice note («۰:۲۴»);
  - the day markers «دیروز» and «امروز»;
  - the message times;
  - his birth date (12 Tir 1364, from which the field prints «۴۱ ساله»).
- **Her prompt** is split at the ellipsis: «یک عصر ایده‌آل برای من…» becomes PromptCard's
  question and the rest its answer.

## Where the real screens disagree (DS UI kit, `ui_kits/deltalk-ui-kit/screens.jsx`)
1. **Profile:** the kit's own profile is «رضا، ۴۴، تهران · معلم موسیقی». I found no «علی، ۴۱»
   anywhere in the sources.
2. **Onboarding:** the kit's onboarding is 6 steps («۳ از ۶») and opens on a prompt question.
   None of the 7 step titles in the brief exist in the DS or the kit, so I can't check them
   against the app.
3. **Discover:**
   - **Like button:** the kit's like is a gradient «جواب می‌دهم» button.
   - **Photos:** it blurs her photo; Likes and Settings also show blur.
   - **What I followed:** CLAUDE.md, with a neutral «لایک» and a sharp photo.
4. **Paywall:** it sells «همان دل‌تاک، بدون محدودیت روزانه», which implies the free tier
   has a daily limit. Does that limit spare chat with matches? «گفتگو با مچ‌هات، رایگانه.»
   depends on it.
5. **Verified-only messages before a match:** this rule appears nowhere in the DS or the kit.
6. **DS bug:** `forms/Input` and `messaging/MessageInput` share the style id
   `dt-input-css`. It now has a local patch, re-applied by `ds:sync` and recorded in
   `docs/ds-patches.md`, so S6 shows the composer.
7. **«۴۱ ساله» comes from the DS.** `DateOfBirthFieldGroup` prints it from the date. A
   matching hint line printed it twice, so I removed the hint.

## Open questions
1. **Like label:** is it «لایک», or the kit's «جواب می‌دهم»?
2. **Paywall:** please confirm chat with matches has no daily limit (point 4 above).
3. **Her voice note:** her Discover voice note needs a length; I used «۰:۲۴».
4. **16:9:** it builds from the same tree, but the phone's UI text is small. I'll widen the
   landscape camera window in Phase 2.
