import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-8d434.firebaseio.com/recipes.json?auth='
      + this.authService.getToken(), this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-8d434.firebaseio.com/recipes.json?auth=' + this.authService.getToken())
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
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        err => console.log(err)
      );
  }
}
