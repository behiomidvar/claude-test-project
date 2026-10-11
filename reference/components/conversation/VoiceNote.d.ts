import React from 'react';

export interface VoiceNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: 'me' | 'them';
  /** Displayed duration, e.g. "0:12". */
  duration?: string;
  playing?: boolean;
  onToggle?: () => void;
}

/** Voice-note message bubble with waveform and play/pause. */
export function VoiceNote(props: VoiceNoteProps): JSX.Element;
