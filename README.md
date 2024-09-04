# use-reactive-object

A lightweight React hook for creating reactive proxy objects that automatically trigger re-renders when properties change.

## Installation

To install the package, run:

```bash
yarn add use-reactive-object
# or
pnpm add use-reactive-object
# or
npm install use-reactive-object
```

## Usage

`useReactiveObject` allows you to create reactive objects in React components. When properties on the object are modified, the component automatically re-renders.

### Exemple

```tsx
import React from 'react';
import useReactiveObject from 'use-reactive-object';

class Counter{
    count = 0

    increase(){
        this.count++
    }
    decrease(){
        this.count--
    }
}

function MyComponent() {
  const counter = useReactiveObject(() => new Counter());

  return (
    <div>
      <p>Count is: {counter.count}</p>
      <button onClick={() => counter.increase()}>Increase</button>
      <button onClick={() => counter.decrease()}>Decrease</button>
    </div>
  );
}

export default MyComponent;

```

Working with the approach described in the example provides several beneficial benefits when developing React components. Here is a detailed description of these benefits:

### 1. Encapsulation of State Logic

* Through the Counter class, the logic for manipulating the state (count) is completely encapsulated. Methods such as increase and decrease are responsible for changing the state in a controlled manner. This promotes an object-oriented design, where state-related behavior is grouped within a cohesive entity. This organization makes the code easier to understand and maintain, in addition to favoring reuse in other components.

### 2. Automatic Reactivity

* By using useReactiveObject, reactivity is introduced automatically. Any modification to the properties of the Counter object (in this case, count) results in a re-rendering of the React component. This functionality is achieved without the need to explicitly configure useState or useEffect to track and respond to state changes, considerably simplifying the implementation of complex reactive states.

### 3. Simplifying the State Handling Interface

* Instead of exposing individual states and functions to manipulate them via useState, the entire state handling interface is simplified and centralized within the Counter class. This means that the React component interacts with an object that already has all the methods needed to change the state, resulting in cleaner, more readable code. There is no need for multiple hook calls or setting up side effects, which reduces complexity and the potential for errors.

### 4. Maintaining Immutability

* While the Counter’s internal state is mutable, reactivity and UI updates are managed immutably. useReactiveObject creates a proxy around the original object, intercepting changes and ensuring that reactivity is controlled and predictable. This approach avoids the need for techniques like Object.assign or creating new objects to force re-renders, keeping state managed effectively and efficiently.

### 5. Separation of Concerns

* Business logic (such as incrementing and decrementing a counter) is kept separate from UI concerns. The UI in the MyComponent component simply reflects the current state of the Counter object. This follows the principle of separation of concerns, where the UI and business logic are decoupled, resulting in more modular and testable code.

### 6. Ease of Creating Reusable Components

* This approach makes it easier to create reusable and extensible components. The Counter class can be reused in different components, and its behavior can be extended or modified without having to change the component that uses it. For example, one could create a subclass of Counter with additional logic and use it in place of the base class, without modifying MyComponent.

### 7. Simplified Unit Testing

* Testing logic encapsulated in a class like Counter is more straightforward and isolated compared to testing hooks directly in the React component. This allows logic to be tested independently of the UI, ensuring that functionality is correct before being integrated with React.

### 8. Reduced Cognitive Overhead

* Because state and update logic are encapsulated and reactivity is handled automatically, cognitive overhead for the developer is reduced. There is no need to worry about React implementation details like hook dependencies or manual re-render optimizations, allowing the developer to focus on business logic.

## Responsible Use of useReactiveObject

While useReactiveObject offers a powerful and convenient way to create reactive objects in React, it's important to use it responsibly to avoid performance issues and unexpected behavior.

Under the hood, most reactive frameworks use a proxy to bring their reactivity to life, a famous example being [vue.js](https://vuejs.org/). The essence of this library lies in this as well, so it is important to pay attention to important points that are also valid for the reactive frameworks widely used in the market:

### 1. Avoid Circular Objects

* Because useReactiveObject uses Proxies to control mutations and track changes to nested objects, creating circular objects (where a property of an object references the object itself or a reference cycle) can cause problems such as infinite loops or memory overflows. Make sure your data structures do not contain reference cycles to avoid these problems.

### 2. Beware of Large Collections of Objects

* Handling large collections of objects (such as arrays or objects containing many properties) with useReactiveObject can impact performance, especially when there are many read or write operations. Each operation on a nested object can trigger a series of checks and re-renders, potentially leading to slowdowns or stuttering in the UI. Consider breaking large collections into smaller, reactive chunks only when necessary, or limiting the use of reactivity to essential pieces of state.

### 3. Avoid Unnecessary Mutability

* While useReactiveObject is designed to manage state mutations, it is a good practice to minimize frequent and unnecessary changes to reactive objects. Constant changes to state can lead to excessive re-renders, which can negatively impact application performance. Instead, work with more stable states and mutate properties only when necessary.

### 4. Consider the Complexity of Nested Objects

* Proxies in nested objects can increase the complexity of state management. Each additional level of nesting involves more layers of proxies, which can introduce latency in read and write operations. Keep nested objects simple and straightforward, and consider denormalizing or flattening state where possible.

### 5. Exception Handling and Controls

* The library provides configurable controls to help manage exceptions and unexpected behavior, such as intercepting changes before a re-render occurs. Use these controls to ensure that your reactive component behaves as expected, even in complex scenarios. For example, you can intercept changes to critical properties and make decisions about whether or not a re-render should be triggered.

## API

`useReactiveObject<T>(instance: () => T, config?: UseReactiveObjectConfig): T`

- **instance**: A function returning the object you want to make reactive, or the object itself.

- **config**: (Optional) Configuration options for intercepting changes and customizing behavior.

The useReactiveObject library provides several useful settings to help manage object reactivity in a more controlled and efficient way. These settings are especially useful for avoiding problems like circular objects, excessive proxies in nested objects, and other challenges associated with using proxies. Here are the main properties you can configure:

### 1. intercept

* **Description**: Intercept is a callback function that allows you to intercept state changes before they cause a component to re-render. This function takes two parameters: reRender, which is a function that can be called to force the component to re-render, and payload, which contains details about the state change (such as the path of the changed property and the new and old values).

* **Usage**: This function is useful for implementing additional handling before the state change occurs, such as adding a debounce, logging changes, or conditioning the re-render to certain business rules. For example, you can use intercept to postpone the re-render until a series of changes have occurred, optimizing the performance of your component.


### 2. level

* **Description**: The level controls the maximum nesting depth at which proxies will be applied to objects. By default, if an object has multiple nested layers of properties, useReactiveObject will attempt to apply proxies to all of them. However, with level, you can limit how deep these proxies can go.

* **Example**:

```ts
// Level 2 object configuration
obj = {
  count: 1,
  foo: {
    bar: 'hello world',
    collection: [1,2,3]
  }
}

```
In the above example, with level set to 2, the collection property will not be converted to a proxy and therefore will not be observable. This is useful to avoid unnecessary overhead in deeply nested data structures where only properties at higher levels need to be reactive.

### 3. filter

* **Description**: filter is a function that allows you to select which properties of an object should or should not be proxy-wrapped. This function receives a payload object containing the property path, the target object, and the property value. Based on this information, you can return true or false to decide whether a given property should be reactive.

* **Usage**: Filter is useful when you want to prevent certain specific properties or types of properties from becoming reactive. For example, you might want to exclude properties that don't need to be monitored for changes, or prevent large arrays from being observable to improve performance.

## Exemplos de Uso

### Filter

```tsx
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

function MyComponent() {
  const cart = useReactiveObject(() => new Cart(), {
    filter(payload) {
      return !Array.isArray(payload.value)
    }
  });

  return (
    <div>
      <p>No reactive: {cart.getSize()}</p>
      <p>No reactive: {cart.getTotal()}</p>
      <button onClick={() => cart.addItem(`product ${Math.random()}`, 10)}>Add Item</button>
    </div>
  );
}

export default MyComponent;

```

In this example, the array that stores the cart items will not be reactive, so its properties will not be reactive either due to the applied filter.

### Intercept
```tsx
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

function MyComponent() {
  const cart = useReactiveObject(() => new Cart(), {
    intercept(reRender, payload) {
      setTimeout(() => reRender(), 2000)
    }
  });

  return (
    <div>
      <p>reactive: {cart.getTotal()}</p>
      <button onClick={() => cart.addItem(`product ${Math.random()}`, 10)}>Add Item</button>
    </div>
  );
}

export default MyComponent;

```

In this example there will be a 2 second delay for the component to re-render.

### Level
```tsx
import React from 'react';
import useReactiveObject from 'use-reactive-object';

class Counter{
    count = 0
    items: number[] = []

    increment(){
        this.count++
    }

    addRandomItem(){
        this.items.push(Math.random())
    }

    getSizeItem(){
        return this.items.length
    }
}

const counterInstance = new Counter()
export function MyComponentCounter() {

  const counter = useReactiveObject(counterInstance, {
    level: 1
  });

  return (
    <div>
      <p>No reactive: {counter.getSizeItem()}</p>
      <p>reactive: {counter.count}</p>
      <button onClick={() => counter.increment()}>Increment</button>
      <button onClick={() => counter.addRandomItem()}>Add random item</button>
    </div>
  );
}

```

Note that when adding a new item to the array, there is no reactivity, but when incrementing, the component reacts, this is because `level 1` indicates to observe changes only at the first level, that is, at the root of the object.

### Conclusion

`useReactiveObject` is a powerful tool for creating reactive objects in React, but as with any tool that manipulates state in a deep way, it should be used with care and consideration. Avoid circular objects, be cautious when working with large collections, and use the controls provided by the library to ensure that your application remains performant and maintainable.