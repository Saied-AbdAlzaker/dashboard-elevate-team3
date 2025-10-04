import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../../shared/services/products/products.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(
    private _productsService: ProductsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Only load products in browser environment, not during SSR/prerendering
    if (isPlatformBrowser(this.platformId)) {
      this._productsService.getAllProducts().subscribe({
        next: (res) => {
          console.log(res);
        }
      });
    }
  }

}
