import React from 'react';
export interface VoicePlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: 'sent' | 'received';
  playing?: boolean;
  /** Playback progress 0–1 (fills the waveform up to the playhead). */
  progress?: number;
  /** Persian duration, e.g. "۰:۱۴". */
  duration?: string;
  onToggle?: () => void;
}
/** Voice message player: waveform, play/pause, duration. */
export function VoicePlayer(props: VoicePlayerProps): JSX.Element;
