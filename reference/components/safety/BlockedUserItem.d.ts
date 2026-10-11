import React from 'react';
export interface BlockedUserItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  avatar?: string;
  /** Secondary line, e.g. "مسدود شده در ۱۲ خرداد". */
  meta?: React.ReactNode;
  /** Pending state while the unblock request is in flight. */
  unblocking?: boolean;
  unblockLabel?: React.ReactNode;
  onUnblock?: () => void;
}
/** Blocked-users list row with unblock action. */
export function BlockedUserItem(props: BlockedUserItemProps): JSX.Element;
