import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataService: DataStorageService, private rService: RecipesService) { }

  ngOnInit() {
  }

  onSaveData() {
      this.dataService.saveData();
  }

  onFetchData() {
      this.dataService.fetchData().subscribe();
  }

}
