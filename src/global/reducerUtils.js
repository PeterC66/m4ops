// Reusable utility functions from https://redux.js.org/recipes/structuringreducers/refactoringreducersexample
// See their use in https://redux.js.org/recipes/structuringreducers/refactoringreducersexample

export function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

export function updateItemInArray(
  array,
  itemId,
  updateItemCallback,
  allowInsert = false,
) {
  let hasBeenUsed = false;
  const updatedItems = array.map((item, index) => {
    if (index !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    hasBeenUsed = true;
    return updatedItem;
  });
  if (allowInsert && !hasBeenUsed) {
    updatedItems[itemId] = updateItemCallback();
  }
  //  console.log('updateItemInArray', array, itemId, updatedItems);
  return updatedItems;
}
