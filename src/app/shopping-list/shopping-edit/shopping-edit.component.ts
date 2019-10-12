import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingName', {static: true}) ingredientName: ElementRef;
  @ViewChild('ingAmount', {static: true}) ingredientAmount: ElementRef;
  @ViewChild('shForm', {static: true}) shForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {

      this.subscription = this.shoppingListService.ingredientSelected
        .subscribe((index: number) => {
            this.editedItemIndex = index;
            const ing: Ingredient = this.shoppingListService.getIngredient(this.editedItemIndex);
            this.shForm.setValue(ing);
            this.editMode = true;
        });
  }

  onSubmit(shForm: NgForm) {
    const value = shForm.value;
    if (this.editMode) {
      return this.shoppingListService.editIngredient(value, this.editedItemIndex)
    }
    this.shoppingListService.addToIngredients(value);
    shForm.reset();
    this.editMode = false;
  }

  onClear() {
      this.shForm.reset();
      this.editMode = false;
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.shForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
