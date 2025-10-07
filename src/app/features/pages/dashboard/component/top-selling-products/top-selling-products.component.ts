import {Subscription} from 'rxjs';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TopSellingProductsService} from './service/top-selling-products.service';
import {TableModule} from 'primeng/table';
import {TopSellingProduct, TopSellingProducts} from './model/top-selling-products';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-top-selling-products',
  imports: [
    TableModule,
    DecimalPipe
  ],
  templateUrl: './top-selling-products.component.html',
  styleUrl: './top-selling-products.component.scss'
})
export class TopSellingProductsComponent implements OnInit, OnDestroy {

  private readonly topSellingProductsService: TopSellingProductsService = inject(TopSellingProductsService);
  private subscriptions!: Subscription;

  topSellingProducts: TopSellingProduct[] = [];
  maxSold: number = 0;
  minSold: number = 0;

  ngOnInit(): void {
    this.getSellingProducts();
  }

  getSellingProducts(): void {
    this.subscriptions = this.topSellingProductsService.getTopSellingProducts().subscribe({
      next: (data: TopSellingProducts): void => {
        this.topSellingProducts = data.statistics.products.topSellingProducts;
        console.log(data);
        console.log(this.topSellingProducts);

        const soldArray = this.topSellingProducts.map(product => product.sold);

        this.maxSold = Math.max(...soldArray);
        this.minSold = Math.min(...soldArray);

        console.log(this.maxSold);
      }
    });
  }

  getProductBg(product: any): string {
    let baseClass = 'flex justify-between items-center py-1 px-3 rounded ';

    if (this.maxSold === product.sold) {
      return baseClass + 'bg-gradient-to-r from-[#DFAC16]/25 to-[#DFAC16]/10'; // MAX
    } else if (product.sold > 200) {
      return baseClass + 'bg-gradient-to-r from-[#757F95]/25 to-[#757F95]/10'; // Middle
    } else if (this.minSold === product.sold) {
      return baseClass + 'bg-gradient-to-r from-[#914400]/25 to-[#914400]/10'; // MIN
    } else {
      return baseClass + 'bg-gradient-to-r from-gray-100 to-gray-50'; // Default
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
