const riApiKey = "e25de7d1626a4a1492e9ee40f72a47d7";

async function getRecipeInstructions(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${riApiKey}`;
  const response = await fetch(url);
  
  return response.json;
}

function populateModal(data) {
  console.log(data);
}

document.getElementById("row_4").addEventListener("click", async event => {
  const target = event.target;

  if (!target.matches("a")) {
    return
  }

  const data = await getRecipeInstructions()
  populateModal(data);

  $("#staticBackdrop").modal("show");
})