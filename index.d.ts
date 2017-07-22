// Type definitions for LevelDown 1.7
// Project: https://github.com/level/leveldown
// Definitions by: Thiago de Arruda <https://github.com/tarruda>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// MIT License
//
// Copyright (c) Microsoft Corporation. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE


/// <reference types="node" />

export = leveldown;

declare var leveldown: leveldown.Constructor;

declare namespace leveldown {
type Bytes = string | Buffer;
type ErrCallback = (error: any) => void;
type ErrNumberCallback = (error: any, value: number) => void;
type ErrBufferCallback = (error: any, value: Buffer) => void;
type ErrStringCallback = (error: any, value: string) => void;
type KeyAsStringCallback = (error: any, key: string, value: Buffer) => void;
type ValueAsStringCallback = (error: any, key: Buffer, value: string) => void;
type KeyAndValueAsStringCallback = (error: any, key: string, value: string) => void;
type KeyAndValueAsBufferCallback = (error: any, key: Buffer, value: Buffer) => void;

interface PutBatch {
    type: "put";
    key: Bytes;
    value: Bytes;
}

interface DelBatch {
    type: "del";
    key: Bytes;
}

type Batch = PutBatch | DelBatch;

interface OpenOptions {
    createIfMissing?: boolean;
    errorIfExists?: boolean;
    compression?: boolean;
    cacheSize?: number;
}

interface OpenAdvancedOptions extends OpenOptions {
    writeBufferSize?: number;
    blockSize?: number;
    maxOpenFiles?: number;
    blockRestartInterval?: number;
    maxFileSize?: number;
}

interface WriteOptions {
    sync?: boolean;
}

interface ReadOptions {
    fillCache?: boolean;
}

interface BufferReadOptions extends ReadOptions {
    asBuffer?: true;
}

interface StringReadOptions extends ReadOptions {
    asBuffer: false;
}

interface IteratorOptions {
    gt?: Bytes;
    lt?: Bytes;
    gte?: Bytes;
    lte?: Bytes;
    reverse?: boolean;
    keys?: boolean;
    values?: boolean;
    limit?: number;
    fillCache?: boolean;
}

interface KeyAsStringIteratorOptions extends IteratorOptions {
    keyAsBuffer: false;
    valueAsBuffer?: true;
}

interface ValueAsStringIteratorOptions extends IteratorOptions {
    keyAsBuffer?: true;
    valueAsBuffer: false;
}

interface KeyAndValueAsStringIteratorOptions extends IteratorOptions {
    keyAsBuffer: false;
    valueAsBuffer: false;
}

interface KeyAndValueAsBufferIteratorOptions extends IteratorOptions {
    keyAsBuffer?: true;
    valueAsBuffer?: true;
}

interface Iterator {
    seek(key: Bytes): void;
    end(callback: ErrCallback): void;
}

interface KeyAsStringIterator extends Iterator {
    next(callback: KeyAsStringCallback): void;
}

interface ValueAsStringIterator extends Iterator {
    next(callback: ValueAsStringCallback): void;
}

interface KeyAndValueAsStringIterator extends Iterator {
    next(callback: KeyAndValueAsStringCallback): void;
}

interface KeyAndValueAsBufferIterator extends Iterator {
    next(callback: KeyAndValueAsBufferCallback): void;
}

interface LevelDown {
    open(callback: ErrCallback): void;
    open(options: OpenOptions, callback: ErrCallback): void;
    close(callback?: ErrCallback): void;
    put(key: Bytes, value: Bytes, callback: ErrCallback): void;
    put(key: Bytes, value: Bytes, options: WriteOptions, callback: ErrCallback): void;
    get(key: Bytes, callback: ErrBufferCallback): void;
    get(key: Bytes, options: BufferReadOptions, callback: ErrBufferCallback): void;
    get(key: Bytes, options: StringReadOptions, callback: ErrStringCallback): void;
    del(key: Bytes, callback?: ErrCallback): void;
    del(key: Bytes, options: WriteOptions, callback?: ErrCallback): void;
    batch(operations: Batch[], callback?: ErrCallback): void;
    batch(operations: Batch[], options?: WriteOptions, callback?: ErrCallback): void;
    approximateSize(start: Bytes, end: Bytes, callback: ErrNumberCallback): void;
    compactRange(start: Bytes, end: Bytes, callback: ErrCallback): void;
    getProperty(property: string): string;
    iterator(options?: KeyAsStringIteratorOptions): KeyAsStringIterator;
    iterator(options?: ValueAsStringIteratorOptions): ValueAsStringIterator;
    iterator(options?: KeyAndValueAsStringIteratorOptions): KeyAndValueAsStringIterator;
    iterator(options?: KeyAndValueAsBufferIteratorOptions): KeyAndValueAsBufferIterator;
    destroy(location: string, callback: ErrCallback): void;
    repair(location: string, callback: ErrCallback): void;
}

type Constructor = (location: string) => LevelDown;
}
