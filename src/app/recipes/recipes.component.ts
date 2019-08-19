import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  recipeItem: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.onSelect.subscribe(
      (recipe: Recipe) => {
        this.recipeItem = recipe;
      }
    );
  }


}
