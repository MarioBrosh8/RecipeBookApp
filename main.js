const API_KEY = "32af856bb8bb484c99f501ac8b01c7ec"
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes){
    recipeListEl.innerHTML = ""
    recipes.forEach((recipe) => { //The below code will execute for each recipe element. The elements are being pulled from the API on line 25
        let recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item"); //This adds the recipe-item css class to the li item

        let recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image; //This appends the image source pulled from the api and overwrites it to the img src existing value
        recipeImageEl.alt = "recipe image"; //This creates and adds the alt text for when the image is not available / accesibility

        let recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;
        
        let recipeIngredients = document.createElement("p");
        recipeIngredients.innerText = recipe.extendedIngredients.map((el)=> el.original).join(', ');

        let recipeLink = document.createElement("a");
        recipeLink.href = recipe.sourceUrl;
        recipeLink.innerText = "View Recipe";
        recipeLink.target = "blank_"
        
        recipeItemEl.appendChild(recipeImageEl); //This add the Image inside the li item
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredients);
        recipeItemEl.appendChild(recipeLink);
        recipeListEl.appendChild(recipeItemEl); //This add the Item Element with the image appended to the empty recipeListEl
    }); 

}

async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)

    const data = await response.json()

    return data.recipes

}


async function init(){
    const recipes = await getRecipes()
    displayRecipes(recipes);
}

init();
