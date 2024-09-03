import { useReducer, useRef } from "react";
import buildProxy from "./buildProxy";
import { UseReactiveObjectConfig } from "./types";

function useReactiveObject<T extends object>(instance: () => T, config?: UseReactiveObjectConfig): T;
function useReactiveObject<T extends object>(instance: T, config?: UseReactiveObjectConfig): T;
function useReactiveObject<T extends object>(instance: T | (() => T), config?: UseReactiveObjectConfig): T {
    const [, reRender] = useReducer(() => Math.random(), 0);

    const referencesObject = useRef<Map<string, any>>()

    const proxy = useRef<T>()
    if (!proxy.current) {

        referencesObject.current = new Map()
        const instanceExec = typeof instance === 'function' ? instance() : instance

        proxy.current = buildProxy(instanceExec, (payload) => {

            if(referencesObject.current!.get(payload.path) === payload.newValue) return;

            if (config?.intercept) {
                config.intercept(() => reRender(), payload)
            } else {
                reRender()
            }
            
            referencesObject.current!.set(payload.path, payload.newValue)

        }, config)
    }

    return proxy.current
}

export default useReactiveObject