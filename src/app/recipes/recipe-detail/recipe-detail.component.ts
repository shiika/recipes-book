import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isIngredients: boolean;

  constructor(
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private rService: RecipesService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.recipe = this.rService.getRecipe(this.id);
        }
      );
  }

  deleteRecipe() {
    this.rService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']).then((data) => console.log(data)).catch(
      (data) => console.log(data)
    );
  }

  toShoppingList(ings: Ingredient[]) {
    ings.forEach(
      (ing) => {
        this.slService.addToIngredients(ing);
      }
    );
  }

}
