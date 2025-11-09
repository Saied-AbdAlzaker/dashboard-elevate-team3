import {Subscription} from 'rxjs';
import { Chart } from 'chart.js/auto';
import {OrderStatusService} from './service/order-status.service';
import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Orders, ordersByStatus, OrderStatus} from './model/order-status';
import {data} from 'autoprefixer';
import {NgClass} from '@angular/common';
import { StatisticsService } from '../../service/statistics.service';


@Component({
  selector: 'app-order-status',
  imports: [
    NgClass
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export default class OrderStatusComponent implements OnInit, OnDestroy {

  private readonly _statisticsService: StatisticsService = inject(StatisticsService);
  private subscription!: Subscription;

  /*ordersByStatus: ordersByStatus[] = [];
  filteredOrders: ordersByStatus[] = [];*/

  completed: ordersByStatus | null = null;
  inProgress: ordersByStatus | null = null;
  canceled: ordersByStatus | null = null;
  totalOrders: number = 0;

  statistics = [
    {
      label: 'Complete',
      color: 'bg-green-600',
      count: this.completed?.count || 0,
    },
    {
      label: 'In Progress',
      color: 'bg-blue-500',
      count: this.inProgress?.count || 0,
    },
    {
      label: 'Canceled',
      color: 'bg-red-500',
      count: this.canceled?.count || 0,
    },
  ];


  ngOnInit(): void {
    this.getOrderStatus();
  }

  getOrderStatus(): void {
    this.subscription = this._statisticsService.getStatisticsDashboard().subscribe({


      next: (res) => {
        const data :Orders= res.statistics.orders;

        this.completed = data.ordersByStatus.find(o => o._id === "completed") || { _id: "completed", count: 0 };
        this.inProgress = data.ordersByStatus.find(o => o._id === "inProgress") || { _id: "inProgress", count: 0 };
        this.canceled = data.ordersByStatus.find(o => o._id === "canceled") || { _id: "canceled", count: 0 };

        this.statistics = [
          { label: 'Complete', color: 'bg-green-600', count: this.completed?.count || 0 },
          { label: 'In Progress', color: 'bg-blue-500', count: this.inProgress?.count || 0 },
          { label: 'Canceled', color: 'bg-red-500', count: this.canceled?.count || 0 },
        ];

        this.totalOrders = (this.completed?.count || 0) + (this.inProgress?.count || 0) + (this.canceled?.count || 0);

        this.chart();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getPercentage(count: number): string{
    if (!this.totalOrders) return '0%';
    return ((count / this.totalOrders) * 100).toFixed(1) + "%";
  }

  chart(): void{
    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        /*labels: ['Red', 'Blue', 'Yellow'],*/
        datasets: [{
          label: 'Dataset',
          data: [this.canceled?.count, this.completed?.count, this.inProgress?.count],
          backgroundColor: [
            'rgb(239,68,68)',
            'rgb(22,163,74)',
            'rgb(59,130,246)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected readonly data = data;
}

// export default OrderStatusComponent
