import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {LowStockProduct, SellingStock, Statistics} from './model/selling-stock';
import {LowStockService} from './service/low-stock.service';
import {Subscription} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { StatisticsService } from '../../service/statistics.service';
import { log } from 'console';


@Component({
  selector: 'app-low-stock-products',
  imports: [
    TableModule,
    FormsModule,
    DecimalPipe,
  ],
  templateUrl: './low-stock-products.html',
  styleUrl: './low-stock-products.scss'
})
export class LowStockProducts implements OnInit, OnDestroy {

  private readonly _statisticsService: StatisticsService = inject(StatisticsService);
  private subscriptions!: Subscription;

  lowStockProducts: LowStockProduct[] = [];

  ngOnInit(): void {
    this.getLowStockProducts();
  }

  getLowStockProducts(): void {
    this.subscriptions = this._statisticsService.getStatisticsDashboard().subscribe({
      next: (data) => {

        this.lowStockProducts = data.statistics.products.lowStockProducts;
        // console.log(this.lowStockProducts);
      },
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
