type EmptyStrings<T> = {
  [K in keyof T]: string;
};

export const objectNotNull = <T>(v: T | undefined): T => {
  if (!v) {
    const emptyObject = {} as EmptyStrings<T>;
    for (const key in v) {
      emptyObject[key as keyof T] = '';
    }

    return emptyObject as T;
  }
  return v;
};
