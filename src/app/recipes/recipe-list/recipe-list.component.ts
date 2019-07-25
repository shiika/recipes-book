import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("pasta", "Macaroona w salsaa", "https://www.budgetbytes.com/wp-content/uploads/2018/04/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg"),
    new Recipe("Shakshuka", "Egg with tomatoes", "http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_18304_StockFood-12458621-CUT.jpg")
  ];

  @Output() onDisplay: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  
  constructor() { }
  
  ngOnInit() {
  }
  
  displayRecipe(recipe: Recipe) {
    this.onDisplay.emit(recipe)
  }
}
