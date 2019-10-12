import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../header/data-storage.service';

@Injectable({
  providedIn: 'root'
})

// We have provided this service in the root module to be accessible in the shoppinglist component
// so we can keep our data when we navigate away from this service.
export class RecipesService {
  recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "pasta", 
  //     "Macaroona w salsaa", 
  //     "../../assets/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg", 
  //     [
  //       new Ingredient('Tomatoes', 5),

  //       new Ingredient('Meatballs', 10),

  //       new Ingredient('Macaroona', 20)
  //     ]),
  //   new Recipe(
  //     "Shakshuka", 
  //     "Egg with tomatoes", 
  //     "../../assets/l_18304_StockFood-12458621-CUT.jpg", 
  //     [
  //       new Ingredient('Egg', 15),

  //       new Ingredient('Tomatoes', 15)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  get recipesInstance() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(recipes);
  }

  getRecipe(id: number) {
    return this.recipesInstance[id]
  }

  updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes.splice(index, 1, newRecipe);
      this.recipesUpdated.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
      this.recipes.push(newRecipe);
      this.recipesUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesUpdated.next(this.recipes.slice());
  }
}
