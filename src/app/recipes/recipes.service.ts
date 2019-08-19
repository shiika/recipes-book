import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  @Output() onSelect: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "pasta", 
      "Macaroona w salsaa", 
      "../../assets/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg", 
      [
        new Ingredient('Tomatoes', 5),

        new Ingredient('Meatballs', 10),

        new Ingredient('Macaroona', 20)
      ]),
    new Recipe(
      "Shakshuka", 
      "Egg with tomatoes", 
      "../../assets/l_18304_StockFood-12458621-CUT.jpg", 
      [
        new Ingredient('Egg', 15),

        new Ingredient('Tomatoes', 15)
      ])
  ];

  get recipesInstance() {
    return this.recipes.slice();
  }

  constructor() {}
}
