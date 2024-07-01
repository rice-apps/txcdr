import { moderateScale, scale } from "react-native-size-matters";

/**
 * Alias for `scale`. Scales the input linearly.
 * @param size Size to scale
 * @returns Scaled size
 */
export function sc(size: number): number {
  return scale(size);
}

/**
 * Alias for `moderateScale`. Scales the input by `factor`.
 * @param size Size to scale
 * @param factor Factor to scale `size` by
 * @returns Scaled size
 */
export function msc(size: number, factor?: number | undefined): number {
  return moderateScale(size, factor);
}
