import React from 'react';
import useReactiveObject from 'use-reactive-object';

class Cart{
    items: any[] = []

    addItem(name: string, amount: number){
      this.items.push({
          name,
          amount
      })
    }

    getTotal(){
      return this.items.reduce((n, item) => item.amount + n, 0)
    }

    getSize(){
      return this.items.length
    }
}

export function MyComponentCart() {
  const cart = useReactiveObject(() => new Cart(), {
    filter(payload) {
      return !Array.isArray(payload.value)
    }
  });

  return (
    <div>
      <p>No reactive: {cart.getSize()}</p>
      <p>reactive: {cart.getTotal()}</p>
      <button onClick={() => cart.addItem(`product ${Math.random()}`, 10)}>Add Item</button>
    </div>
  );
}

export function MyComponentCart2() {
  const counter = useReactiveObject({
    count: 0,
    increment(){
      this.count++
    }
  }, {
    intercept(reRender, payload) {
      setTimeout(() => reRender(), 2000)
    }
  });

  return (
    <div>
      <p>Count is: {counter.count}</p>
      <button onClick={() => counter.increment()}>Increment</button>
    </div>
  );
}