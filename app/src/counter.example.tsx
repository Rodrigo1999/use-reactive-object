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