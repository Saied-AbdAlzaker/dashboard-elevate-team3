import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-product',
  imports: [],
  templateUrl: './validation-product.component.html',
  styleUrl: './validation-product.component.scss'
})
export class ValidationProductComponent {

  @Input() control!:AbstractControl;
  // @Input() controlDes!:AbstractControl;

  

}
