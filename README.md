# happy-event-bus

event bus util and support symbol/string/number.

### use

##### init

```js
// init Emitter and export it
import Emitter from 'happy-event-bus'
export new Emitter()

// ==> emitter.js
```

##### on and emit

```js

import emitter from './emitter.js'

emitter.on('anyone', (...item) => { console.log(item) }) // -> ['foo']/['foo', 'bar']
emitter.emit('anyone', 'foo')
emitter.emit('anyone', 'foo', 'bar')

// number
emitter.on(1, () => {})
// symbol
const foo = Symbol('foo')
emitter.on(foo, (item) => { console.log(item) }) // -> foo
emitter.emit(foo, 'foo')
```

##### once

```js
import emitter from './emitter.js'
// remove auto after emit
emitter.once('foo')
```

##### off

```js
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