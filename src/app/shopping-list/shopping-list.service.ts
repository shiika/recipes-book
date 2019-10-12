import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10)
  ];

  get ingredientsInstance() {
    return this.ingredients.slice();
  } 

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  editIngredient(ing: Ingredient, index: number) {
      this.ingredients.splice(index, 1, ing);
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  addToIngredients(ing: Ingredient) {
    this.ingredients.push(new Ingredient(ing.name, ing.amount));
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onEditIng(index: number) {
      this.ingredientSelected.next(index);
  }

  constructor() { }
}
