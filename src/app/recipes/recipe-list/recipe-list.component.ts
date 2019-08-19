import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  
  constructor(private recipesService: RecipesService) { }
  
  ngOnInit() {
    this.recipes = this.recipesService.recipesInstance;
  }
  
  displayRecipe(recipe: Recipe) {
    this.recipesService.onSelect.emit(recipe);
  }
}
