// For size in bytes, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#TypedArray_objects
export default class ByteDecoder {
  pos = 0
  constructor(arrayBuffer, byteDelimiter = 0, littleEndian = true) {
    this.byteDelimiter = byteDelimiter
    this.buffer = arrayBuffer
    this.dataView = new DataView(this.buffer)
    this.littleEndian = littleEndian
  }

  // Move the pos, and grows the internal buffer if necessary, and returns the initial `this.pos`.
  _movePosInBuffer(length) {
    let currentPos = this.pos
    this.pos += length
    return currentPos
  }
  
  _numberCurrentPos(typedArray) {
    return this._movePosInBuffer(typedArray.BYTES_PER_ELEMENT)
  }
  
  readInt8() {
    return this.dataView.getInt8(this._numberCurrentPos(Int8Array))
  }

  readUint8() {
    return this.dataView.getUint8(this._numberCurrentPos(Uint8Array))
  }

  readInt16() {
    return this.dataView.getInt16(this._numberCurrentPos(Int16Array), this.littleEndian)
  }

  readUint16() {
    return this.dataView.getUint16(this._numberCurrentPos(Uint16Array), this.littleEndian)
  }

  readInt32() {
    return this.dataView.getInt32(this._numberCurrentPos(Int32Array), this.littleEndian)
  }

  readUint32() {
    return this.dataView.getUint32(this._numberCurrentPos(Uint32Array), this.littleEndian)
  }

  readFloat32() {
    return this.dataView.getFloat32(this._numberCurrentPos(Float32Array), this.littleEndian)
  }

  readFloat64() {
    return this.dataView.getFloat64(this._numberCurrentPos(Float64Array), this.littleEndian)
  }

  // Reads a string, ending with a `this.byteDelimiter`.
  readString() {
    if (this.bytes === undefined)
      this.bytes = new Uint8Array(this.buffer)
    let byteDelimiterIndex = this.bytes.indexOf(this.byteDelimiter, this.pos)
    let currentPos = this._movePosInBuffer(byteDelimiterIndex + 1)
    return ByteDecoder.textDecoder.decode(new Uint8Array(this.buffer, currentPos, byteDelimiterIndex))
  }
}
ByteDecoder.textDecoder = new TextDecoder()