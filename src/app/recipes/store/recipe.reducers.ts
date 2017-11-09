import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'This is a test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'Another test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ]
};


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ]
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.slice(0, action.payload.index),
          action.payload.updatedRecipe,
          ...state.recipes.slice(action.payload.index + 1)
        ]
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.slice(0, action.payload),
          ...state.recipes.slice(action.payload + 1)
        ]
      };
    default:
      return state;
  }
}
