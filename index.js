const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const APP_ID = "753e732f";
const APP_key_recipe = "919bc78d8050b9b0caf8f5423c444aa1";

// https://api.edamam.com/api/nutrition-data?ingr=pizza&app_id=${APP_ID}&app_key=${APP_key_nutrition}&to=10

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI(searchQuery);
});

async function fetchAPI(searchQuery) {
  const baseRecipeURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key_recipe}&to=10&type=public`;
  const response = await fetch(baseRecipeURL);
  console.log(response);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `  <div class="item">
        <img src="${result.recipe.image}" alt="">
       </div>
       <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          
          <a class="view-button" href="${
            result.recipe.url
          }"target="_blank">View Recipe</a>
          <a class="view-button" href="#">Relative Video</a>

       </div>
       <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
       <p class="title">${
         result.recipe.dietLabels.length > 0
           ? result.recipe.dietLabels
           : "No Data Found"
       }</p> 
          <p class="title">${result.recipe.healthLabels}</p> 
       
       `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
