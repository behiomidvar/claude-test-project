"""Generate the TEMP music track for StorePromo and its beat map.

    python3 scripts/audio/gen_temp_music.py

Writes assets/audio/temp-music.wav (48 kHz, 16-bit stereo, 30.000 s) and
assets/audio/temp-music.beats.json. This is a generated placeholder, not the
final music: no licensing risk, and every beat is known exactly.

96 BPM, 4/4, D major, 48 beats (beat k at k * 0.625 s). Warm detuned pad, soft
FM e-piano, light low sine pulse, generated convolution reverb. No drum kit,
risers, whooshes or drops. The arrangement follows the story's scenes
(beat-snapped cuts):

  S1 Hook          b0-5    pad + the three-note "three dots" figure at 0
  S2 Account       b5-15   brisk but soft: eighth arpeggio, pulse every beat
  S3 Discover      b15-22  eases down: quarters, then half notes; pulse 1 and 3
  S4 Like + note   b22-29  gentle sparse eighths, thinning at the end
  S5 Time, match   b29-34  held suspension ("a day later"), small swell
                           blooming on b32 (20.0 s, the match chime)
  S6 Conversation  b34-43  slowest and quietest: pad + half-note plucks;
                           suspension on b42 (26.25 s)
  S7 Final         b43-48  resolve to Dadd9 on b43 (26.875 s), low warm root

Deterministic: fixed RNG seed.
"""
import json
from pathlib import Path

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.signal import butter, fftconvolve, resample_poly, sosfilt

SR = 48000
BPM = 96
BEAT = 60 / BPM  # 0.625 s
BAR = 4 * BEAT  # 2.5 s
BARS = 12
DURATION = 30.0
N = int(round(DURATION * SR))
TARGET_LUFS = -16.0
PEAK_CEILING_DB = -1.5

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / 'assets' / 'audio'

rng = np.random.default_rng(20261018)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def bar_t(bar, beat=1.0):
    """Time of a 1-based bar and 1-based (fractional) beat."""
    return (bar - 1) * BAR + (beat - 1) * BEAT


def b(k):
    """Time of global beat k (0-based, fractional allowed)."""
    return k * BEAT


# Pad voicings (MIDI), bass roots (MIDI), arpeggio tones (MIDI) per chord.
CHORDS = {
    'Dmaj9': dict(pad=[50, 57, 61, 64, 66], root=38, arp=[62, 66, 69, 73, 76]),
    'Bm7': dict(pad=[47, 54, 57, 62, 66], root=35, arp=[59, 62, 66, 69, 74]),
    'Gmaj7': dict(pad=[43, 50, 54, 59, 62], root=43, arp=[62, 66, 67, 71, 74]),
    'D/F#': dict(pad=[42, 50, 57, 62, 66], root=42, arp=[62, 66, 69, 74, 78]),
    'Asus4': dict(pad=[45, 52, 57, 62, 64], root=45, arp=[62, 64, 69, 74, 76]),
    'A': dict(pad=[45, 52, 57, 61, 64], root=45, arp=[61, 64, 69, 73, 76]),
    'Em7': dict(pad=[52, 55, 59, 62, 64], root=40, arp=[59, 62, 64, 67, 71]),
    'A7sus4': dict(pad=[45, 52, 55, 62, 64], root=45, arp=[62, 64, 67, 69, 74]),
    'Gmaj9': dict(pad=[43, 50, 54, 57, 59], root=43, arp=[62, 66, 67, 69, 71, 74, 78, 81]),
    'Dadd9': dict(pad=[50, 57, 62, 64, 66], root=38, arp=[62, 66, 69, 74, 76]),
}

# (start s, end s, chord, pad gain start, pad gain end), on global beats.
SEGMENTS = [
    # S1 Hook
    (b(0), b(5), 'Dmaj9', 0.85, 0.9),
    # S2 Account: chords move every two to three beats, a little fuller
    (b(5), b(8), 'Gmaj7', 1.0, 1.0),
    (b(8), b(11), 'D/F#', 1.0, 1.0),
    (b(11), b(13), 'Bm7', 1.0, 1.0),
    (b(13), b(14), 'Asus4', 1.0, 1.0),
    (b(14), b(15), 'A', 1.0, 0.95),
    # S3 Discover: easing down, warmer
    (b(15), b(18), 'Gmaj9', 0.95, 0.9),
    (b(18), b(20), 'D/F#', 0.9, 0.9),
    (b(20), b(22), 'Em7', 0.9, 0.9),
    # S4 Like with a message
    (b(22), b(25), 'Bm7', 0.9, 0.9),
    (b(25), b(27), 'Gmaj7', 0.9, 0.85),
    (b(27), b(29), 'A7sus4', 0.85, 0.75),
    # S5 Time passes: held suspension, then the swell blooming on b32
    (b(29), b(31), 'Asus4', 0.7, 0.72),
    (b(31), b(32), 'Asus4', 0.72, 1.05),
    (b(32), b(34), 'Gmaj9', 1.4, 1.0),
    # S6 Conversation: the quietest section
    (b(34), b(36), 'Dmaj9', 0.8, 0.8),
    (b(36), b(38), 'Bm7', 0.8, 0.8),
    (b(38), b(40), 'Gmaj7', 0.8, 0.8),
    (b(40), b(42), 'Em7', 0.8, 0.82),
    (b(42), b(43), 'Asus4', 0.85, 0.95),  # suspension
    # S7 Final: resolve
    (b(43), DURATION, 'Dadd9', 1.25, 1.0),
]

t_all = np.arange(N) / SR


def smooth_ramp(x):
    """0..1 raised-cosine ramp for x in [0, 1]."""
    x = np.clip(x, 0.0, 1.0)
    return 0.5 - 0.5 * np.cos(np.pi * x)


def add(buf, start_s, sig):
    i0 = int(round(start_s * SR))
    if i0 >= buf.shape[-1]:
        return
    n = min(sig.shape[-1], buf.shape[-1] - i0)
    buf[..., i0:i0 + n] += sig[..., :n]


def lowpass(sig, cutoff, order=2):
    sos = butter(order, cutoff, btype='low', fs=SR, output='sos')
    return sosfilt(sos, sig, axis=-1)


def pan(sig, p):
    """Equal-power pan, p in [-1, 1]."""
    a = (p + 1) * np.pi / 4
    return np.stack([sig * np.cos(a), sig * np.sin(a)])


# ---------------------------------------------------------------- pad
def render_pad():
    out = np.zeros((2, N))
    attack, release = 0.8, 1.0
    for start, end, name, g0, g1 in SEGMENTS:
        seg_end = min(end + release, DURATION)
        i0, i1 = int(start * SR), int(seg_end * SR)
        t = t_all[i0:i1] - start
        length = end - start
        env = smooth_ramp(t / attack)
        env *= np.where(t > length, 1 - smooth_ramp((t - length) / release), 1.0)
        env *= g0 + (g1 - g0) * np.clip(t / max(length, 1e-6), 0, 1)
        notes = CHORDS[name]['pad']
        for k, m in enumerate(notes):
            f = hz(m)
            voice = np.zeros_like(t)
            for cents in (-7, 0, 7):
                fd = f * 2 ** (cents / 1200)
                for h in range(1, 7):
                    if fd * h > 4000:
                        break
                    ph = rng.uniform(0, 2 * np.pi)
                    # slow vibrato-free chorus: tiny drift per partial
                    voice += np.sin(2 * np.pi * fd * h * t + ph) / h ** 2.0
            voice /= 3.0
            p = -0.6 + 1.2 * k / max(len(notes) - 1, 1)
            out[:, i0:i1] += pan(voice * env, p) * 0.06
    # gentle slow breathing so the pad is alive, not static
    breath = 1 + 0.06 * np.sin(2 * np.pi * t_all / (BAR * 2))
    return lowpass(out * breath, 1800, order=2)


# ---------------------------------------------------------------- pluck (FM e-piano)
def epiano(midi, vel, dur=2.6):
    f = hz(midi)
    n = int(dur * SR)
    t = np.arange(n) / SR
    index = 1.1 * np.exp(-t / 0.12) + 0.15
    mod = np.sin(2 * np.pi * f * t)
    car = np.sin(2 * np.pi * f * t + index * mod)
    car += 0.18 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.25)
    attack = smooth_ramp(t / 0.004)
    decay_tau = 0.9 * (440 / f) ** 0.35
    env = attack * np.exp(-t / decay_tau)
    env *= 1 - smooth_ramp((t - (dur - 0.2)) / 0.2)
    return car * env * vel


ARP_PATTERN = [4, 2, 3, 1, 0, 2, 3, 1]


def chord_at(t):
    name = SEGMENTS[0][2]
    for start, end, n, *_ in SEGMENTS:
        if start <= t + 1e-9:
            name = n
    return name


def arp_note(t, k):
    arp = CHORDS[chord_at(t)]['arp']
    return arp[ARP_PATTERN[k % len(ARP_PATTERN)] % len(arp)]


def strum(notes, t, midis, vel, step=0.025):
    for i, m in enumerate(midis):
        notes.append((t + i * step, m, vel))


def render_pluck():
    out = np.zeros((2, N))
    notes = []  # (time, midi, vel)
    # S1: the three-dots figure, 16ths at t=0 (A5 F#5 D5), then sparse.
    for i, m in enumerate([81, 78, 74]):
        notes.append((i * BEAT / 4, m, 0.55))
    notes += [(b(2), 69, 0.35), (b(3), 66, 0.32), (b(4), 69, 0.32), (b(4.5), 73, 0.28)]
    # S2 b5-15: steady eighths, accent on each beat, an octave-up voice on the beats.
    for e in range(20):
        t = b(5 + e / 2)
        m = arp_note(t, e)
        on_beat = e % 2 == 0
        vel = 0.56 if e % 8 == 0 else (0.44 if on_beat else 0.3)
        notes.append((t, m, vel))
        if on_beat:
            notes.append((t, m + 12, 0.12))
        if e % 8 == 0:
            notes.append((t, m - 12, 0.26))
    # S3 b15-22: quarters for three beats, then half notes.
    for k in (15, 16, 17):
        notes.append((b(k), arp_note(b(k), k), 0.42 if k == 15 else 0.34))
    for k in (18, 20):
        notes.append((b(k), arp_note(b(k), k), 0.36))
        notes.append((b(k), arp_note(b(k), k + 3) - 12, 0.2))
    # S4 b22-29: gentle, sparse eighths (gaps leave room for typing ticks),
    # thinning to quarters and one last note.
    for e in range(10):  # b22-27
        if e % 4 == 3:
            continue
        t = b(22 + e / 2)
        notes.append((t, arp_note(t, e), 0.4 if e % 2 == 0 else 0.26))
    notes += [(b(27), arp_note(b(27), 0), 0.32), (b(28), arp_note(b(28), 2), 0.26)]
    # S5: a soft suspended chord on b29, held; nothing else until the swell.
    strum(notes, b(29), [57, 62, 64], 0.26, step=0.04)
    # Rising eighths into the bloom (b31, b31.5), then the bloom on b32, voiced
    # low-mid so 1-3 kHz stays clear for the match chime.
    notes += [(b(31), 59, 0.26), (b(31.5), 62, 0.3)]
    strum(notes, b(32), [43, 50, 54, 59, 62], 0.36, step=0.03)
    notes += [(b(33), 66, 0.22)]
    # S6 b34-43: half-note plucks only, the slowest and quietest.
    for k in (34, 36, 38, 40):
        notes.append((b(k), arp_note(b(k), 4), 0.26))
    strum(notes, b(42), [57, 62, 64], 0.24, step=0.04)  # suspension
    # S7 b43: resolve to Dadd9, a soft high D on top.
    strum(notes, b(43), [62, 66, 69, 74, 76], 0.42)
    notes.append((b(43), 86, 0.12))
    for t, m, vel in notes:
        p = np.clip((m - 70) / 18, -0.5, 0.5)
        add(out, t, pan(epiano(m, vel), p))
    return lowpass(out * 0.22, 3200, order=2), notes


# ---------------------------------------------------------------- low pulse
def pulse_hit(f, n_s=0.75, tau=0.3):
    n = int(n_s * SR)
    t = np.arange(n) / SR
    env = smooth_ramp(t / 0.03) * np.exp(-t / tau)
    env *= 1 - smooth_ramp((t - (n_s - 0.15)) / 0.15)
    return (np.sin(2 * np.pi * f * t) + 0.22 * np.sin(2 * np.pi * 2 * f * t)) * env


def render_pulse():
    out = np.zeros(N)
    hits = []  # (beat, velocity)
    # S2: every beat, downbeats a little stronger.
    hits += [(k, 1.0 if k % 4 == 0 else 0.6) for k in range(5, 15)]
    # S3: beats 1 and 3 of each bar only.
    hits += [(k, 0.7) for k in range(15, 22) if k % 4 in (0, 2)]
    # S4: beat 1 only, soft.
    hits += [(k, 0.5) for k in range(22, 28) if k % 4 == 0]
    # S5: one soft pulse under the bloom.
    hits += [(32, 0.6)]
    for k, vel in hits:
        out_hit = pulse_hit(hz(CHORDS[chord_at(b(k))]['root'])) * vel
        add(out, b(k), out_hit)
    # S7: the low warm root under the resolve, long and soft.
    add(out, b(43), pulse_hit(hz(38), n_s=3.0, tau=1.2) * 0.9)
    return np.stack([out, out]) * 0.16


# ---------------------------------------------------------------- reverb
def reverb_ir(length=2.5, pre=0.015):
    n = int(length * SR)
    t = np.arange(n) / SR
    tau = length / 6.9  # -60 dB at `length`
    ir = rng.standard_normal((2, n)) * np.exp(-t / tau)
    ir = lowpass(ir, 4500, order=2)
    ir[:, : int(pre * SR)] = 0
    return ir / np.sqrt(np.sum(ir ** 2, axis=1, keepdims=True))


def convolve(sig, ir):
    return np.stack([fftconvolve(sig[c], ir[c])[:N] for c in range(2)])


def main():
    pad = render_pad()
    pluck, notes = render_pluck()
    pulse = render_pulse()
    ir = reverb_ir()
    mix = pad * 0.75 + convolve(pad, ir) * 0.35
    mix += pluck * 0.8 + convolve(pluck, ir) * 0.35
    mix += pulse

    mix -= mix.mean(axis=1, keepdims=True)  # no DC
    # Gentle fade over the last 0.6 s; tiny fade-in so sample 0 is silent.
    mix *= 1 - smooth_ramp((t_all - (DURATION - 0.6)) / 0.6)
    mix *= smooth_ramp(t_all / 0.005)

    meter = pyln.Meter(SR)
    loud = meter.integrated_loudness(mix.T)
    mix *= 10 ** ((TARGET_LUFS - loud) / 20)
    peak_db = 20 * np.log10(np.max(np.abs(mix)))
    if peak_db > PEAK_CEILING_DB:
        mix *= 10 ** ((PEAK_CEILING_DB - peak_db) / 20)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    sf.write(OUT_DIR / 'temp-music.wav', mix.T.astype(np.float32), SR, subtype='PCM_16')

    final = sf.read(OUT_DIR / 'temp-music.wav')[0]
    loud = meter.integrated_loudness(final)
    peak = 20 * np.log10(np.max(np.abs(final)))
    tp = 20 * np.log10(np.max(np.abs(resample_poly(final, 4, 1, axis=0))))
    print(f'temp-music.wav: {final.shape[0] / SR:.3f} s, {loud:.2f} LUFS, '
          f'sample peak {peak:.2f} dBFS, true peak ~{tp:.2f} dBTP')

    write_beatmap()


def write_beatmap():
    beats = []
    for i in range(int(round(DURATION / BEAT))):
        beats.append({'index': i, 'time': round(i * BEAT, 6), 'bar': i // 4 + 1, 'beat': i % 4 + 1})
    data = {
        'source': 'generated',
        'file': 'temp-music.wav',
        'bpm': BPM,
        'offsetSeconds': 0,
        'beatsPerBar': 4,
        'durationSeconds': DURATION,
        'beats': beats,
        'downbeats': [round(i * BAR, 6) for i in range(BARS)],
        'events': {'timePass': b(29), 'swellStart': b(31), 'match': b(32),
                   'suspension': b(42), 'resolve': b(43)},
    }
    (OUT_DIR / 'temp-music.beats.json').write_text(json.dumps(data, indent=1) + '\n')
    print(f'temp-music.beats.json: {len(beats)} beats, {BARS} downbeats')


if __name__ == '__main__':
    main()
