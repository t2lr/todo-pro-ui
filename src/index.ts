export function handleFormValue<T extends Record<string, string>>(
  data: T[],
  value: string
): T {
  const [title, id] = value.split('=');
  return data.find((item) => item.id === id && item.title === title) as T;
}
