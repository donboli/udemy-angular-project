import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.store.select('auth');
    })
    .take(1)
    .switchMap((authState: fromAuth.State) => {
      return this.http.get('https://ng-recipe-book-8d434.firebaseio.com/recipes.json?auth=' + authState.token);
    })
    .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
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

  constructor(
    private actions: Actions,
    private http: Http,
    private store: Store<fromApp.AppState>
  ) { }
}
