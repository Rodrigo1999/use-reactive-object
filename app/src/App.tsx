import { useReducer } from 'react'
import useReactiveObject from 'use-reactive-object'
import { MyComponentCart, MyComponentCart2 } from './cart.exemplo'
import { MyComponentCounter } from './counter.example'

class Bar{
  constructor(){
    Object.freeze(this)
  }
  hello = 'world'

  computed(){
    return this.hello + ': mundo'
  }
}

class Foo{
  bar: Bar
  constructor(){
    this.bar = new Bar()
    Object.freeze(this)
  }
  hello = 'world'

  computed(){
    return this.hello + ': mundo'
  }
}
class ReactCount {
  count = 0
  count2 = 0

  pol = {
    casa: 0,
    vol: [1, 2]
  }
  
  foo = new Foo()
  increase() {

    if (this.pol.casa == 10) {
      this.pol.casa = 10
      /* this.pol = {
        casa: 1,
        vol: []
      } */
    } else {
      this.pol.casa++
    }
    if(this.pol.vol.length < 15){
      this.pol.vol.push(this.pol.casa)
    }
    if (this.count === 5) {
      return this.count = 5
    }
    this.count++
  }
}

function View() {
  const reactCount = useReactiveObject(() => new ReactCount())

  console.log('renderizou')
  return (
    <>
      <MyComponentCart/>
      <hr />
      <MyComponentCart2/>
      <hr />
      <MyComponentCounter/>
      <hr />
      
      <h1>Vite + React + {Math.random()}</h1>
      <div className="card">
        <button onClick={() => reactCount.increase()}>
          count is {reactCount.count} - {reactCount.pol.casa} - {reactCount.pol.vol.length} - {reactCount.foo.computed()}
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
