![math.js](https://raw.githubusercontent.com/josdejong/mathjs/develop/misc/img/mathjs.svg)

[https://mathjs.org](https://mathjs.org)

Math.js is an extensive math library for JavaScript and Node.js. It features a flexible expression parser with support for symbolic computation, comes with a large set of built-in functions and constants, and offers an integrated solution to work with different data types like numbers, big numbers, complex numbers, fractions, units, and matrices. Powerful and easy to use.

[![Version](https://img.shields.io/npm/v/mathjs.svg)](https://www.npmjs.com/package/mathjs)
[![Downloads](https://img.shields.io/npm/dm/mathjs.svg)](https://www.npmjs.com/package/mathjs)
[![Build Status](https://github.com/josdejong/mathjs/workflows/Node.js%20CI/badge.svg)](https://github.com/josdejong/mathjs/actions)
[![Maintenance](https://img.shields.io/maintenance/yes/2025.svg)](https://github.com/josdejong/mathjs/graphs/commit-activity)
[![License](https://img.shields.io/github/license/josdejong/mathjs.svg)](https://github.com/josdejong/mathjs/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjosdejong%2Fmathjs.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjosdejong%2Fmathjs?ref=badge_shield)
[![Codecov](https://codecov.io/gh/josdejong/mathjs/branch/develop/graph/badge.svg)](https://codecov.io/gh/josdejong/mathjs)
[![Github Sponsor](https://img.shields.io/github/sponsors/josdejong
)](https://github.com/sponsors/josdejong)

## Features

- Supports numbers, bignumbers, bigints, complex numbers, fractions, units, strings, arrays, and matrices.
- Is compatible with JavaScript's built-in Math library.
- Contains a flexible expression parser.
- Does symbolic computation.
- Comes with a large set of built-in functions and constants.
- Can be used as a command line application as well.
- Runs on any JavaScript engine.
- Is easily extensible.
- Open source.

## Usage

Math.js can be used in both node.js and in the browser.

Install math.js using [npm](https://www.npmjs.com/package/mathjs):

    npm install mathjs

Or download mathjs via one of the CDN's listed on the downloads page:

&nbsp;&nbsp;&nbsp;&nbsp;[https://mathjs.org/download.html](https://mathjs.org/download.html#download)

Math.js can be used similar to JavaScript's built-in Math library. Besides that,
math.js can evaluate
[expressions](https://mathjs.org/docs/expressions/index.html)
and supports
[chained operations](https://mathjs.org/docs/core/chaining.html).

```js
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'

// functions and constants
round(e, 3)                    // 2.718
atan2(3, -3) / pi              // 0.75
log(10000, 10)                 // 4
sqrt(-4)                       // 2i
pow([[-1, 2], [3, 1]], 2)      // [[7, 0], [0, 7]]
derivative('x^2 + x', 'x')     // 2 * x + 1

// expressions
evaluate('12 / (2.3 + 0.7)')   // 4
evaluate('12.7 cm to inch')    // 5 inch
evaluate('sin(45 deg) ^ 2')    // 0.5
evaluate('9 / 3 + 2i')         // 3 + 2i
evaluate('det([-1, 2; 3, 1])') // -7

// chaining
chain(3)
    .add(4)
    .multiply(2)
    .done()  // 14
```

See the [Getting Started](https://mathjs.org/docs/getting_started.html) for a more detailed tutorial.


## Browser support

Math.js works on any [ES2020](https://262.ecma-international.org/11.0/) compatible JavaScript engine, including node.js, Chrome, Firefox, Safari, and Edge.


## Documentation

- [Getting Started](https://mathjs.org/docs/getting_started.html)
- [Examples](https://mathjs.org/examples/index.html)
- [Overview](https://mathjs.org/docs/index.html)
- [History](https://mathjs.org/history.html)


## Build

First clone the project from github:

    git clone git@github.com:josdejong/mathjs.git
    cd mathjs

Install the project dependencies:

    npm install

Then, the project can be build by executing the build script via npm:

    npm run build

This will build ESM output, CommonJS output, and the bundle math.js
from the source files and put them in the folder lib.


## Develop

When developing new features for mathjs, it is good to be aware of the following background information.

### Code

The code of `mathjs` is written in ES modules, and requires all files to have a real, relative path, meaning the files must have a `*.js` extension. Please configure adding file extensions on auto import in your IDE.

### Architecture

What mathjs tries to achieve is to offer an environment where you can do calculations with mixed data types,
like multiplying a regular `number` with a `Complex` number or a `BigNumber`, and work with all of those in matrices.
Mathjs also allows to add a new data type with little effort.

The solution that mathjs uses has two main ingredients:

- **Typed functions**. All functions are created using [`typed-function`](https://github.com/josdejong/typed-function/). This makes it easier to (dynamically) create and extend a single function with new data types, automatically do type conversions on function inputs, etc. So, if you create function multiply for two `number`s, you can extend it with support for multiplying your own data type, say `MyDecimal`. If you define a conversion from `MyDecimal` to `number`, the typed-function will automatically allow you to multiply a `MyDecimal` with a `number`.

- **Dependency injection**. When we have a function `multiply` with support for `MyDecimal`, thanks to the dependency injection, other functions using `multiply` under the hood, like `prod`, will automatically support `MyDecimal` too. This also works the other way around: if you don't need the heavyweight `multiply` (which supports BigNumbers, matrices, etc), and you just need a plain and simple number support, you can use a lightweight implementation of `multiply` just for numbers, and inject that in `prod` and other functions.

At the lowest level, mathjs has immutable factory functions which create immutable functions. The core function `math.create(...)` creates a new instance having functions created from all passed factory functions. A mathjs instance is a collection of created functions. It contains a function like `math.import` to allow extending the instance with new functions, which can then be used in the expression parser.

### Implementing a new function

A common case is to implement a new function. This involves the following steps:

- Implement the function in the right category, for example `./src/function/arithmetic/myNewFunction.js`, where you can replace `arithmetic` with the proper category, and `myNewFunction` with the name of the new function. Add the new function to the index files `./src/factoriesAny.js` and possibly `./src/factoriesNumber.js`.
- Write documentation on the function in the source code comment of `myNewFunction.js`. This documentation is used to auto generate documentation on the website.
- Write embedded documentation for the new function in `./src/expression/embeddedDocs/function/arithmetic/myNewFunction.js`. Add the new documentation to the index file `./src/expression/embeddedDocs/embeddedDocs.js`.
- Write unit tests for the function in `./test/unit-tests/function/arithmetic/myNewFunction.test.js`.
- Write the necessary TypeScript definitions for the new function in `./types/SAT.d.ts`, and write tests for it in `./test/typescript-tests/testTypes.ts`. This is described in [./types/EXPLANATION.md](./types/EXPLANATION.md).
- Ensure the code style is ok by running `npm run lint` (run `npm run format` to fix the code style automatically).


### Build scripts

The build script currently generates two types of output:

- **any**, generate entry points to create full versions of all functions
- **number**: generating and entry points to create lightweight functions just supporting `number`

For each function, an object is generated containing the factory functions of all dependencies of the function. This allows to just load a specific set of functions, and not load or bundle any other functionality. So for example, to just create function `add` you can do `math.create(addDependencies)`.


## Test

To execute tests for the library, install the project dependencies once:

    npm install

Then, the tests can be executed:

    npm test

To test the type definitions:

    npm run test:types

Additionally, the tests can be run on FireFox using [headless mode](https://developer.mozilla.org/en-US/Firefox/Headless_mode):

    npm run test:browser

To run the tests remotely on LambdaTest, first set the environment variables `LT_USERNAME` and `LT_ACCESS_KEY` with your username and access key and then execute:

    npm run test:lambdatest

You can separately run the code linter, though it is also executed with `npm test`:

    npm run lint

To automatically fix linting issue, run:

    npm run format

To test code coverage of the tests:

    npm run coverage

To see the coverage results, open the generated report in your browser:

    ./coverage/lcov-report/index.html


### Continuous integration testing

Continuous integration tests are run on [Github Actions](https://github.com/josdejong/mathjs/actions) and [LambdaTest](https://www.lambdatest.com) every time a commit is pushed to github. Github Actions runs the tests for different versions of node.js, and LambdaTest runs the tests on all major browsers.

[![LambdaTest](https://raw.github.com/josdejong/mathjs/master/misc/lambdatest.svg)](https://www.lambdatest.com)

Thanks, GitHub Actions and LambdaTest for the generous free hosting of this open source project!

## License

mathjs is published under the Apache 2.0 license:

```
Copyright (C) 2013-2025 Jos de Jong <wjosdejong@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

mathjs contains a JavaScript port of the [CSparse](https://github.com/DrTimothyAldenDavis/SuiteSparse/tree/dev/CSparse/Source) library, published under the LGPL-2.1+ license:

```
CSparse: a Concise Sparse matrix package.
Copyright (c) 2006, Timothy A. Davis.
http://www.suitesparse.com

--------------------------------------------------------------------------------

CSparse is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

CSparse is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this Module; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
```
