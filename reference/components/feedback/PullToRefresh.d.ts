import React from 'react';
export interface PullToRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'pull' | 'release' | 'refreshing';
  /** Pull progress 0–1 (used in the `pull` state). */
  progress?: number;
}
/** Pull-to-refresh indicator (pull / release / refreshing). */
export function PullToRefresh(props: PullToRefreshProps): JSX.Element;
