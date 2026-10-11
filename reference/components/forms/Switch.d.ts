import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  /**
   * SEMANTIC choice — driven by what turning the switch ON *means*, never by visual
   * density or to make a busy screen calmer. When ambiguous, default to `enabling`.
   *
   * `enabling` (default) — ON **adds** something to the user's experience: an optional,
   * positive, expressive choice. On-track is `--gradient-brand`.
   * Voice messages · notifications and their sub-settings · show distance · show online
   * status · only verified users can contact me · keep my photos blurred until we match.
   *
   * `restricting` — ON **limits, hides or cuts off**: a protective or safety action,
   * where brand color would read as celebratory. On-track is the neutral `--action-cta`,
   * which inverts per theme like the primary button.
   * Also block this user · hide from contacts · incognito mode · temporarily deactivate.
   *
   * (`neutral` is a deprecated alias for `restricting`.)
   */
  variant?: 'enabling' | 'restricting' | 'neutral';
  disabled?: boolean;
  /** Force the pressed (scale 0.97) state — for specimen sheets; real presses use :active. */
  pressed?: boolean;
}

/** Pill on/off switch with a soft-unfold thumb slide. Off-state, knob, sizing and motion
 *  are identical across variants — only the on-state track fill differs. */
export function Switch(props: SwitchProps): JSX.Element;
