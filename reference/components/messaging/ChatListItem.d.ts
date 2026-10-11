import React from 'react';
export interface ChatListItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  avatar?: string;
  /** Last message preview (Persian). Ignored for `newMatch`. */
  preview?: string;
  /** Persian timestamp, e.g. "۹:۴۱" or "دیروز". */
  time?: string;
  /** Unread count (rendered in Persian numerals). */
  unread?: number;
  online?: boolean;
  state?: 'unread' | 'read' | 'muted' | 'newMatch';
  /** Show a sent-tick before the preview (last message was yours). */
  outgoing?: boolean;
}
/** Conversation list row with avatar, preview, timestamp and unread badge. */
export function ChatListItem(props: ChatListItemProps): JSX.Element;
