"""Detect the beats of a music file and write a beat map (the swap path).

    python3 scripts/audio/detect_beats.py assets/audio/licensed.wav \
        [--out assets/audio/licensed.beats.json] [--bpm-hint 96] [--raw]

Writes the same schema as assets/audio/temp-music.beats.json, with
"source": "detected". Downbeats are the 4-beat phase with the strongest
onset + harmonic-change score. Beats before the first downbeat get bar 0 (a pickup).

By default the tracked beats are fitted to one steady tempo grid (least
squares) that covers the whole file, because trackers drop beats in sparse
intros and ring-outs, exactly where the first and last cuts sit. Pass --raw
for a track whose tempo really drifts; then only tracked beats are written.
When a licensed track replaces the temp one, run this, point the MUSIC
constant in src/store/audio.ts at the new file and beat map, and the timeline
re-snaps its cues to the new beats.
"""
import argparse
import json
from pathlib import Path

import librosa
import numpy as np

HOP = 256


def detect(path, bpm_hint, raw=False):
    y, sr = librosa.load(path, sr=22050, mono=True)
    duration = len(y) / sr
    env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=HOP)
    tempo, frames = librosa.beat.beat_track(
        onset_envelope=env, sr=sr, hop_length=HOP, start_bpm=bpm_hint, units='frames')
    # The onset envelope peaks ~25 ms after an attack. Snap each tracked beat to
    # the nearest backtracked onset (within 80 ms) so times sit on the attacks.
    onsets = librosa.onset.onset_detect(
        onset_envelope=env, sr=sr, hop_length=HOP, backtrack=True, energy=env)
    refined = []
    for f in frames:
        near = onsets[np.argmin(np.abs(onsets - f))] if len(onsets) else f
        refined.append(near if abs(near - f) * HOP / sr < 0.08 else f)
    # Downbeat strength is read at the tracker's frames (the envelope peaks).
    strengths = env[frames]
    times = librosa.frames_to_time(np.array(refined), sr=sr, hop_length=HOP)
    # Downbeat phase: onset strength plus harmonic change (chords tend to
    # change on the downbeat), each normalized, summed per 4-beat phase.
    chroma = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=HOP)
    sync = librosa.util.sync(chroma, np.concatenate([[0], frames]), aggregate=np.mean)
    unit = sync / (np.linalg.norm(sync, axis=0, keepdims=True) + 1e-9)
    # change[i] = how different the beat starting at frames[i] is from the one before
    change = np.concatenate([[0], 1 - np.sum(unit[:, 1:-1] * unit[:, 2:], axis=0)])[:len(frames)]
    score = strengths / (strengths.max() + 1e-9) + change / (change.max() + 1e-9)
    phase = int(np.argmax([score[p::4].mean() for p in range(4)]))
    # Mean of the regular intervals (hop quantization makes the median coarse).
    diffs = np.diff(times)
    if len(diffs):
        regular = diffs[np.abs(diffs - np.median(diffs)) < 0.2 * np.median(diffs)]
        bpm = 60.0 / float(regular.mean())
    else:
        bpm = float(np.atleast_1d(tempo)[0])
    if raw:
        grid = list(enumerate(times))
        phase_k = phase
        fit_note = 'raw tracked beats'
    else:
        # Integer beat number of each tracked beat (gaps count as missed beats),
        # then one straight line t = a + b*k through them.
        period = 60.0 / bpm
        k = np.concatenate([[0], np.cumsum(np.round(np.diff(times) / period))]).astype(int)
        b, a = np.polyfit(k, times, 1)
        residual_ms = np.abs(a + b * k - times) * 1000
        bpm = 60.0 / b
        first = int(np.ceil(-a / b - 1e-9))
        last = int(np.floor((duration - 1e-6 - a) / b))
        grid = [(kk, a + b * kk) for kk in range(first, last + 1)]
        phase_k = int(k[phase])
        fit_note = (f'grid fit: median residual {np.median(residual_ms):.1f} ms, '
                    f'max {residual_ms.max():.1f} ms over {len(times)} tracked beats')
    beats = []
    for i, (kk, t) in enumerate(grid):
        rel = int(kk) - phase_k
        beats.append({'index': i, 'time': round(float(t), 6),
                      'bar': rel // 4 + 1, 'beat': rel % 4 + 1})
    return {
        'source': 'detected',
        'file': Path(path).name,
        'bpm': round(bpm, 3),
        'offsetSeconds': beats[0]['time'] if beats else 0,
        'beatsPerBar': 4,
        'durationSeconds': round(duration, 6),
        'beats': beats,
        'downbeats': [b['time'] for b in beats if b['beat'] == 1],
        'events': {},
    }, fit_note


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('audio')
    ap.add_argument('--out')
    ap.add_argument('--bpm-hint', type=float, default=96)
    ap.add_argument('--raw', action='store_true', help='keep tracked beats as-is (no tempo grid)')
    args = ap.parse_args()
    data, fit_note = detect(args.audio, args.bpm_hint, args.raw)
    out = Path(args.out) if args.out else Path(args.audio).with_suffix('.beats.json')
    out.write_text(json.dumps(data, indent=1) + '\n')
    print(f'{out}: {len(data["beats"])} beats, {data["bpm"]} BPM, '
          f'{len(data["downbeats"])} downbeats ({fit_note})')


if __name__ == '__main__':
    main()
