import React from 'react';
export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional Persian label, e.g. "سارا در حال نوشتن است". */
  label?: React.ReactNode;
}
/** Received-message typing indicator. */
export function TypingIndicator(props: TypingIndicatorProps): JSX.Element;
