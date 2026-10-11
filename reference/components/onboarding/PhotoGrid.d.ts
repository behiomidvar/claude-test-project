import React from 'react';
export interface PhotoSlot {
  state: 'empty' | 'uploading' | 'uploaded' | 'error';
  src?: string;
  /** 0–100 upload progress for the uploading state. */
  progress?: number;
  dragging?: boolean;
}
export interface PhotoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Slot descriptors; missing entries render as empty add-slots. */
  slots?: PhotoSlot[];
  count?: number;
  onAdd?: (index: number) => void;
  onRemove?: (index: number) => void;
  onRetry?: (index: number) => void;
}
/** 6-slot photo upload grid (add, uploading, uploaded, error) with a primary-photo marker. */
export function PhotoGrid(props: PhotoGridProps): JSX.Element;
