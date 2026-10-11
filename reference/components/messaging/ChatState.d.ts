import React from 'react';
export interface ChatStateProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'newMatch' | 'unmatched' | 'blocked' | 'ended';
  /** Override the default Persian title. */
  title?: React.ReactNode;
  /** Override the default Persian body text. */
  text?: React.ReactNode;
  /** Override the default CTA label; pass null to hide the button. */
  actionLabel?: React.ReactNode | null;
  onAction?: () => void;
}
/** Full-conversation empty/blocked state (new match, unmatched, blocked, ended). */
export function ChatState(props: ChatStateProps): JSX.Element;
