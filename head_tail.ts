// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Sequence } from "./types.ts";

/** Split the sequence into head and tail.
 *
 * @example
 * ```ts
 * import { headTail } from "https://deno.land/x/seqtools/head_tail.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(headTail([1, 2, 3]), [1, [2, 3]]);
 * assertEquals(headTail("abc"), ["a", "bc"]);
 * assertEquals(headTail([]), [undefined, []]);
 * ```
 */
export function headTail<const T, const U extends readonly unknown[]>(
  array: readonly [T, ...U],
): [head: T, tail: U];
export function headTail<const T extends string, const U extends string>(
  string: `${T}${U}`,
): [head: T, tail: U];
export function headTail<T, U = T>(
  seq: Readonly<Sequence<T, U>>,
): [head: T | undefined, tail: U];
export function headTail<T, U = T>(
  seq: Readonly<Sequence<T, U>>,
): [head: T | undefined, tail: U] {
  return [seq.at(0), seq.slice(1)];
}
