import React from 'react';
export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export interface ReplyQuote { name: string; text: string; }
export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: 'sent' | 'received';
  /** Delivery state (sent bubbles only): sending | sent | delivered | read | failed. */
  status?: DeliveryStatus;
  /** Persian timestamp, e.g. "۹:۴۱". */
  time?: string;
  variant?: 'text' | 'emoji' | 'image' | 'reply';
  image?: string;
  caption?: React.ReactNode;
  /** Quoted message shown above the body (reply variant). */
  replyTo?: ReplyQuote;
  /** Retry handler shown when status is 'failed'. */
  onRetry?: () => void;
  children?: React.ReactNode;
}
/** Chat message bubble with delivery states and text/emoji/image/reply variants. */
export function ChatBubble(props: ChatBubbleProps): JSX.Element;
