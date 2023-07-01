// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Sequence } from "./types.ts";
import type { LastString } from "./last.ts";
import type { InitString } from "./init.ts";

/** Split the sequence into init and last.
 *
 * @example
 * ```ts
 * import { initLast } from "https://deno.land/x/seqtools/init_last.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(initLast([1, 2, 3]), [[1, 2], 3]);
 * assertEquals(initLast("abc"), ["ab", "c"]);
 * assertEquals(initLast([]), [[], undefined]);
 * ```
 */
export function initLast<const T extends readonly unknown[], const U>(
  array: readonly [...T, U],
): [init: T, last: U];
export function initLast<const T extends string>(
  string: `${T}`,
): [init: InitString<T>, last: LastString<T>];
export function initLast<T, U = T>(
  seq: Readonly<Sequence<T, U>>,
): [init: U, last: T | undefined];
export function initLast<T, U = T>(
  seq: Readonly<Sequence<T, U>>,
): [init: U, last: T | undefined] {
  return [seq.slice(0, -1), seq.at(-1)];
}
