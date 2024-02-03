const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".submitBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-buttton");


//open recipe function

const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class ="recipeName"> ${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class ="ingredientList" >${fetchingIngredients(meal)}<ul>
    <div class ="recipeInstructions">
       <h3>Instructions</h3>
       <p >${meal.strInstructions}</p>
     </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
    
}

//fetch recipe ingredients
const fetchingIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];

        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return  ingredientsList;

}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";
})






const fetchRecipes = async (query)=>{
    try{
    recipeContainer.innerHTML="<h2>Fetching Recipes......</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src = "${meal.strMealThumb} ">
        <h3> ${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p> Belong to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement("button");

        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })


        recipeContainer.appendChild(recipeDiv);
    }
   
     )
}
catch(error){
    recipeContainer.innerHTML= "<span >Recipe Not Found? 😥</span>";
    // recipeContainer.innerHTML="😥";
} 
}


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const  query = searchBox.value.trim();
    fetchRecipes(query);

    // confirm("Button Clicked");

})