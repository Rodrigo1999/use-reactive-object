export default function isNativeObject(target: any): boolean {
    return target instanceof Map ||
           target instanceof Set ||
           target instanceof WeakMap ||
           target instanceof WeakSet ||
           target instanceof Date ||
           target instanceof RegExp ||
           target instanceof ArrayBuffer ||
           target instanceof DataView ||
           ArrayBuffer.isView(target) || // Detecta arrays tipados
           target instanceof Promise ||
           target instanceof Error;
}
