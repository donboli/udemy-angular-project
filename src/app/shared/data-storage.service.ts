import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    return this.store.select('auth')
      .switchMap((authState: fromAuth.State) => {
        return this.http.put('https://ng-recipe-book-8d434.firebaseio.com/recipes.json?auth='
        + authState.token, this.recipeService.getRecipes());
      });
  }

  getRecipes() {
    this.store.select('auth')
      .switchMap((authState: fromAuth.State) => {
        return this.http.get('https://ng-recipe-book-8d434.firebaseio.com/recipes.json?auth=' + authState.token)
        .map(
          (response: Response) => {
            const recipes: Recipe[] = response.json();
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        );
      })
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        err => console.log(err)
      );
  }
}
