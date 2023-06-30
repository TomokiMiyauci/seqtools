# seqtools

Efficient utilities for sequence.

## Table of Contents <!-- omit in toc -->

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [head](#head)
  - [tail](#tail)
  - [init](#init)
  - [last](#last)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Background

This project is a sequence version of
[itertools](https://github.com/nvie/itertools).

It provides the most efficient solution for sequence.

A sequence is an "indexable, sliceable data structure". See
[`Sequence`](types.ts#L4) for the specific interface.

Standard data structures that satisfy this are string and array.

These data structures encompass multiple data and require efficient data
processing. However, in many cases, multiple alternatives exist to accomplish
the same thing.

If you do something similar, you can **always** use this project. In general,
index access and slicing are performance optimal.

## Install

deno.land:

```ts
import * as mod from "https://deno.land/x/seqtools/[snake_case].ts";
```

npm:

```bash
npm i seqtools
```

## Usage

`mod.ts` does not exist.

### head

Extract the first element of a sequence.

```ts
import { head } from "https://deno.land/x/seqtools/head.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(head([1, 2, 3]), 1);
assertEquals(head("abc"), "a");
assertEquals(head([]), undefined);
```

### tail

Extract the elements after the head of a sequence.

```ts
import { tail } from "https://deno.land/x/seqtools/tail.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(tail([1, 2, 3]), [2, 3]);
assertEquals(tail("abc"), "bc");
assertEquals(tail([0]), []);
assertEquals(tail([]), []);
```

### init

Extract the elements before the last of a sequence.

```ts
import { init } from "https://deno.land/x/seqtools/init.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(init([1, 2, 3]), [1, 2]);
assertEquals(init("abc"), "ab");
assertEquals(init([0]), []);
assertEquals(init([]), []);
```

### last

Extract the last element of a sequence.

```ts
import { last } from "https://deno.land/x/seqtools/last.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(last([1, 2, 3]), 3);
assertEquals(last("abc"), "c");
assertEquals(last([]), undefined);
```

## API

See [deno doc](https://deno.land/x/seqtools?doc) for all APIs.

## Contributing

See [contribution](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
