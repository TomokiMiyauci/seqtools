// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { init } from "./init.ts";
import { Sliceable, VariableLength } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("init", () => {
  it("should return elements without last", () => {
    const table: [Sliceable<unknown> & VariableLength, unknown][] = [
      [[], []],
      ["", ""],
      [[""], []],
      ["a", ""],

      [["a", "b", "c"], ["a", "b"]],
      ["abc", "ab"],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(init(seq), expected);
    });
  });

  it("should infer empty sequence if empty or single", () => {
    const result = init([]);

    assertType<IsExact<typeof result, never[]>>(true);

    const result2 = init([""]);

    assertType<IsExact<typeof result2, []>>(true);

    const result3 = init("");

    assertType<IsExact<typeof result3, "">>(true);

    const result4 = init("a");

    assertType<IsExact<typeof result4, "">>(true);
  });

  it("should infer elements without last if tuple", () => {
    const result = init(["a", "b"]);

    assertType<IsExact<typeof result, ["a"]>>(true);

    const result2 = init(["a", "b", "c"]);

    assertType<IsExact<typeof result2, ["a", "b"]>>(true);
  });

  it("should infer elements without last if template string literal", () => {
    const result = init("ab");

    assertType<IsExact<typeof result, "a">>(true);

    const result2 = init("abc");

    assertType<IsExact<typeof result2, "ab">>(true);
  });

  it("should infer as is if string or array", () => {
    const result = init("" as string);

    assertType<IsExact<typeof result, string>>(true);

    const result2 = init([] as string[]);

    assertType<IsExact<typeof result2, string[]>>(true);
  });
});
