import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingName', {static: false}) ingredientName: ElementRef;
  @ViewChild('ingAmount', {static: false}) ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
    this.shoppingListService.addToIngredients({
      name: this.ingredientName.nativeElement.value,
      amount: this.ingredientAmount.nativeElement.value
    })
  }

}
