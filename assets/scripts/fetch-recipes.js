// Declare HTML constant
const row4EL = $('#row_4');

var apiKey = "37fe5fc3489647159a3bb09addfd0c09"
var recipes = []; // Cache of the recipes returned by the API request.

// This is where the Title and Image for the recipe will be printed
const recipe = $('#api-test');



// Function to build the API URL and fetch data from the API
function getRecipes() {
    console.log("Click");
    // Take user choices and convert to a string suibtable for the API URL
    var userIngredients = getIngredients().join(",+");
  
    // Define and build API URL to be called
    var ingredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ranking=1&ingredients=" + userIngredients + "&number=6";

    // Run API fetch and return data into response
    $.ajax ({

        url: ingredientsURL,
        method: "GET"

    }).then(function(response) {

    // Cache the response as this data will be needed when displaying the modal.
    recipes = response;

    // Trigger HTML printing function - response is fed through
    displayRecipe(response);
    console.log(response);
    });
};

// Function to display Title & Image
function displayRecipe(api) {

    row4EL.empty();

    for(var i = 0; i < api.length; i++) {

        // This will be the TITLE inside the image
        var cardTitle = $('<h5>')
            .addClass("card-title")
            .text(api[i].title);

        // This will be the image
        var image = $('<img>').attr("src",api[i].image);

        var cardDiv = $('<div>')
            .addClass("card");

        var cardBody = $('<div>')
            .addClass("card-body");

        var cardButton = $('<a>')
            .attr("href", "#")
            .attr("data-index", i)
            .addClass("btn btn-primary").text("View Recipe");

        // Append all HTML
        row4EL.append(cardDiv);
        cardDiv.append(image);
        cardDiv.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardButton);
    };
};

// On Click event listener for the search button

$('#search-button').click(getRecipes);