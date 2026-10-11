import React from 'react';

export interface PromptCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The prompt question, set in the display serif. */
  question: string;
  /** The user's answer. Omit for an empty "tap to answer" state. */
  answer?: string;
  /** Overline label above the question. */
  label?: string;
  children?: React.ReactNode;
}

/**
 * Profile prompt card — a question answered in words, leading a profile.
 */
export function PromptCard(props: PromptCardProps): JSX.Element;
