const INGREDIENTS_KEY = "ingredients";

// Get the ingredients from local storage.
// Returns: string[]
function getIngredientsFromStorage() {
  return JSON.parse(localStorage.getItem(INGREDIENTS_KEY)) ?? [];
}

// Saves the ingredients to local storage.
// Param: string[] ingredients
// Returns: nothing
function saveIngredientsToStorage(ingredients) {
  localStorage.setItem(INGREDIENTS_KEY, JSON.parse(ingredients));
}

// Adds a new ingredient to local storage.
// Param: string ingredient // the ingredient to add
// Returns: nothing
function addNewIngredient(ingredient) {
  let ingredients = getIngredientsFromStorage();

  if (ingredients.includes(ingredient)) {
    return;
  }

  ingredients.push(ingredient);
  saveIngredientsToStorage(ingredients);
}