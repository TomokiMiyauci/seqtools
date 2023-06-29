// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { head } from "./head.ts";
import { Indexable } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("head", () => {
  it("should return first element", () => {
    const table: [Indexable<unknown>, unknown][] = [
      [[""], ""],
      [[,], undefined],
      [["a", "b", "c"], "a"],
      ["a", "a"],
      ["abc", "a"],

      [[], undefined],
      ["", undefined],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(head(seq), expected);
    });
  });

  it("should infer undefined if empty array", () => {
    const result = head([]);
    assertType<IsExact<typeof result, undefined>>(true);
  });

  it("should infer undefined or string if empty string", () => {
    const result = head("");
    assertType<IsExact<typeof result, undefined | string>>(true);
  });

  it("should infer string or undefined if array", () => {
    const result = head([] as string[]);
    assertType<IsExact<typeof result, string | undefined>>(true);
  });

  it("should infer string or undefined if string", () => {
    const result = head("" as string);
    assertType<IsExact<typeof result, string | undefined>>(true);
  });

  it("should infer first element if tuple", () => {
    const result = head([""]);
    assertType<IsExact<typeof result, "">>(true);

    const result2 = head(["a", "b", "c"]);
    assertType<IsExact<typeof result2, "a">>(true);
  });

  it("should infer first element if template string literal", () => {
    const result = head("a");
    assertType<IsExact<typeof result, "a">>(true);

    const result2 = head("abc");
    assertType<IsExact<typeof result2, "a">>(true);
  });
});
