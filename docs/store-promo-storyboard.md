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
- `storyboard-9x16.png` and `storyboard-16x9.png`: contact sheets, one key pose per scene
- `s1-9x16.png` … `s9-16x9.png`: each pose on its own
- `animatic-9x16-half.mp4`: an animatic at half scale, with each pose held for its
  beat-snapped slot over the temp music, so you can hear where each cut falls. The cuts are
  hard because this is a review tool. The unfold transitions come in Phases 2–3.

Re-render with `npm run storyboard:store` and print the timeline with `npm run timeline:store`.

## References
- **`reference/video/reference.mp4` does not exist, so the reference study was skipped.**
- **`reference/photos/` did not exist.** I created it with a README that lists the
  expected files (`aida`, `sara`, `negar`, `me`). Until those files exist, every portrait
  is the DS neutral tile `portrait-tone-light.png`. `<PhotoGate>` preloads every portrait
  and waits on each `<img>` before a frame renders.

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
  until that scene's UI gradient appears: the selected chip (S3), the verification
  rosette (S5), the ON switch (S6) or the celebration ring (S8). At that point the word
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

### S2 · Start (b6–13) — `s2`
- **Layout:** headline on top («گفتگو» in the brand gradient). The phone unfolds up from
  the bottom edge, cropped by the frame on purpose.
- **Beats:**
  - b7: Aida's card unfolds.
  - b9: the user's dark bubble, with a pop.
  - b10: Aida's typing dots.
  - b11: her white answer, with a pop.
- **Camera:** a slow push-in from 1.00 to 1.04.
- **Depth:** the bubbles sit one parallax layer nearer than the phone.

### S3 · Goal (b13–18) — `s3`
- **Layout:** the composition flips. The phone hangs from the top edge and the headline
  sits below it.
- **Match cut in:** Aida's three typing dots unfold into the three goal chips.
- **Beats:**
  - b14: the sheet unfolds.
  - b14–15: the chips appear, one per eighth note.
  - b16: «رابطه‌ی جدی» is selected with a gentle overshoot and a pop. The headline word
    settles to flat at the same moment.
- **Out:** the chips fold back into three dots.

### S4 · Message before match (b18–24) — `s4`
- **Layout:** a macro close-up with no phone, using DS `Card` + `Input multiline` + `Button`.
- **Typing:** b19–23, character by character in RTL (about 18 characters per second),
  with a soft tick every two or three characters.
- **Counter:** «۲ پیام برات مونده» is the field's hint.
- **Camera:** a slow push-in toward the caret.
- **Button:** «لایک و ارسال» is the neutral primary button.

### S5 · Verified (b24–29) — `s5`
- **Beats:**
  - b24 (downbeat): Negar's card unfolds.
  - b26: the `VerificationBadge` settles beside her name with `--ease-gentle-over`, and
    the headline word goes flat.
  - b27: the success toast unfolds, with a pop.

### S6 · Search (b29–34) — `s6`
- **Layout:** three filter cards stacked in depth, each with its own parallax.
- **Beats:**
  - b30–31.5: the age handles glide to «۳۲ — ۴۵».
  - b31.5–32.5: the distance handle glides to «۵۰ کیلومتر».
  - b33: «فقط آدم‌های تأییدشده» turns ON. The switch is `enabling`, so its track is the
    brand gradient, and the headline word goes flat just before.

### S7 · Conversation (b34–40) — `s7`
- **Layout:** the thread with Sara inside the phone. The camera drifts upward as the
  thread grows.
- **Beats:** one message per beat, each with a pop.
  - b35: Sara's question.
  - b36: the user's answer.
  - b37: Sara's voice note; the waveform plays.
  - b38: the user's reply.
  - b38.5: Sara's typing dots.
  - b39.5: Sara's last message.

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
1. **Two gradients in S3, S5, S6 and S8.**
   - **Conflict:** the brief marks a gradient headline word, but each of these scenes'
     UI already carries a DS gradient: the selected chip
     (`--chip-selected-fill`), the badge rosette, the `enabling` switch track, and the
     celebration ring.
   - **Fix:** the gradient hands off from the word to the UI, as described under "Rules"
     above.
2. **The S8 ring is drawn, not taken from Avatar.**
   - **Conflict:** Avatar's `ring="match"` is the brand gradient, but the brief asks for a
     celebration ring.
   - **Fix:** one `--gradient-celebration` stroke around both portraits. It is a motion
     element, not app UI.
3. **The S8 highlight covers two words.** «هر» on its own is not a unit, so «هر دو» is
   highlighted together.
4. **The user's bubbles are neutral dark, not warm.** That is the DS bubble design. The
   warm/cool split shows through side and role, and the other person's cues stay cool.
5. **The composer is `Input multiline`, not `MessageInput`.** `MessageInput` has its own
   send button, which would duplicate «لایک و ارسال».
6. **Copy I added that isn't in the brief:** the slider labels «سن» / «فاصله», and Sara as
   the S4 recipient (she answers in S7 and matches in S8).
7. **Cut timing moves.** Snapping to the beat moves cuts by up to 0.25 s from the brief. S9
   is 1.875 s instead of 2 s.

## Open questions
1. **S9 runs 1.875 s, short for the logo, the line and the CTA.**
   - **Option A:** start S9 on the bar-12 downbeat (27.5 s). S9 gets 2.5 s and S8 drops to
     2.5 s.
   - **Option B:** keep the current timing.
2. **S5 mixes two points of view.**
   - **The issue:** the badge settles on Negar, but the toast says «حسابت تأیید شد», which
     means the user's own account.
   - **Option A:** keep both.
   - **Option B:** show the badge on the user's own card instead.
3. **The S4 counter «۲ پیام برات مونده» may conflict with CLAUDE.md**, which bans counters
   on cards and urgency. It is a quota hint inside the composer, so I kept it. Please
   confirm.
4. **The store name is still a placeholder.** The CTA shows «[نام فروشگاه]», and it has to
   be a Persian name so no Latin appears on screen.
5. **The «لایک و ارسال» label is still pending.**
