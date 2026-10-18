"""Generate the soft SFX for StorePromo into assets/audio/sfx/.

    python3 scripts/audio/gen_sfx.py

tick-1..4.wav  very quiet keyboard ticks (filtered noise + tiny high click)
pop.wav        soft bubble entrance (sine, small downward glide, rounded attack)
chime.wav      one gentle bell chime for the match (D6 F#6 A6, strummed)
logo-tone.wav  low warm swell under the logo reveal (D2 D3 A3)

All 48 kHz 16-bit stereo, peak-normalized to -6 dBFS; how quiet each one sits
(the ticks barely there) is set by the mix in Remotion, not baked in here.
No whooshes, no impacts. Fixed RNG seed.
"""
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
OUT = Path(__file__).resolve().parents[2] / 'assets' / 'audio' / 'sfx'
rng = np.random.default_rng(20261018)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def ramp(x):
    x = np.clip(x, 0.0, 1.0)
    return 0.5 - 0.5 * np.cos(np.pi * x)


def band(sig, lo, hi, order=2):
    sos = butter(order, [lo, hi], btype='band', fs=SR, output='sos')
    return sosfilt(sos, sig)


def lowpass(sig, cutoff, order=2):
    return sosfilt(butter(order, cutoff, btype='low', fs=SR, output='sos'), sig)


def write(name, mono, peak_db=-6.0, width=0.0):
    """Normalize, add 20 ms of silence tail, write stereo (optional tiny width)."""
    mono = mono - mono.mean()
    mono *= ramp(np.arange(len(mono)) / (0.0005 * SR))  # sample 0 is silent after DC removal
    mono = np.concatenate([mono, np.zeros(int(0.02 * SR))])
    left, right = mono, mono
    if width:
        d = int(width * SR)
        right = np.concatenate([np.zeros(d), mono[:-d]])
    st = np.stack([left, right], axis=1)
    st *= 10 ** (peak_db / 20) / np.max(np.abs(st))
    OUT.mkdir(parents=True, exist_ok=True)
    sf.write(OUT / name, st.astype(np.float32), SR, subtype='PCM_16')
    print(f'{name}: {len(st) / SR * 1000:.0f} ms, peak {20 * np.log10(np.max(np.abs(st))):.1f} dBFS')


def tick(variant):
    dur = [0.004, 0.005, 0.0045, 0.006][variant]
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    body = band(noise, 1200 + 250 * variant, 4200, order=2)
    env = ramp(t / 0.0008) * np.exp(-t / (dur / 2.5))
    click = np.sin(2 * np.pi * (2600 + 180 * variant) * t) * ramp(t / 0.0005) * np.exp(-t / 0.0012)
    # a soft low "thock" so it reads as a key, not a hiss
    thock = np.sin(2 * np.pi * (180 + 15 * variant) * t) * ramp(t / 0.001) * np.exp(-t / 0.006)
    return lowpass(body * env + 0.25 * click + 0.5 * thock, 5000)


def pop():
    n = int(0.16 * SR)
    t = np.arange(n) / SR
    f = 600 + 300 * np.exp(-t / 0.025)  # ~900 -> 600 Hz glide
    phase = 2 * np.pi * np.cumsum(f) / SR
    env = ramp(t / 0.006) * np.exp(-t / 0.035)
    env *= 1 - ramp((t - 0.13) / 0.03)
    sig = np.sin(phase) + 0.12 * np.sin(2 * phase)
    return lowpass(sig * env, 3000)


def bell(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    # soft inharmonic bell partials (ratio, gain, decay s)
    for ratio, gain, tau in [(1.0, 1.0, 1.1), (2.0, 0.35, 0.7), (2.76, 0.18, 0.45),
                             (4.07, 0.07, 0.3), (5.4, 0.03, 0.2)]:
        out += gain * np.sin(2 * np.pi * f * ratio * t + rng.uniform(0, 2 * np.pi)) * np.exp(-t / tau)
    return out * ramp(t / 0.004)


def chime():
    dur = 2.6
    n = int(dur * SR)
    out = np.zeros(n)
    for i, m in enumerate([86, 90, 93]):  # D6 F#6 A6
        d = int(i * 0.03 * SR)
        out[d:] += bell(hz(m), dur)[: n - d] * [1.0, 0.8, 0.7][i]
    t = np.arange(n) / SR
    out *= 1 - ramp((t - (dur - 0.3)) / 0.3)
    return lowpass(out, 6000)


def logo_tone():
    dur = 2.6
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for m, g in [(38, 1.0), (50, 0.55), (57, 0.3)]:  # D2 D3 A3
        f = hz(m)
        for cents in (-4, 4):
            fd = f * 2 ** (cents / 1200)
            out += g * (np.sin(2 * np.pi * fd * t) + 0.15 * np.sin(4 * np.pi * fd * t))
    env = ramp(t / 0.4) * np.exp(-np.clip(t - 0.4, 0, None) / 1.1)
    env *= 1 - ramp((t - (dur - 0.4)) / 0.4)
    return lowpass(out * env, 900)


def main():
    for v in range(4):
        write(f'tick-{v + 1}.wav', tick(v))
    write('pop.wav', pop())
    write('chime.wav', chime(), width=0.008)
    write('logo-tone.wav', logo_tone(), width=0.006)


if __name__ == '__main__':
    main()
