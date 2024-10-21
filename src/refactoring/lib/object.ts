export function createUpdatedObject<T>(object: T, updates: Partial<T>): T {
  return { ...object, ...updates };
}
