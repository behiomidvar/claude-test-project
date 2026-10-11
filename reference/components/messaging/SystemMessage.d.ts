import React from 'react';
export interface SystemMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `match` = the celebratory "you matched on …" line; `info` = neutral notice. */
  variant?: 'match' | 'info';
  children?: React.ReactNode;
}
/** Centered in-conversation system message. */
export function SystemMessage(props: SystemMessageProps): JSX.Element;
