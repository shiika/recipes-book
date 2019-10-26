import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../shared/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

import { tap, map, take, concatMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private rService: RecipesService,
        private authService: AuthService) {}

    saveData() {
            const recipes = this.rService.recipesInstance;
            this.http.put("https://recipe-book-2-712fc.firebaseio.com/recipes.json", recipes)
                .subscribe(
                    (response) => {
                        console.log(response);
                    }
                )
    }

    editRecipe(index: number, newRecipe: Recipe) {
        this.http.patch<Recipe>(
            `https://recipe-book-2-712fc.firebaseio.com/recipes/${index}.json`, newRecipe).subscribe(
                (recipe: Recipe) => {
                    console.log(recipe);
                }
            )
    }

    fetchData() {
        return this.http.get<Recipe[]>(`https://recipe-book-2-712fc.firebaseio.com/recipes.json`).pipe(
            map(
                (recipes: Recipe[]) => {
                    return recipes.map(
                        (recipe: Recipe) => {
                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                        }
                    )
                }
            ),
            tap(
                (recipes: Recipe[]) => {
                     this.rService.setRecipes(recipes)
                }
            )
        )
        
    }

}