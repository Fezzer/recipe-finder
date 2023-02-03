// Declare HTML constant
const row4EL = $('#row_4');

// Declare variable that will be used to store list of user-typed ingredients
var ingredients = ["pepper", "egg", "rice"];
var apiKey = "37fe5fc3489647159a3bb09addfd0c09"

// This is where the Title and Image for the recipe will be printed
const recipe = $('#api-test');



// Function to build the API URL and fetch data from the API
function getRecipes() {
    // Take user choices and convert to a string suibtable for the API URL
    var userIngredients = ingredients.join(",+");
  
    // Define and build API URL to be called
    var ingredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ranking=1&ingredients=" + userIngredients + "&number=6";

    // Run API fetch and return data into response
    $.ajax ({

        url: ingredientsURL,
        method: "GET"

    }).then(function(response) {

    // Trigger HTML printing function - response is fed through
    displayRecipe(response);
    console.log(response);
    });
};

// Function to display Title & Image
function displayRecipe(api) {

    for(var i = 0; i < api.length; i++) {

    // This will be the TITLE inside the image
    var cardTitle = $('<h5>')
    .addClass("card-title")
    .text(api[i].title);

    // This will be the image
    var image = $('<img>').attr("src",api[i].image);

    var cardDiv = $('<div>').addClass("card");
    var cardBody = $('<div>').addClass("card-body");
    var cardButton = $('<a>').attr("href", "#").addClass("btn btn-primary").text("View Recipe");

    // Append all HTML
    row4EL.append(cardDiv)
    cardDiv.append(image)
    cardDiv.append(cardBody)
    cardBody.append(cardTitle)
    cardBody.append(cardButton )
    };
};