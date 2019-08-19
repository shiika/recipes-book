import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10)
  ];

  get ingredientsInstance() {
    return this.ingredients.slice();
  } 

  addToIngredients(ing: Ingredient) {
    this.ingredients.push(new Ingredient(ing.name, ing.amount));
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  constructor() { }
}
