import React from 'react';
export interface ReportReason { value: string; label: React.ReactNode; }
export interface ReportFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** reason = selection list; done = confirmation screen. */
  step?: 'reason' | 'done';
  reasons?: ReportReason[];
  /** Selected reason value. */
  value?: string;
  onSelect?: (value: string) => void;
  onSubmit?: () => void;
  onDone?: () => void;
  /** Persian display name of the reported user. */
  name?: string;
}
/** Report flow: reason selection list + confirmation. */
export function ReportFlow(props: ReportFlowProps): JSX.Element;
