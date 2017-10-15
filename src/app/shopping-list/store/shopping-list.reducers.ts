import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload.index),
          { ...action.payload.ingredient },
          ...state.ingredients.slice(action.payload.index + 1)
        ]
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const newIngredients = [...state.ingredients];
      newIngredients.splice(action.payload, 1);

      return {
        ...state,
        ingredients: newIngredients
      };
    default:
      return state;
  }
}
