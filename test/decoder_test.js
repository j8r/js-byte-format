import { strict as assert } from "assert";
import ByteDecoder from "../lib/ByteDecoder.js"

function newDecoder(array) {
  return new ByteDecoder(new Uint8Array(array).buffer)
}

DecodeString: {
  assert.equal(newDecoder([97, 98, 99, 0]).readString(), "abc")
}

DecodeBool: {
  assert.equal(newDecoder([0]).readBool(), false)
  assert.equal(newDecoder([1]).readBool(), true)
}

DecodeInt8: {
  assert.equal(newDecoder([1]).readInt8(), 1)
}

DecodeUint8: {
  assert.equal(newDecoder([1]).readUint8(), 1)
}

DecodeInt16: {
  assert.equal(newDecoder([1, 0]).readInt16(), 1)
}

DecodeUint16: {
  assert.equal(newDecoder([1, 0]).readUint16(), 1)
}

DecodeInt32: {
  assert.equal(newDecoder([1, 0, 0, 0]).readInt32(), 1)
}

DecodeUint32: {
  assert.equal(newDecoder([1, 0, 0, 0]).readUint32(), 1)
}

DecodeFloat32: {
  assert.equal(newDecoder([0, 0, 192, 63]).readFloat32(), 1.5)
}

DecodeFloat64: {
  newDecoder(newDecoder([0, 0, 0, 0, 0, 0, 248, 63]).readFloat64(), 1.5)
}

DecodeMultiple: {
  let byteDecoder = newDecoder([97, 0, 1])
  assert.equal(byteDecoder.readString(), "a")
  assert.equal(byteDecoder.readInt8(), 1)
}
