"""Generate the TEMP music track for StorePromo and its beat map.

    python3 scripts/audio/gen_temp_music.py

Writes assets/audio/temp-music.wav (48 kHz, 16-bit stereo, 30.000 s) and
assets/audio/temp-music.beats.json. This is a generated placeholder, not the
final music: no licensing risk, and every beat is known exactly.

96 BPM, 4/4, D major, 12 bars. Warm detuned pad, soft FM e-piano arpeggio,
light low sine pulse, generated convolution reverb. No drums, risers or drops.
Small swell in bar 11 (the match scene), suspension on the bar-12 downbeat
(27.5 s), resolve to Dadd9 on beat 45 (28.125 s) for the logo.
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

# (start s, end s, chord, pad gain start, pad gain end)
SEGMENTS = [
    (bar_t(1), bar_t(3), 'Dmaj9', 0.85, 0.85),
    (bar_t(3), bar_t(4), 'Bm7', 0.9, 0.9),
    (bar_t(4), bar_t(5), 'Gmaj7', 0.9, 0.9),
    (bar_t(5), bar_t(6), 'D/F#', 0.9, 0.9),
    (bar_t(6), bar_t(6, 3), 'Asus4', 0.9, 0.9),
    (bar_t(6, 3), bar_t(7), 'A', 0.9, 0.9),
    (bar_t(7), bar_t(8), 'Bm7', 1.0, 1.0),
    (bar_t(8), bar_t(9), 'Gmaj7', 1.0, 1.0),
    (bar_t(9), bar_t(10), 'Em7', 1.0, 1.0),
    (bar_t(10), bar_t(11), 'A7sus4', 1.0, 1.05),
    (bar_t(11), bar_t(12), 'Gmaj9', 1.05, 1.55),  # the swell
    (bar_t(12), bar_t(12, 2), 'Asus4', 1.45, 1.3),  # suspension
    (bar_t(12, 2), DURATION, 'Dadd9', 1.25, 1.0),  # resolve, beat 45
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


# The bar opens on the top tone so the downbeat is the clearest attack.
ARP_PATTERN = [4, 2, 3, 1, 0, 2, 3, 1]


def chord_at(t):
    name = SEGMENTS[0][2]
    for start, end, n, *_ in SEGMENTS:
        if start <= t + 1e-9:
            name = n
    return name


def render_pluck():
    out = np.zeros((2, N))
    notes = []  # (time, midi, vel)
    # Bar 1: the three-dots figure, 16ths at t=0: A5 F#5 D5.
    for i, m in enumerate([81, 78, 74]):
        notes.append((i * BEAT / 4, m, 0.55))
    # Bar 1 beat 3 and bar 2: sparse.
    notes += [(bar_t(1, 3), 69, 0.35), (bar_t(2, 1), 66, 0.4), (bar_t(2, 3), 69, 0.35),
              (bar_t(2, 4), 73, 0.3)]
    # Bars 3-10: eighth-note arpeggio.
    for bar in range(3, 11):
        for k in range(8):
            t = bar_t(bar) + k * BEAT / 2
            arp = CHORDS[chord_at(t)]['arp']
            m = arp[ARP_PATTERN[k] % len(arp)]
            vel = {0: 0.64, 2: 0.46, 4: 0.42, 6: 0.46}.get(k, 0.3)
            notes.append((t, m, vel))
            if k == 0:
                notes.append((t, m - 12, 0.3))
            # Bars 7-10 slightly fuller: an octave-up voice on the beats.
            if 7 <= bar <= 10 and k % 2 == 0:
                notes.append((t, m + 12, 0.14))
    # Bar 11: rising arpeggio over Gmaj9 (the swell).
    arp = CHORDS['Gmaj9']['arp']
    for k in range(8):
        notes.append((bar_t(11) + k * BEAT / 2, arp[k], 0.42 + 0.03 * k))
    # Bar 12: suspension chord on the downbeat, resolve on beat 45.
    for i, m in enumerate([62, 64, 69]):
        notes.append((bar_t(12) + i * 0.02, m, 0.4))
    for i, m in enumerate([62, 66, 69, 74, 76]):
        notes.append((bar_t(12, 2) + i * 0.025, m, 0.42))
    notes.append((bar_t(12, 2), 86, 0.12))  # a soft high D on the resolve
    for t, m, vel in notes:
        p = np.clip((m - 70) / 18, -0.5, 0.5)
        add(out, t, pan(epiano(m, vel), p))
    return lowpass(out * 0.22, 3200, order=2), notes


# ---------------------------------------------------------------- low pulse
def render_pulse():
    out = np.zeros(N)
    n = int(0.75 * SR)
    t = np.arange(n) / SR
    for bar in range(3, 12):
        for beat in range(1, 5):
            start = bar_t(bar, beat)
            f = hz(CHORDS[chord_at(start)]['root'])
            env = smooth_ramp(t / 0.03) * np.exp(-t / 0.3)
            env *= 1 - smooth_ramp((t - 0.6) / 0.15)
            sig = (np.sin(2 * np.pi * f * t) + 0.22 * np.sin(2 * np.pi * 2 * f * t)) * env
            vel = {1: 1.0, 2: 0.55, 3: 0.75, 4: 0.55}[beat]
            if bar == 11:
                vel *= 1.15
            add(out, start, sig * vel)
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
        'downbeats': [round(b * BAR, 6) for b in range(BARS)],
        'events': {'swellStart': bar_t(11), 'suspension': bar_t(12), 'resolve': bar_t(12, 2)},
    }
    (OUT_DIR / 'temp-music.beats.json').write_text(json.dumps(data, indent=1) + '\n')
    print(f'temp-music.beats.json: {len(beats)} beats, {BARS} downbeats')


if __name__ == '__main__':
    main()
