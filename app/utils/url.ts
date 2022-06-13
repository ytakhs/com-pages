export const removeTralingSlash = (value: string): string => {
  return value.endsWith('/') ? value.slice(0, -1) : value;
};
