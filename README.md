# happy-event-bus

[![Github Actions Test](https://github.com/tangdaohai/happy-event-bus/workflows/test%20CI/badge.svg)](https://github.com/tangdaohai/happy-event-bus/actions?query=workflow%3A%22test+CI%22) [![codecov.io](https://codecov.io/gh/tangdaohai/happy-event-bus/branch/master/graph/badge.svg)](https://codecov.io/gh/tangdaohai/happy-event-bus) [![npm version](https://img.shields.io/npm/v/happy-event-bus)](https://www.npmjs.com/package/happy-event-bus) ![file size](https://img.shields.io/bundlephobia/minzip/happy-event-bus?color=rgb%2855%2C%20173%2C%20112%29&label=file%20size) ![license MIT](https://img.shields.io/github/license/tangdaohai/happy-event-bus)

Event bus util and support symbol/string/number.

* Typescript
* Can be run in a browser or Node.js(works in any JavaScript runtime)
* Support multiple event types(symbol/string/number)
* [Easy and quickly cancel listen](#quickly-cancel-listen)

### install

##### npm

```sh

npm i happy-event-bus

# or

yarn add happy-event-bus

```

##### CDN

UMD build

```html
<script src="https://unpkg.com/happy-event-bus/dist/index.umd.js"></script>
```

### use

##### init

```ts
// import and init
import Emitter from 'happy-event-bus'
const emitter = new Emitter()
// or export emitter
export default emitter
```

##### on and emit

```ts

import emitter from './emitter.js'

// string
emitter.on('anyone', (...item) => { console.log(item) })
emitter.emit('anyone', 'foo') // -> ['foo']
emitter.emit('anyone', 'foo', 'bar') // ['foo', 'bar']

// number
const ONE = 1
emitter.on(ONE, () => {})
emitter.emit(ONE)

// symbol
const foo = Symbol('foo')
emitter.on(foo, (item) => { console.log(item) }) // -> foo
emitter.emit(foo, 'foo')
```

##### once

```ts
import emitter from './emitter.js'
// remove auto after emit
emitter.once('foo')
```

##### quickly cancel listen

on/once will return a function and can be off himself

```ts
import emitter from './emitter.js'

const cb = () => {}
const fooListenStopHandle = emitter.on('foo', cb)
// off
fooListenStopHandle()
emitter.emit('foo') // -> foo cb never call

const barCb = () => {}
const barListenStopHandle = emitter.once('bar', barCb)
// off
barListenStopHandle()
emitter.emit('bar') // -> bar cb never call

```

##### off

```ts
import emitter from './emitter.js'

// off callback
const cb = () => {}
emitter.on('foo', cb)
emitter.off('foo', cb)

// off foo callback
emitter.off('foo')

// off all item
emitter.off()
```

### LICENSE

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020 [唐道海](https://github.com/tangdaohai)