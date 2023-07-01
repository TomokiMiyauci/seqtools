// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { initLast } from "./init_last.ts";
import { Sequence } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("initLast", () => {
  it("should return elements without last", () => {
    const table: [Sequence<unknown>, [unknown, unknown]][] = [
      [[], [[], undefined]],
      ["", ["", undefined]],
      [[, ,], [[,], undefined]],
      [[""], [[], ""]],
      ["a", ["", "a"]],

      [["a", "b", "c"], [["a", "b"], "c"]],
      ["abc", ["ab", "c"]],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(initLast(seq), expected);
    });
  });

  it("should infer empty sequence if empty or single", () => {
    const result = initLast([]);

    assertType<IsExact<typeof result, [never[], undefined]>>(true);

    const result2 = initLast([""]);

    assertType<IsExact<typeof result2, [[], ""]>>(true);

    const result3 = initLast("");

    assertType<IsExact<typeof result3, ["", undefined]>>(true);

    const result4 = initLast("a");

    assertType<IsExact<typeof result4, ["", "a"]>>(true);
  });

  it("should infer elements without last if tuple", () => {
    const result = initLast(["a", "b"]);

    assertType<IsExact<typeof result, [["a"], "b"]>>(true);

    const result2 = initLast(["a", "b", "c"]);

    assertType<IsExact<typeof result2, [["a", "b"], "c"]>>(true);
  });

  it("should infer elements without last if template string literal", () => {
    const result = initLast("ab");

    assertType<IsExact<typeof result, ["a", "b"]>>(true);

    const result2 = initLast("abc");

    assertType<IsExact<typeof result2, ["ab", "c"]>>(true);
  });

  it("should infer as is if string or array", () => {
    const result = initLast("" as string);

    assertType<IsExact<typeof result, [string, string | undefined]>>(true);

    const result2 = initLast([] as string[]);

    assertType<IsExact<typeof result2, [string[], string | undefined]>>(true);
  });
});
