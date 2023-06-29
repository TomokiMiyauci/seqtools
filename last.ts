// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Indexable } from "./types.ts";

/** Extract the last element of a sequence.
 *
 * @example
 * ```ts
 * import { last } from "https://deno.land/x/seqtools/last.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(last([1, 2, 3]), 3);
 * assertEquals(last("abc"), "c");
 * assertEquals(last([]), undefined);
 * ```
 */
export function last<const T>(seq: readonly [...readonly unknown[], T]): T;
export function last<const T extends string>(seq: `${T}`): LastString<T>;
export function last<T>(seq: Readonly<Indexable<T>>): T | undefined;
export function last<T>(seq: Readonly<Indexable<T>>): T | undefined {
  return seq.at(-1);
}

export type LastString<T extends string> = T extends "" ? undefined
  : LastChar<T>;

export type LastChar<T extends string> = T extends `${infer F}${infer Rest}`
  ? Rest extends "" ? F : LastChar<Rest>
  : never;
