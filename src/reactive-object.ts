export default abstract class ReactiveObject<T>{
    protected onProxy(instance: T) {
      for (const property of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
        if (typeof this[property] === 'function' && property !== 'constructor') {
          this[property] = this[property].bind(instance);
        }
      }
    }
  }