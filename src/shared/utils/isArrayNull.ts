export const isArrayNull = (v: unknown) => {
  if (Array.isArray(v)) {
    return v;
  }
  return [];
};
