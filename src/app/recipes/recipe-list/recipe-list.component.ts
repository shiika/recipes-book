import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/header/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService ) { }

  ngOnInit() {
    this.recipesService.recipesUpdated
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
      );
      this.recipes = this.recipesService.recipesInstance;
  }
}
