import React from 'react';
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'noProfiles' | 'noMatches' | 'noMessages' | 'noResults';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  /** Override the default CTA; pass null to hide. */
  actionLabel?: React.ReactNode | null;
  onAction?: () => void;
}
/** Empty states: no profiles, no matches, no messages, no search results. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
