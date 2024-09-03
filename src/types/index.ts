export interface BuildProxyParams{
    path: string
    target: object
    newValue: any
    previousValue: any
}

export interface BuildProxyConfig{
    level?: number
    filter?(payload: Pick<BuildProxyParams, 'path' | 'target'> & {value: any}): boolean
}

export interface UseReactiveObjectConfig extends BuildProxyConfig{
    intercept?: (reRender: () => void, payload: BuildProxyParams) => void   
}