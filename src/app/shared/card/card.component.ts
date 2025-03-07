import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() item!:Product;
@Output() itemId = new EventEmitter<string>();
@Output() deleteItemId = new EventEmitter<string>();


sendId(value: string) {
  this.itemId.emit(value);
}
sendIdtoDelete(id:string){
  this.deleteItemId.emit(id)
}
}
