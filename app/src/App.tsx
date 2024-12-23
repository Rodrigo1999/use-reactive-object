import { useReducer } from 'react'
import useReactiveObject from 'use-reactive-object'
import { MyComponentCart, MyComponentCart2 } from './cart.exemplo'
import { MyComponentCounter } from './counter.example'

class Bar {
  constructor() {
    Object.freeze(this)
  }
  hello = 'world'

  computed() {
    return this.hello + ': mundo'
  }
}

class Foo {
  bar: Bar
  constructor() {
    this.bar = new Bar()
    Object.freeze(this)
  }
  hello = 'world'

  computed() {
    return this.hello + ': mundo'
  }
}

abstract class Utils {
  protected onProxy(instance: ReactCount) {
    console.log('nois')

    let proto = Object.getPrototypeOf(this);
    while (proto && proto !== Object.prototype) {
      console.log(proto)
      for (const property of Object.getOwnPropertyNames(proto)) {
        const descriptor = Object.getOwnPropertyDescriptor(proto, property);

        if (
          descriptor &&
          typeof descriptor.value === 'function' &&
          property !== 'constructor'
        ) {
          this[property] = this[property].bind(instance);
        }
      }
      proto = Object.getPrototypeOf(proto); // Move para o próximo protótipo na cadeia
    }
  }
}

class ReactCountParent extends Utils {
  click() {
    console.log(this)
  }
}
class ReactCount extends ReactCountParent {
  count = 0
  count2 = 0
  date = new Date()

  pol = {
    casa: 0,
    vol: [1, 2]
  }

  foo = new Foo()

  get lb() {
    console.log('-----oi-----')
    return 1
  }

  increase() {

    this.date.setFullYear(2028)
    if (this.pol.casa == 10) {
      this.pol.casa = 10
      /* this.pol = {
        casa: 1,
        vol: []
      } */
    } else {
      this.pol.casa++
    }
    if (this.pol.vol.length < 15) {
      this.pol.vol.push(this.pol.casa)
    }
    if (this.count === 5) {
      return this.count = 5
    }
    this.count++
  }

  /* protected onProxy(instance: ReactCount) {
    console.log('oi')
    for (const property of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof this[property] === 'function' && property !== 'constructor') {
        this[property] = this[property].bind(instance);
      }
    }
  } */
}

function View() {
  const reactCount = useReactiveObject(() => new ReactCount())

  console.log('renderizou')
  return (
    <>
      <MyComponentCart />
      <hr />
      <MyComponentCart2 />
      <hr />
      <MyComponentCounter />
      <hr />

      <h1>Vite + React + {Math.random()}</h1>
      <div className="card">
        <button onClick={reactCount.click}>
          count is {reactCount.count} - {reactCount.pol.casa} - {reactCount.pol.vol.length} - {reactCount.foo.computed()} - {reactCount.date.getFullYear()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
function App() {

  const [view, toggleShow] = useReducer(state => !state, true)
  return (
    <div>
      <button onClick={toggleShow}>Visualizar</button>
      {view && <View />}
    </div>
  )

}

export default App
