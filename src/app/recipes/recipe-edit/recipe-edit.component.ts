import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/header/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  recipeSelected: Recipe;

  constructor(
    private route: ActivatedRoute, 
    private rService: RecipesService, 
    private router: Router,
    private dStorage: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.recipeSelected = this.rService.getRecipe(this.id);
        }
      );
      this.initForm();
  }

  private initForm() {
    let recipeFormIngredients = new FormArray([]);
    let {name: recipeName = "", imagePath: recipeImagePath = "", description: recipeDescription = "", ingredients = []} = this.rService.getRecipe(this.id) || { name: "", description: "", imagePath: "", ingredients: [] };
    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeFormIngredients
    });
    
    if (ingredients.length > 0) {
        for (let ingredient of ingredients) {
          recipeFormIngredients.push(new FormGroup({
            "name": new FormControl(ingredient.name, Validators.required),
            "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
    }
    
  }

  addIngredientCtrl() {
      (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }))
  }

  onSubmit() {
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
      if (this.editMode) {
        this.rService.updateRecipe(this.id, new Recipe(name, description, imagePath, ingredients));
        this.dStorage.editRecipe(this.id, new Recipe(name, description, imagePath, ingredients))
      } else {

        this.rService.addRecipe(new Recipe(name, description, imagePath, ingredients))
      }
      this.router.navigate(["/recipes"], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(["../", "detail"], {relativeTo: this.route});
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
    console.log(<FormArray>this.recipeForm.get("ingredients"));
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
