export default abstract class ReactiveObject<T>{
    protected onProxy(instance: T) {
      const proto = Object.getPrototypeOf(this);
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
    }
  }