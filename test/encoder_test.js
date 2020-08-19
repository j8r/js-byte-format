import { strict as assert } from "assert";
import ByteEncoder from "../lib/encoder.js"

function assertBytes(byteEncoder, array) {
  assert.deepEqual(byteEncoder.toBytes(), new Uint8Array(array))
}

EncodeString: {
  let byteEncoder = new ByteEncoder().writeString("abc")
  assertBytes(byteEncoder, [97, 98, 99, 0])
}

EncodeInt8: {
  let byteEncoder = new ByteEncoder().writeInt8(1)
  assertBytes(byteEncoder, [1])
}

EncodeUint8: {
  let byteEncoder = new ByteEncoder().writeUint8(1)
  assertBytes(byteEncoder, [1])
}

EncodeInt16: {
  let byteEncoder = new ByteEncoder().writeInt16(1)
  assertBytes(byteEncoder, [1, 0])
}

EncodeUint16: {
  let byteEncoder = new ByteEncoder().writeUint16(1)
  assertBytes(byteEncoder, [1, 0])
}

EncodeInt32: {
  let byteEncoder = new ByteEncoder().writeInt32(1)
  assertBytes(byteEncoder, [1, 0, 0, 0])
}

EncodeUint32: {
  let byteEncoder = new ByteEncoder().writeUint32(1)
  assertBytes(byteEncoder, [1, 0, 0, 0])
}

EncodeFloat32: {
  let byteEncoder = new ByteEncoder().writeFloat32(1.5)
  assertBytes(byteEncoder, [0, 0, 192, 63])
}

EncodeFloat64: {
  let byteEncoder = new ByteEncoder().writeFloat64(1.5)
  assertBytes(byteEncoder, [0, 0, 0, 0, 0, 0, 248, 63])
}

EncodeMultiple: {
  let byteEncoder = new ByteEncoder()
    .writeString("a")
    .writeInt8(1)
  assertBytes(byteEncoder, [97, 0, 1])
}
