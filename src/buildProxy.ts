import { BuildProxyConfig, BuildProxyParams } from "./types";
import isObject from "./utils/isObject";
import isPrimitive from "./utils/isPrimitive";

export default function buildProxy<T extends object>(
    instance: T,
    callback: (payload: BuildProxyParams) => void,
    config?: BuildProxyConfig,
    tree = [] as (string | symbol)[]
) {
    const getPath = (prop: string | symbol) => tree.concat(prop).join(".");
    const proxiesMemo = new WeakMap()

    let path = ''
    let ocurrencyLevel = 0
    return new Proxy(instance, {
        set(target, property, value) {

            path = path || getPath(property)
            callback({
                path,
                target,
                newValue: value,
                previousValue: Reflect.get(target, property, value),
            });

            return Reflect.set(target, property, value);
        },

        get(target, property, receiver) {

            const value = Reflect.get(target, property, receiver);
            
            if(!isObject(value) || Object.isFrozen(value)) return value

            const currentProxy = proxiesMemo.get(value)
            if (currentProxy) return currentProxy

            path = path || getPath(property)

            if(config){
                if (config.level) {
                    ocurrencyLevel = ocurrencyLevel || (path.match(/\./g) || []).length + 1
                    if (ocurrencyLevel === config.level) return value
                }

                const filter = config.filter?.({
                    path,
                    target,
                    value
                }) ?? true
    
                if(!filter) return value;
            }
            
            const proxy = buildProxy(value, callback, config, tree.concat(property));
            proxiesMemo.set(value, proxy)

            return proxy
        },
    });
}