export default class ByteEncoder {
  pos = 0
  constructor(bufferLength = 64, byteDelimiter = '\0', littleEndian = true) {
    this.byteDelimiter = byteDelimiter
    this.buffer = new ArrayBuffer(bufferLength)
    this.dataView = new DataView(this.buffer)
    this.littleEndian = littleEndian
  }
  
  nextPowerOfTwo(n) {
    if (n === 0) return 1
    n--
    n |= n >> 1
    n |= n >> 2
    n |= n >> 4
    n |= n >> 8
    n |= n >> 16
    return n + 1
  }

  // Move the pos, and grows the internal buffer if necessary, and returns the initial `pos`.
  _movePosInBuffer(length) {
    let currentPos = this.pos

    this.pos += length
    if (this.pos > this.buffer.byteLength) {
      let newBuffer = new ArrayBuffer(this.nextPowerOfTwo(this.pos))
      new Uint8Array(newBuffer).set(new Uint8Array(this.buffer))
      this.buffer = newBuffer
      this.dataView = new DataView(this.buffer)
    }
    return currentPos
  }
  
  _numberCurrentPos(typedArray) {
    return this._movePosInBuffer(typedArray.BYTES_PER_ELEMENT)
  }
  
  writeInt8(number) {
    let pos = this._numberCurrentPos(Int8Array)
    this.dataView.setInt8(pos, number)
    return this
  }

  writeUint8(number) {
    let pos = this._numberCurrentPos(Uint8Array)
    this.dataView.setUint8(pos, number)
    return this
  }

  writeInt16(number) {
    let pos = this._numberCurrentPos(Uint16Array)
    this.dataView.setInt16(pos, number, this.littleEndian)
    return this
  }

  writeUint16(number) {
    let pos = this._numberCurrentPos(Uint16Array)
    this.dataView.setUint16(pos, number, this.littleEndian)
    return this
  }

  writeInt32(number) {
    let pos = this._numberCurrentPos(Int32Array)
    this.dataView.setInt32(pos, number, this.littleEndian)
    return this
  }

  writeUint32(number) {
    let pos = this._numberCurrentPos(Uint32Array)
    this.dataView.setUint32(pos, number, this.littleEndian)
    return this
  }

  writeFloat32(number) {
    let pos = this._numberCurrentPos(Float32Array)
    this.dataView.setFloat32(pos, number, this.littleEndian)
    return this
  }

  writeFloat64(number) {
    let pos = this._numberCurrentPos(Float64Array)
    this.dataView.setFloat64(pos, number, this.littleEndian)
    return this
  }

  // Writes a string and a `delimiter_byte` at the end, without checking for `byteDelimiter` bytes.
  unsafeWriteString(string) {
    string += this.byteDelimiter
    let uint8Array = ByteEncoder.textEncoder.encode(string)
    let currentPos = this._movePosInBuffer(uint8Array.byteLength)
    new Uint8Array(this.buffer, currentPos).set(uint8Array)
    return this
  }
  
  // Writes a string and a `delimiter_byte` at the end, or throws if the string has a `byteDelimiter` byte.
  writeString(string) {
    let index = string.indexOf(this.byteDelimiter)
    if (index > 0)
      throw `The string '${string}' contains a delimiter byte '${this.delimiterByte}' byte at index ${index}.`
    return this.unsafeWriteString(string)
  }
  
  // Returns a Uint8Array of `this.buffer` until `this.pos`.
  toBytes() {
    return new Uint8Array(this.buffer, 0, this.pos)
  }
  
  // Resets `this.pos` to 0, to start a new encoding.
  reset() {
    this.pos = 0
    return this
  }
}

ByteEncoder.textEncoder = new TextEncoder()
