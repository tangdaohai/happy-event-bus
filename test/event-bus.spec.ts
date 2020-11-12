import Emitter from '../src/index'

describe('event bus', () => {
  let emitter = new Emitter()
  // beforeEach(() => {
  //   emitter = new Emitter()
  // })
  it('on and emit', () => {
    const fn = jest.fn()
    emitter.on('event', fn)
    emitter.emit('event')
    expect(fn).toHaveBeenCalled()
  })

  it('event name type', () => {
    const number_cb_fn = jest.fn()
    const symbol_cb_fn = jest.fn()
    const numberEventType = 123
    const symbolEVentType = Symbol('symbol test')

    // on
    emitter.on(numberEventType, number_cb_fn)
    emitter.on(symbolEVentType, symbol_cb_fn)

    // emit
    emitter.emit(numberEventType)
    emitter.emit(symbolEVentType)

    expect(number_cb_fn).toHaveBeenCalled()
    expect(symbol_cb_fn).toHaveBeenCalled()
  })

  it('arguments', () => {
    const args = [1, 'a', { foo: 'bar' }]
    let temp

    emitter.on('arguments', (...argument) => {
      temp = argument
    })

    emitter.emit('arguments', ...args)

    expect(temp).toEqual(args)
  })

  it('off', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const eventType = Symbol('off test')

    emitter.on(eventType, fn1)
    emitter.on(eventType, fn2)
    emitter.emit(eventType)

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)

    // off fn1
    emitter.off(eventType, fn1)
    // emit again
    emitter.emit(eventType)

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(2)

    // off eventType Symbol
    emitter.off(eventType)
    // emit again
    emitter.emit(eventType)

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(2)

    const fn3 = jest.fn()
    emitter.on(eventType, fn3)
    emitter.emit(eventType)
    expect(fn3).toHaveBeenCalledTimes(1)

    // off all
    emitter.off()
    // emit again
    emitter.emit(eventType)

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(2)
    expect(fn3).toHaveBeenCalledTimes(1)
  })

  it('once', () => {
    const fn = jest.fn()
    const eventType = 'once test'
    emitter.once(eventType, fn)
    emitter.emit(eventType)
    // again
    emitter.emit(eventType)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('async', async () => {
    const fn = jest.fn()
    const eventType = 'async test'
    emitter.on(eventType, fn)
    await new Promise(r => setTimeout(r, 1))
    emitter.emit(eventType)

    expect(fn).toHaveBeenCalled()
  })


  it('the returned function can be off', () => {
    const foo = jest.fn()
    const fooListenStopHandle = emitter.on('foo', foo)
    emitter.emit('foo')
    expect(foo).toHaveBeenCalledTimes(1)
    // off foo
    fooListenStopHandle()
    emitter.emit('foo')
    expect(foo).toHaveBeenCalledTimes(1)

    const bar = jest.fn()
    const barListenStopHandle = emitter.once('bar', bar)
    // off bar
    barListenStopHandle()
    emitter.emit('bar')
    expect(bar).toHaveBeenCalledTimes(0)
  })
})