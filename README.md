# js-byte-format

![CI](https://github.com/j8r/js-byte-format/workflows/CI/badge.svg)
[![ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://en.wikipedia.org/wiki/ISC_license)

Encode/decode JavaScript datatypes (String, Number, Object) to/from bytes.

A use-case is sending/receiving bytes through WebSockets, which is more efficient than using JSON strings.

## Installation

`npm install --save git+ssh://git@github.com/j8r/js-byte-format.git`

## Usage

See tests for [decoder](test/decoder_test.js) and [encoder](test/encoder_test.js).

## Run tests

`node --unhandled-rejections=strict test`

An exit 0 means all tests have passed with success, otherwise an exception will be printed and a exit 1 returned.

## License

Copyright (c) 2020-2021 Julien Reichardt - ISC License
