export default abstract class ReactiveObject<T> {
  protected onProxy(instance: T) {
    let proto = Object.getPrototypeOf(this);
    while (proto && proto !== Object.prototype) {
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