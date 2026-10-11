import React from 'react';
export interface PermissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'location' | 'notifications' | 'camera' | 'photos';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  allowLabel?: React.ReactNode;
  laterLabel?: React.ReactNode;
  onAllow?: () => void;
  onLater?: () => void;
}
/** Permission request card (location, notifications, camera, photos). */
export function PermissionCard(props: PermissionCardProps): JSX.Element;
