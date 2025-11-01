import { Component, inject } from '@angular/core';
import { StatisticsService } from '../../service/statistics.service';
import { Subscription } from 'rxjs';
import { Categories } from './model/categories';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-categories',
  imports: [TableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    private readonly _StatisticsService: StatisticsService = inject(StatisticsService);
    private subscriptions!: Subscription;


    Categories:Categories[] = [];

  ngOnInit(): void {
    this.getStatisticsCategories();
  }

  getStatisticsCategories(): void {
    this.subscriptions = this._StatisticsService.getStatisticsDashboard().subscribe({
      next: (data): void => {
        this.Categories = data.statistics.categories;

      }
    });
  }


  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
