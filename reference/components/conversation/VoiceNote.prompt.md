A voice-note message — a first-class entry point on Deltalk (lead with words/voice, not a face). Warm for the user, cool for the other person, with a static waveform and play/pause.

```jsx
<VoiceNote from="them" duration="0:18" playing={isPlaying} onToggle={toggle} />
<VoiceNote from="me" duration="0:07" />
```

Props: `from` (`me|them`), `duration`, `playing`, `onToggle`.
