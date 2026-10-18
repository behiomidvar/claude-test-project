import type {Orientation} from '../../core/layout';

/**
 * DeviceScale multipliers for StorePromo (1 = the 393 dp device width on the
 * frame's short edge). Phones are cropped by the frame edge on purpose, so
 * their UI stays readable in both formats.
 */
export const PHONE_SCALE: Record<Orientation, number> = {portrait: 0.78, landscape: 0.6, square: 0.5};

/** Floating UI without a phone (cards, sheets): larger, read at a glance. */
export const HERO_SCALE: Record<Orientation, number> = {portrait: 0.92, landscape: 0.76, square: 0.7};
