import { Component, inject } from '@angular/core';
import { StatisticsService } from '../../service/statistics.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-total-view',
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './total-view.component.html',
  styleUrl: './total-view.component.scss',
})
export class TotalViewComponent {
  private readonly _statisticsService: StatisticsService = inject(StatisticsService);
  private subscription!: Subscription;

  totalProducts: number = 0
  totalOrders: number = 0
  totalCategories: number = 0
  totalRevenue: number = 0



  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.subscription = this._statisticsService
      .getStatisticsDashboard()
      .subscribe({
        next: (res) => {
          console.log(res.statistics.overall);
          this.totalProducts=res.statistics.overall.totalProducts
          this.totalOrders=res.statistics.overall.totalOrders
          this.totalCategories= res.statistics.overall.totalCategories
          this.totalRevenue= res.statistics.overall.totalRevenue
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
