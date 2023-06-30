// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Sliceable } from "./types.ts";

/** Extract the elements before the last of a sequence.
 *
 * @example
 * ```ts
 * import { init } from "https://deno.land/x/seqtools/init.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(init([1, 2, 3]), [1, 2]);
 * assertEquals(init("abc"), "ab");
 * assertEquals(init([0]), []);
 * assertEquals(init([]), []);
 * ```
 */
export function init<const T extends readonly unknown[]>(
  seq: readonly [...T, unknown],
): T;
export function init<const T extends string>(seq: `${T}`): InitString<T>;
export function init<T>(seq: Readonly<Sliceable<T>>): T;
export function init<T>(seq: Readonly<Sliceable<T>>): T {
  return seq.slice(0, -1);
}

export type InitString<T extends string> = T extends "" ? "" : DropLastChar<T>;

type DropLastChar<T extends string, Acc extends string = ""> = T extends
  `${infer U}${infer V}` ? V extends "" ? Acc : DropLastChar<V, `${Acc}${U}`>
  : never;
