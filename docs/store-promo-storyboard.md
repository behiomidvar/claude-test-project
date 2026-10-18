# StorePromo — Phase 1 storyboard

30 s, 30 fps, 9:16 (`StorePromo`, 1080x1920) and 16:9 (`StorePromo-16x9`) from one scene
tree. Light theme S1–S8, dark S9. Stills are static key poses built from the real DS
components; nothing animates yet.

> **Music is a GENERATED TEMP TRACK, not final.** `assets/audio/temp-music.wav` was synthesised
> in code (`scripts/audio/gen_temp_music.py`): 96 BPM, D major, warm pad, soft e-piano
> arpeggio, light low pulse, no drums. Swell in bar 11 (the match), suspension on 27.5 s,
> resolve on 28.125 s (the logo). Stem at -16.0 LUFS, peak -3.3 dBFS; mastering to -14 LUFS
> happens with the SFX mix in Phase 3.

Review files (all in `renders/store-promo-phase1/`):
- `reference-vs-storyboard.png`: your frames L01/L02/L03/L05/L07 (top row) next to the
  matching key poses (bottom row)
- `storyboard-9x16.png` and `storyboard-16x9.png`: contact sheets, one key pose per scene
- `s1-9x16.png` … `s9-16x9.png`: each pose on its own
- `animatic-9x16-half.mp4`: an animatic at half scale, with each pose held for its
  beat-snapped slot over the temp music, so you can hear where each cut falls. The cuts are
  hard because this is a review tool. The unfold transitions come in Phases 2–3.

Re-render with `npm run storyboard:store` and print the timeline with `npm run timeline:store`.

## References
- **`reference/video/reference.mp4` does not exist, so the video study was skipped.**
- **Your reference frames, uploaded mid-phase (`reference/L01–L07`, light, and `D01–D07`,
  dark), now drive the compositions.**
  - S2 follows L01, S3 follows L02, S4 L03, S6 L05 and S7 L07. S5, S8 and S9 have no frame.
  - I took the screen content from them: Sara ۳۸ from تهران, «هدفش از دلتاک»,
    «فیلترها», «حداکثر فاصله» up to ۱۵۰ km, «دنبال چی می‌گرده؟», the chat times and
    the ۹:۴۱ status bar.
  - I followed them where they conflict with CLAUDE.md, except for the deviations
    listed below.
- **Photos.** They are bundled from `reference/` (as uploaded) or `reference/photos/`.
  `<PhotoGate>` preloads them and waits on every `<img>`.
  - Aida is `L01-aida.jpg` and Sara is `L02-L03-L07-L08-sara.jpg`.
  - **Assumed:** Negar is the «blue-eyed-brunette» stock portrait.
  - **Missing:** the user's own photo (`me`, S8), which shows the DS neutral tile. The
    blonde «portrait-young-family» upload is unassigned.

## Timeline (beat-snapped)

Each scene starts on the beat nearest the start time in the brief. One beat is 0.625 s
(18.75 frames) and one bar is 2.5 s.

| scene | start | end | length | beat (bar.beat) | frames |
|---|---|---|---|---|---|
| S1 Hook | 0.000 | 3.750 | 3.750 | 0 (1.1) | 0–112 |
| S2 Start | 3.750 | 8.125 | 4.375 | 6 (2.3) | 113–243 |
| S3 Goal | 8.125 | 11.250 | 3.125 | 13 (4.2) | 244–337 |
| S4 Message | 11.250 | 15.000 | 3.750 | 18 (5.3) | 338–449 |
| S5 Verified | 15.000 | 18.125 | 3.125 | 24 (**7.1**) | 450–543 |
| S6 Search | 18.125 | 21.250 | 3.125 | 29 (8.2) | 544–637 |
| S7 Conversation | 21.250 | 25.000 | 3.750 | 34 (9.3) | 638–749 |
| S8 Match | 25.000 | 28.125 | 3.125 | 40 (**11.1**, swell) | 750–843 |
| S9 Reveal | 28.125 | 30.000 | 1.875 | 45 (12.2, **resolve**) | 844–899 |

The cuts to S5 and S8 land on downbeats, and S9 lands on the resolving chord.

**Swapping in a licensed track:**
1. Drop the file into `assets/audio/`.
2. Run `python3 scripts/audio/detect_beats.py assets/audio/<file>`. It fits one steady
   tempo grid over the whole track, because trackers drop beats in the intro and the
   ring-out.
3. Change `MUSIC_FILE` in `src/store/audio.ts`.

Every cut then re-snaps to the new beats. I tested this by re-detecting the temp track
itself: every cut came back within 20 ms of the plan. If a beat map has no beat near a
cut, the render fails rather than silently moving the cut.

## Rules applied in every scene
- **One gradient per frame.** The highlighted headline word carries `--gradient-brand`
  until that scene's UI gradient appears: the selected chip (S3), the ON switch (S6)
  or the celebration ring (S8). At that point the word
  settles to a flat `--accent` over `--dur-fast`, before the UI gradient fills. The two
  gradients never share a frame.
- **Warm and cool sides.** The user is `MessageBubble from="me"` (DS: `--bubble-sent-fill`,
  the dark neutral). The other person is `from="them"` (white) with cool
  `--conversation-active` typing dots.
- **Motion.** Everything moves with `dt-unfold`, mask reveals and slow drift, using
  `--ease-out-soft` and `--ease-gentle-over` for the settle. Nothing slides off screen.
  Headlines unfold word by word in reading order, one word per eighth note.

## Scenes

### S1 · Hook (b0–6) — `s1-9x16.png`
- **What it is:** the first promo's Scene 1, reused unchanged. Cool dots type alone (the
  music opens with a three-note figure), then «آخرین بار کِی یه گفتگوی واقعی داشتی؟»
  unfolds and the small dots return beneath it.
- **Change in Phase 2:** the question snaps to b2 (1.25 s), the dots return on b5, and the
  cut moves to 3.75 s. That needs a cut-time prop on `Scene1`; its default stays 4 s, so
  the first promo is untouched.
- **Out:** the dots stay on screen as the same element while S2's headline unfolds, then
  fold away.

### S2 · Start (b6–13) — after L01
- **Layout:** no phone. Aida's photo card leans back. The conversation floats in front of
  it, one depth nearer:
  - the user's dark question over the card's top edge;
  - her white answer over its other edge;
  - her cool typing dots below.
- **Headline:** at the bottom, with «گفتگو» in the brand gradient.
- **Beats:**
  - b7: the card unfolds.
  - b9: the question, with a pop.
  - b10: the typing dots.
  - b11: the answer, with a pop.
- **Camera:** a slow push-in, with parallax between the card and the bubbles.

### S3 · Goal (b13–18) — after L02
- **Layout:** the phone leans, showing Sara's profile (photo, «هدفش از دلتاک: رابطه‌ی
  جدی»). The user's own goal card stands off the phone's edge.
- **Match cut in:** her typing dots unfold into the three chips.
- **Beats:**
  - b14: the card unfolds.
  - b14–15: the chips appear, one per eighth note.
  - b16: «رابطه‌ی جدی» is selected with a gentle overshoot and a pop. The headline word
    settles to flat at the same moment.

### S4 · Message before match (b18–24) — after L03
- **Layout:** Sara's photo is on screen, and the sheet «پیام همراه لایک برای سارا»
  stands out over both phone edges:
  - her prompt answer in a well;
  - the message typing in character by character, b19–23, about 18 characters per
    second, with a soft tick every two or three characters;
  - «۲ پیام برات مونده»;
  - «ارسال لایک», the neutral primary button with a heart.
- **Camera:** a slow push-in toward the field.

### S5 · Verified (b24–29) — no reference frame
- **Layout:** no phone. Negar's photo card.
- **Beats:**
  - b26: the `VerificationBadge` (lg, on the photo) settles beside her name with
    `--ease-gentle-over`.
  - b27: the success toast unfolds off the card's lower edge, with a pop.
- **Gradient:** «آدم» keeps the brand gradient. The rosette is flat `--verification` blue,
  so there is no conflict.

### S6 · Search (b29–34) — after L05
- **Layout:** the filters screen. The «فقط آدم‌های تأییدشده» card stands off the phone's
  edge.
- **Beats:**
  - b30–31.5: the age handles glide to «۳۲ — ۴۵».
  - b31.5–32.5: the distance handle glides to «۵۰ کیلومتر».
  - b33: the switch turns ON (`enabling`, brand-gradient track). The headline word goes
    flat just before.

### S7 · Conversation (b34–40) — after L07
- **Layout:** the chat with Sara (back arrow, avatar, verified mark, message times). The
  phone leans.
- **Beats:** one message per beat, each with a pop.
  - b35: Sara's question.
  - b36: the user's answer.
  - b37: Sara's voice note; the waveform plays.
  - b38: the user's reply.
  - b38.5: Sara's typing dots.
  - b39.5: Sara's last message, which stands off the phone, one depth nearer.

### S8 · Match (b40–45) — `s8`
- **Layout:** no phone. The music swells on b40.
- **Beats:**
  - b41: the two portraits drift together, over two beats.
  - b43: one `--gradient-celebration` ring unfolds around the pair. The DS `ChatState`
    heart unfolds, and the chime plays as the music ducks.
  - b43.5: the title and the line.
  - b44: the goal card and «شروع گفتگو».
- **Match cut in:** Sara's typing dots fold into the heart.

### S9 · Final reveal (b45–48, dark) — `s9`
- **Transition:** the dark background opens from the centre as a circular mask.
- **Beats:**
  - b45 (resolve chord, low tone): three cool dots gather onto the mark's own three dots,
    and the full lockup (the asset, vertical in 9:16 and horizontal in 16:9) reveals
    through a circular mask centred there.
  - b46: «اول حرف بزن، بعد دل بده».
  - b46.5: the CTA as the neutral primary button.
- **Gradients:** the logo is the only gradient in the frame.

## Contradictions and decisions (please confirm)
1. **One gradient per frame overrides the references in S3, S6 and S8.**
   - **Conflict:** L05 shows the gradient switch and the gradient headline word together.
     In S3 the brief's selected chip is a gradient, and in S8 the celebration ring is
     one.
   - **Fix:** the headline word hands the gradient off to the UI (see "Rules" above).
2. **No gradient background.** Your frames sit on pastel pink and lavender washes.
   CLAUDE.md forbids gradients as backgrounds, so every scene is flat `--bg`.
3. **No in-app logo in S2 and S3.** L01 and L02 show the compact logo. Its mark would be a
   second gradient next to the headline word, so the logo appears only in S9.
4. **One highlighted word, not a phrase.** The references highlight «دنبال چی», «قبل از
   مچ» and «گل بندازه». The brief and CLAUDE.md allow one word, so I used «دنبال»,
   «قبل» and «گل». The exception is S8, where «هر دو» stays together because «هر» alone
   is not a unit.
5. **Headline weight is Bold (700).** The references look Black (900). The font has a
   900 file, but the DS has no `--fw-black` token.
6. **S3 uses chips, not L02's tinted rows.** The brief asks for the selected chip.
7. **S4 button label.** I used L03's «ارسال لایک» in place of the brief's pending
   «لایک و ارسال».
8. **S7's last Sara bubble stays on her side.** L07 floats it to the user's side, which
   would swap the warm/cool sides.
9. **The S8 ring is drawn, not taken from Avatar.** Avatar's `ring="match"` is the brand
   gradient, but the brief asks for a celebration ring. It is one
   `--gradient-celebration` stroke around both portraits.
10. **A DS doc is stale.** `VerificationBadge.d.ts` calls the rosette gradient-filled, but
    the `.jsx` paints it flat `--verification` blue. I followed the `.jsx`.
11. **The composer is `Input multiline`.** `MessageInput` has its own send button, which
    would duplicate the CTA.
12. **Cut timing moves.** Snapping to the beat moves cuts by up to 0.25 s from the brief.
    S9 runs 1.875 s.
13. **16:9 crops some floating layers.** The landscape frame is shorter, so it crops the
    lower floating cards in S3, S4, S6 and S7. I'll fix landscape framing with the
    Phase 2 camera work.

## Open questions
1. **What are D01–D07 for?** The brief keeps S1–S8 light. Do you want a dark cut of the
   whole video as well?
2. **Which photo is the user's own (S8)?** Is it the blonde upload? And is Negar the
   brunette?
3. **S9 runs 1.875 s, short for the logo, the line and the CTA.**
   - **Option A:** start S9 on the bar-12 downbeat (27.5 s). S9 gets 2.5 s and S8 drops to
     2.5 s.
   - **Option B:** keep the current timing.
4. **S5 mixes two points of view.**
   - **The issue:** the badge settles on Negar, but the toast says «حسابت تأیید شد», which
     means the user's own account.
   - **Option A:** keep both.
   - **Option B:** show the badge on the user's own card instead.
5. **The S4 counter «۲ پیام برات مونده» may conflict with CLAUDE.md**, which bans counters
   on cards and urgency. It is a quota hint inside the composer, so I kept it. Please
   confirm.
6. **The store name is still a placeholder.** The CTA shows «[نام فروشگاه]», and it has to
   be a Persian name so no Latin appears on screen.
