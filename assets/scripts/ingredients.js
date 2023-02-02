const INGREDIENTS_KEY = "ingredients";
var storageIngredients;

/**
 * Get the ingredients from local storage.
 * @returns {Array} An array of the saved ingredients.
 */
function getIngredients() {
  return storageIngredients ?? JSON.parse(localStorage.getItem(INGREDIENTS_KEY)) ?? [];
}

/**
 * Saves the ingredients to local storage.
 * @param {Array} ingredients An array of ingredients to save.
 */
function saveIngredients(ingredients) {
  localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(ingredients));
}

/**
 * Adds a new ingredient and saves to local storage. Will not save the ingredient if it is already in the list.
 * @param {string} ingredient The ingredient to save.
 */
function addIngredient(ingredient) {
  const ingredients = getIngredients();

  if (ingredients.includes(ingredient)) {
    return;
  }

  ingredients.push(ingredient);
  saveIngredients(ingredients);
}

/**
 * Removes an ingredient from local storage.
 * @param {string} ingredient The ingredient to remove.
 */
function removeIngredient(ingredient) {
  const ingredients = getIngredients();
  const index = ingredients.indexOf(ingredient);

  if (index < 0) {
    return;
  }
  
  ingredients.splice(index, 1);
  saveIngredients(ingredients);
}

/**
 * Creates a DOM element for an ingredient.
 * @param {string} ingredient The ingredient to create the element for.
 * @returns {Element} Returns an <li> element for the ingredient.
 */
function createIngredientElement(ingredient) {
  const ingredientEl = document.createElement("li");
  ingredientEl.classList.add("list-group-item");
  ingredientEl.dataset.name = ingredient;
  ingredientEl.textContent = ingredient;

  const buttonEl = document.createElement("button");
  buttonEl.textContent = "Delete";

  ingredientEl.append(buttonEl);

  return ingredientEl;
}

/**
 * Writes the specified ingredients to the DOM.
 * @param {Array} ingredients An array of ingredients.
 */
function writeIngredientsToDOM(ingredients) {
  const ingredientsEl = document.getElementById("ingredients");

  ingredients.forEach(ingredient => {
    ingredientsEl.append(createIngredientElement(ingredient))
  });
}

/**
 * Handles the add ingredient form submit event.
 * @param {SubmitEvent} event The submit event.
 */
function addIngredientFormSubmit(event) {
  event.preventDefault();

  const ingredientEl = document.getElementById("new-ingredient");
  const ingredient = ingredientEl.value.trim();

  if (!ingredient) {
    return;
  }

  addIngredient(ingredient);
  ingredientEl.value = "";

  document.getElementById("ingredients").append(createIngredientElement(ingredient));
}

/**
 * Handles the ingredient remove event.
 * @param {MouseEvent} event The click event. 
 */
function removeIngredientClick(event) {
  const target = event.target;

  if(!target.matches("button")) {
    return;
  }

  const parent = target.parentElement;
  const ingredient = parent.dataset.name;
  parent.remove();
  removeIngredient(ingredient);
}

document.getElementById("add-ingredient-form").addEventListener("submit", addIngredientFormSubmit);
document.getElementById("ingredients").addEventListener("click", removeIngredientClick);
writeIngredientsToDOM(getIngredients());

/* HTML for the code as it is.
<form id="add-ingredient-form">
    <input type="text" name="ingredient" id="new-ingredient">
    <button type="submit">Add ingredient</button>
</form>

<ul id="ingredients" class="list-group"></ul>
*/