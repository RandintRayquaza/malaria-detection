export function clamp(value, min, max) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}
