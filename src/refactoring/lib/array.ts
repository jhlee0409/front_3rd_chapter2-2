export function removedItemByIndex<T>(propsArray: T[], removalIndex: number): T[] {
  return propsArray.filter((_, index) => index !== removalIndex);
}
