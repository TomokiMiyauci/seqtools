// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export interface Sequence<T> extends Indexable<T>, Sliceable<T> {}

export interface Indexable<T> {
  /** Returns the item located at the specified index. */
  at(index: number): T | undefined;
}

export interface Sliceable<T> {
  /** Return extracted elements */
  slice(start?: number, end?: number): T;
}
