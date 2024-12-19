import { BuildProxyConfig, BuildProxyParams } from "./types";
import isNativeObject from "./utils/isNativeObject";
import isObject from "./utils/isObject";

export default function buildProxy<T extends object>(
    instance: T,
    callback: (payload: BuildProxyParams) => void,
    config?: BuildProxyConfig,
    tree = [] as (string | symbol)[]
) {
    const getPath = (prop: string | symbol) => tree.concat(prop).join(".");
    const proxiesMemo = new WeakMap()

    let ocurrencyLevel = 0
    const proxy = new Proxy(instance, {
        set(target, property, value) {

            const path = getPath(property)
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
            
            if (typeof value === 'function' && isNativeObject(target)) {
                return value.bind(target);
            }

            if(!isObject(value) || Object.isFrozen(value)) return value
            
            const currentProxy = proxiesMemo.get(value)
            if (currentProxy) return currentProxy
            

            const path = getPath(property)

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

    if(proxy['onProxy'] && typeof proxy['onProxy'] === 'function') proxy['onProxy'](proxy);

    return proxy
}