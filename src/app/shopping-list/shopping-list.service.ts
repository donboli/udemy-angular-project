import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';

@Injectable()
export class ShoppingListService {
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor(
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.store.dispatch(new ShoppingListActions.UpdateIngredient({
      index: index,
      ingredient: newIngredient
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
