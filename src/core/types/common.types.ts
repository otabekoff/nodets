// ============================================================================
// src/core/types/common.types.ts - Shared Types (EXPORTED)
// ============================================================================
/**
 * Common types that need to be imported/exported
 * These are NOT ambient - they must be imported where used
 */

export type ID = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncFunction<T = void, A extends unknown[] = unknown[]> = (...args: A) => Promise<T>;

export type Constructor<T = object, A extends unknown[] = unknown[]> = new (...args: A) => T;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
