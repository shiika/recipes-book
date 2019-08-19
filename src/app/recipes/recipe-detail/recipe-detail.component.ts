import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input("recipeDetail") recipe: Recipe;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  toShoppingList(ings: Ingredient[]) {
    ings.forEach(
      (ing) => {
        this.slService.addToIngredients(ing)
      }
    )
  }

}
