import React from 'react';

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `me` = warm (the user's message), `them` = cool (the other person). */
  from?: 'me' | 'them';
  /** Timestamp / read meta shown under the text. */
  time?: string;
  /** Render an animated typing bubble instead of text. */
  typing?: boolean;
  children?: React.ReactNode;
}

/** A chat message bubble. Warm for the user, cool for the other person; RTL-aware tails. */
export function MessageBubble(props: MessageBubbleProps): JSX.Element;
