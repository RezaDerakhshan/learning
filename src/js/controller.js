import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult('pizza');
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

// controlRecipes();
// controlRecipes();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
