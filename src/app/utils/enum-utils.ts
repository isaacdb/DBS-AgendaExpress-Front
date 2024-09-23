export function getEnumKeyByValue<T>(enumObj: T, value: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => enumObj[key as any] === value);
    return keys.length > 0 ? keys[0] : undefined;
}

export function stringToEnum<T>(enumObj: T, value: string): T[keyof T] | undefined {
    const key = Object.keys(enumObj).find(k => k === value);
    return key ? enumObj[key as keyof T] : undefined;
}