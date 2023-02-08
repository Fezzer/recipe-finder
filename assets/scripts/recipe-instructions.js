const riApiKey = "e25de7d1626a4a1492e9ee40f72a47d7";

/**
 * Gets the instructions for a specified recipe.
 * @param {number} recipeId The ID of the recipe.
 * @returns {Promise} Returns a promise of the JSON returned from the analysed instructions endpoint.
 */
async function getRecipeInstructions(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${riApiKey}`;
  const response = await fetch(url);
  
  return response.json();
}

/**
 * Displays the ingredients on the recipe modal.
 * @param {object} ingredients The ingredients to show on the recipe modal.
 */
function addIngredients(ingredients) {
  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.textContent = "";

  ingredients.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e.ingredient;
    
    if (e.isMissing) {
      li.classList.add("missing");
    };

    ingredientsList.append(li);
  });
}

/**
 * Displays the instructions on the recipe modal.
 * @param {object} instructions The instructions to show on the recipe modal.
 */
function addInstructions(instructions) {
  const instructionsContainer = document.getElementById("instructions");
  instructionsContainer.textContent = "";

  instructions.steps.forEach(e => {
    const container = document.createElement("div");
    container.classList.add("recipe-steps", "col-12");

    const h3 = document.createElement("h3");
    h3.textContent = `Step ${e.number}`;
    h3.style = "color: black; text-align: left;";

    const p = document.createElement("p");
    p.classList.add("recipe-steps");
    p.textContent = e.step;

    container.append(h3, p);
    instructionsContainer.append(container);
  });
}

/**
 * Populate the recipe modal with the supplied recipe and instructions.
 * @param {object} recipe The recipe to populate on the recipe modal.
 * @param {promise} instructionsPromise A promise of the instructions to populate on the recipe modal.
 */
async function populateModal(recipe, instructionsPromise) {
  document.getElementById("staticBackdropLabel").textContent = recipe.title;

  const ingredients = recipe.missedIngredients.map(e => ({ingredient: e.original, isMissing: true}))
    .concat(recipe.usedIngredients.map(e => ({ingredient: e.original})));

  addIngredients(ingredients);

  const image = document.getElementById("recipe-image");
  image.setAttribute("src", recipe.image);
  image.setAttribute("alt", recipe.title);

  const instructions = await instructionsPromise;
  console.log(instructions);
  addInstructions(instructions[0]);
}

/**
 * Handles the click event of a recipe button.
 * @param {MouseEvent} event The click event.
 * @returns {promise}
 */
async function recipeClick (event) {
  const target = event.target;

  if (!target.matches("a")) {
    return
  }

  const recipeIndex = target.dataset.index;
  const recipe = recipes[recipeIndex];

  await populateModal(recipe, getRecipeInstructions(recipe.id));

  $("#staticBackdrop").modal("show");
}

document.getElementById("row_4").addEventListener("click", recipeClick);