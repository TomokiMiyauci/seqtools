// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Sliceable } from "./types.ts";

/** Extract the elements after the head of a sequence.
 * @example
 * ```ts
 * import { tail } from "https://deno.land/x/seqtools/tail.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(tail([1, 2, 3]), [2, 3]);
 * assertEquals(tail("abc"), "bc");
 * assertEquals(tail([0]), []);
 * assertEquals(tail([]), []);
 * ```
 */
export function tail<const T extends readonly unknown[]>(
  seq: readonly [unknown, ...T],
): T;
export function tail<const T extends string>(seq: `${string}${T}`): T;
export function tail<T>(seq: Readonly<Sliceable<T>>): T;
export function tail<T>(seq: Readonly<Sliceable<T>>): T {
  return seq.slice(1);
}
