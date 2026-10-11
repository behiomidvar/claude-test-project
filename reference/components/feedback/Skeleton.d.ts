import React from 'react';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'profileCard' | /** legacy alias of profileCard */ 'swipeCard' | 'chatList' | 'profile' | 'text' | 'avatar';
  /** Row/line count for chatList and text variants. */
  lines?: number;
}
/** Shimmer skeleton loaders for the swipe card, chat list, and profile. */
export function Skeleton(props: SkeletonProps): JSX.Element;
