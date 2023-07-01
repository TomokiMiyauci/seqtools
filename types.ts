// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Sequence API. */
export interface Sequence<T, U = T> extends Indexable<T>, Sliceable<U> {}

/** Index access-able API. */
export interface Indexable<T> {
  /** Returns the item located at the specified index. */
  at(index: number): T | undefined;
}

/** Slice-able API. */
export interface Sliceable<T> {
  /** Return extracted elements */
  slice(start?: number, end?: number): T;
}
