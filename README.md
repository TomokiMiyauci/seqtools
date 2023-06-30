# seqtools

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/seqtools)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/seqtools?doc)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/seqtools)](https://github.com/TomokiMiyauci/seqtools/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/seqtools/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/seqtools)
[![License](https://img.shields.io/github/license/TomokiMiyauci/seqtools)](LICENSE)

[![test](https://github.com/TomokiMiyauci/seqtools/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/seqtools/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/seqtools.png?mini=true)](https://nodei.co/npm/seqtools/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Efficient utilities for sequence.

## Table of Contents <!-- omit in toc -->

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [head](#head)
  - [tail](#tail)
  - [init](#init)
  - [last](#last)
  - [headTail](#headtail)
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

### headTail

Split the sequence into head and tail.

```ts
import { headTail } from "https://deno.land/x/seqtools/head_tail.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(headTail([1, 2, 3]), [1, [2, 3]]);
assertEquals(headTail("abc"), ["a", "bc"]);
assertEquals(headTail([]), [undefined, []]);
```

Conceptually, it is similar to Array destructuring, but done in a theoretically
best-performing way.

## API

See [deno doc](https://deno.land/x/seqtools?doc) for all APIs.

## Contributing

See [contribution](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
