export default function isPrimitive(value: unknown): boolean {
    return (
        value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol' ||
        typeof value === 'undefined' ||
        typeof value === 'bigint'
    );
}