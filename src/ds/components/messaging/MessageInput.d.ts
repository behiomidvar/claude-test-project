import React from 'react';
export interface MessageInputProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'empty' | 'typing' | 'recording' | 'disabled';
  value?: string;
  placeholder?: string;
  /** Persian timer shown while recording, e.g. "۰:۰۸". */
  recordTime?: string;
  /** Banner text for the disabled (unmatched/blocked) state. */
  blockedText?: string;
  onEmoji?: () => void;
  onAttach?: () => void;
  onMic?: () => void;
  onSend?: () => void;
  onCancelRecord?: () => void;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}
/** Message composer with emoji / attach / voice entry points and recording + disabled states. */
export function MessageInput(props: MessageInputProps): JSX.Element;
