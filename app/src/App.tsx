import { useReducer } from 'react'
import useReactiveObject from 'use-reactive-object'
import './App.css'
import reactLogo from './assets/react.svg'
import { MyComponentCart, MyComponentCart2 } from './cart.exemplo'
import { MyComponentCounter } from './counter.example'
import viteLogo from '/vite.svg'

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
