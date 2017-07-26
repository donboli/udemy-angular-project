import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() newIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const ingredient = new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );

    this.newIngredient.emit(ingredient);
  }
}
