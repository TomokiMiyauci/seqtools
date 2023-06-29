// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { tail } from "./tail.ts";
import { Sliceable } from "./types.ts";
import {
  assertEquals,
  assertType,
  describe,
  IsExact,
  it,
} from "./_dev_deps.ts";

describe("tail", () => {
  it("should return elements without head", () => {
    const table: [Sliceable<unknown>, unknown][] = [
      [[""], []],
      [["a", "b", "c"], ["b", "c"]],
      ["a", ""],
      ["abc", "bc"],

      [[], []],
      ["", ""],
    ];

    table.forEach(([seq, expected]) => {
      assertEquals(tail(seq), expected);
    });
  });

  it("should infer never[] if empty array", () => {
    const result = tail([]);

    assertType<IsExact<typeof result, never[]>>(true);
  });

  it("should should infer empty array if single tuple", () => {
    const result = tail([0]);

    assertType<IsExact<typeof result, []>>(true);
  });

  it("should infer tail elements", () => {
    const result = tail([0, 1, 2]);

    assertType<IsExact<typeof result, [1, 2]>>(true);
  });

  it("should infer string if empty string", () => {
    const result = tail("");

    assertType<IsExact<typeof result, string>>(true);
  });

  it("should infer empty string if single string", () => {
    const result = tail("a");

    assertType<IsExact<typeof result, "">>(true);
  });

  it("should infer tail chars", () => {
    const result = tail("abc");

    assertType<IsExact<typeof result, "bc">>(true);
  });
});
