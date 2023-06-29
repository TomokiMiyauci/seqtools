// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { last } from "./last.ts";
import { Indexable } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("last", () => {
  it("should return last of element", () => {
    const table: [Indexable<unknown>, unknown][] = [
      [[], undefined],
      ["", undefined],

      [[""], ""],
      [["a", "b", "c"], "c"],
      ["a", "a"],
      ["abc", "c"],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(last(seq), expected);
    });
  });

  it("should infer undefined if the sequence is empty", () => {
    const result = last([]);

    assertType<IsExact<typeof result, undefined>>(true);

    const result2 = last("");

    assertType<IsExact<typeof result2, undefined>>(true);
  });

  it("should infer undefined or element if the sequence is array of string", () => {
    const result = last([] as string[]);

    assertType<IsExact<typeof result, undefined | string>>(true);

    const result2 = last("" as string);

    assertType<IsExact<typeof result2, undefined | string>>(true);
  });

  it("should infer last element if tuple", () => {
    const result = last([""]);

    assertType<IsExact<typeof result, "">>(true);

    const result2 = last(["a", "b", "c"]);

    assertType<IsExact<typeof result2, "c">>(true);
  });

  it("should infer last element if template string literal", () => {
    const result = last("a");

    assertType<IsExact<typeof result, "a">>(true);

    const result2 = last("abc");

    assertType<IsExact<typeof result2, "c">>(true);
  });
});
