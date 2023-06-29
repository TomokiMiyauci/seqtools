// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Indexable } from "./types.ts";

/** Extract the first element of a sequence.
 *
 * @example
 * ```ts
 * import { head } from "https://deno.land/x/seqtools/head.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(head([1, 2, 3]), 1);
 * assertEquals(head("abc"), "a");
 * assertEquals(head([]), undefined);
 * ```
 */
export function head<const T>(seq: readonly [T, ...readonly unknown[]]): T;
export function head<T extends string>(seq: `${T}${string}`): T;
export function head<T>(seq: Readonly<Indexable<T>>): T | undefined;
export function head<T>(seq: Readonly<Indexable<T>>): T | undefined {
  return seq.at(0);
}
