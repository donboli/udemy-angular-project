import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(() => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-8d434.firebaseio.com/recipes.json');
    })
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
    recipeStore = this.actions
      .ofType(RecipeActions.STORE_RECIPES)
      .combineLatest(
        this.store.select('auth'),
        this.store.select('recipes')
      )
      .switchMap(([action, authState, recipesState]) => {
        return this.httpClient.put('https://ng-recipe-book-8d434.firebaseio.com/recipes.json', recipesState.recipes);
      });


  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) { }
}
