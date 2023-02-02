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
  localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
}

// Adds a new ingredient to local storage.
// Param: string ingredient -- the ingredient to add
// Returns: nothing
function addNewIngredient(ingredient) {
  let ingredients = getIngredientsFromStorage();

  if (ingredients.includes(ingredient)) {
    return;
  }

  ingredients.push(ingredient);
  saveIngredientsToStorage(ingredients);
}

// Creates a DOM element for an ingredient.
// Param: string ingredient -- the ingredient to create an element for
// Returns: an li element for the ingredient
function createIngredientElement(ingredient) {
  const ingredientEl = document.createElement("li");
  ingredientEl.classList.add("list-group-item");
  ingredientEl.dataset.name = ingredient;
  ingredientEl.textContent = ingredient;

  return ingredientEl;
}

// Write the ingredients in local storage to the DOM.
// Param: string[] ingredients -- an array containing the ingredients
// Returns: nothing
function writeIngredientsToDOM(ingredients) {
  const ingredientsEl = document.getElementById("ingredients");

  ingredients.forEach(ingredient => {
    ingredientsEl.append(createIngredientElement(ingredient))
  });
}

// Handles the add ingredient form submit.
// Param: SubmitEvent event -- the event object
// Returns: nothing
function addIngredientFomSubmit(event) {
  event.preventDefault();

  const ingredientEl = document.getElementById("new-ingredient");
  const ingredient = ingredientEl.value.trim();

  if (!ingredient) {
    return;
  }

  addNewIngredient(ingredient);
  ingredientEl.value = "";

  document.getElementById("ingredients").append(createIngredientElement(ingredient));
}

document.getElementById("add-ingredient-form").addEventListener("submit", addIngredientFomSubmit);
writeIngredientsToDOM(getIngredientsFromStorage());

/* HTML for the code as it is.
<form id="add-ingredient-form">
    <input type="text" name="ingredient" id="new-ingredient">
    <button type="submit">Add ingredient</button>
</form>

<ul id="ingredients" class="list-group"></ul>
*/