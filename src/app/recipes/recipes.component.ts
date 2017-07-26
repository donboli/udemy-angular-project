import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  onClickRecipe(recipe: Recipe) {
    console.log(recipe);
    this.recipe = recipe;
  }
}
