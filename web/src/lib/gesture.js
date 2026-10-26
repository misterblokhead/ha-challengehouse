// Where a flick of `velocity` px/s ends up, with UIScrollView-style deceleration.
export const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

// A swipe-back closes when its projected end passes half the width.
export const shouldClose = (offset, velocity, width) => offset + project(velocity) > width / 2;

// Finger velocity in px/s from recent {t (ms), x (px)} samples, oldest to newest; 0 without a time span.
export function velocity(samples) {
  const a = samples[0], b = samples[samples.length - 1];
  return a && b && b.t > a.t ? ((b.x - a.x) / (b.t - a.t)) * 1000 : 0;
}

// Past a boundary the element follows less the further it goes (`overshoot` and the result in px, `dimension` the element's size).
export const rubberband = (overshoot, dimension, c = 0.55) => (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
