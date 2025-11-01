import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StatisticsService } from '../../service/statistics.service';
import { Subscription } from 'rxjs';
interface OrderRevenue {
    _id: string
  revenue: number
  count: number
}
@Component({
  selector: 'app-revenue',
  imports: [ChartModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
    private readonly _statisticsService: StatisticsService = inject(StatisticsService);
      private subscription!: Subscription;

  DailyRevenue:OrderRevenue[] = [];

    basicData: any;

    basicOptions: any;

    platformId = inject(PLATFORM_ID);

    configService = this.DailyRevenue;

  constructor(private cd: ChangeDetectorRef) {}


    /* themeEffect = effect(() => {
        if (this.configService.transitionComplete()) {
            if (this.designerService.preset()) {
                this.initChart();
            }
        }
    }); */

    ngOnInit() {
      this.getOrderRevenue();
        this.initChart();
    }


    getOrderRevenue(): void {
      this.subscription =this._statisticsService.getStatisticsDashboard().subscribe({
        next: (res) => {
          this.DailyRevenue = res.statistics.orders.dailyRevenue;
          this.initChart(); // بعد ما البيانات توصل
        }, error: (err) => {
          console.log('Error fetching revenue data', err);
        }
      })
      /* this.subscription = this._statisticsService.getStatisticsDashboard().subscribe({
      next: (res) => {
        console.log('this Revenue data => =======}}} ', this.DailyRevenue);
          this.DailyRevenue = res.statistics.orders.dailyRevenue;
        this.initChart(); // بعد ما البيانات توصل

      }, error: (err) => {
        console.log('Error fetching revenue data', err);
      }}); */
    }


    initChart() {
  if (isPlatformBrowser(this.platformId)) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    // تحويل البيانات إلى labels و values
    const labels = this.DailyRevenue.map(item => {
      const date = new Date(item._id);
      return date.toLocaleString('default', { month: 'short' }); // Jan, Feb, ...
    });

    const values = this.DailyRevenue.map(item => item.revenue);

    this.basicData = {
      labels,
      datasets: [{
        label: 'الإيرادات الشهرية',
        data: values,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
        pointBackgroundColor: values.map((v, i) => labels[i] === 'Jun' ? 'red' : 'rgba(255, 99, 132, 1)'),
        pointRadius: values.map((v, i) => labels[i] === 'Jun' ? 6 : 3)
      }]
    };

    this.basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .75,
      plugins: {
        legend: {
          display: false,
          labels: {

            color: textColor,
            position:'bottom',
            pointStyle:'circle',
          }
        },
        title: {
      display: false // ده اللي بيخفي الـ Title
    },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return `${context.parsed.y} EGP`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.cd.markForCheck();
  }
}
    ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
