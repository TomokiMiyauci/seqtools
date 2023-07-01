// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { headTail } from "./head_tail.ts";
import { Sequence } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("headTail", () => {
  it("should return head, tail", () => {
    const table: [Sequence<unknown>, [unknown, unknown]][] = [
      [[], [undefined, []]],
      ["", [undefined, ""]],
      [[""], ["", []]],
      [[,], [undefined, []]],
      [["a", "b", "c"], ["a", ["b", "c"]]],
      ["a", ["a", ""]],
      ["abc", ["a", "bc"]],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(headTail(seq), expected);
    });
  });

  it("should infer undefined, never[] if empty array", () => {
    const result = headTail([]);
    assertType<IsExact<typeof result, [undefined, never[]]>>(true);
  });

  it("should infer string or undefined, string if empty string", () => {
    const result = headTail("");
    assertType<IsExact<typeof result, [string | undefined, string]>>(true);
  });

  it("should infer string or undefined, string[] if array", () => {
    const result = headTail([] as string[]);
    assertType<IsExact<typeof result, [string | undefined, string[]]>>(true);
  });

  it("should infer string or undefined, string if string", () => {
    const result = headTail("" as string);
    assertType<IsExact<typeof result, [string | undefined, string]>>(true);
  });

  it("should infer head, tail if tuple", () => {
    const result = headTail([""]);
    assertType<IsExact<typeof result, ["", []]>>(true);

    const result2 = headTail(["a", "b", "c"]);
    assertType<IsExact<typeof result2, ["a", ["b", "c"]]>>(true);
  });

  it("should infer head, tail if template literal", () => {
    const result = headTail("a");
    assertType<IsExact<typeof result, ["a", ""]>>(true);

    const result2 = headTail("abc");
    assertType<IsExact<typeof result2, ["a", "bc"]>>(true);
  });
});
