import React from 'react';

export interface TypingDotsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Paint the dots with the Deltalk warm→cool gradient (hero moments). */
  brand?: boolean;
  /** Override dot color (defaults to currentColor). */
  color?: string;
}

/** The three-dots typing indicator — Deltalk's signature brand device. */
export function TypingDots(props: TypingDotsProps): JSX.Element;
