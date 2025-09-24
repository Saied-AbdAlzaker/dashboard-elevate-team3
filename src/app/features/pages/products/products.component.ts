import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../../shared/services/products/products.service';


@Component({
  selector: 'app-products',
  imports: [ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => console.log(res)

    });
  }
}
