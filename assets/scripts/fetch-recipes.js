// Declare variable that will be used to store list of user-typed ingredients
var ingredients = ["pepper", "egg", "rice"];
var apiKey = "37fe5fc3489647159a3bb09addfd0c09"

function getRecipes() {
    // Take user choices and convert to a string suibtable for the API URL
    var userIngredients = ingredients.join(",+");
  
    // Define and build API URL to be called
    var ingredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + userIngredients + "=6";

    // Run API fetch and return data into response
    $.ajax ({

        url: ingredientsURL,
        method: "GET"

    }).then(function(response) {

        console.log(response);

    });
};
