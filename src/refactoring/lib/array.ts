export function removedItemByIndex<T>(propsArray: T[], removalIndex: number): T[] {
  return propsArray.filter((_, index) => index !== removalIndex);
}

export function filteredItemById<T extends { id: string }>(propsArray: T[], id: string): T[] {
  return propsArray.filter((item) => item.id !== id);
}

export function findItemById<T extends { id: string }>(propsArray: T[], id: string): T | undefined {
  return propsArray.find((item) => item.id === id);
}
