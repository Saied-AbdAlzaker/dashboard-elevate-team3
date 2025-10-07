import {Subscription} from 'rxjs';
import { Chart } from 'chart.js/auto';
import {OrderStatusService} from './service/order-status.service';
import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ordersByStatus, OrderStatus} from './model/order-status';


@Component({
  selector: 'app-order-status',
  imports: [],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export default class OrderStatusComponent implements OnInit, OnDestroy {

  private readonly orderStatusService: OrderStatusService = inject(OrderStatusService);
  private subscription!: Subscription;

  /*ordersByStatus: ordersByStatus[] = [];
  filteredOrders: ordersByStatus[] = [];*/

  completed: ordersByStatus | null = null;
  inProgress: ordersByStatus | null = null;
  canceled: ordersByStatus | null = null;
  totalOrders: number = 0;

  ngOnInit(): void {
    this.getOrderStatus();
  }

  getOrderStatus(): void {
    this.subscription = this.orderStatusService.GetOrderStatus().subscribe({
      /*next: res => {
        this.ordersByStatus = res.statistics.ordersByStatus;
        this.filteredOrders = this.ordersByStatus.filter(ordersByStatus =>
          ["completed", "inProgress", "canceled"].includes(ordersByStatus._id ?? "")
        );
        console.log(this.filteredOrders);
      },*/

      next: (res: OrderStatus) => {
        // console.log(res);
        const data: ordersByStatus[] = res.statistics.ordersByStatus;

        this.completed = data.find(o => o._id === "completed") || { _id: "completed", count: 0 };
        this.inProgress = data.find(o => o._id === "inProgress") || { _id: "inProgress", count: 0 };
        this.canceled = data.find(o => o._id === "canceled") || { _id: "canceled", count: 0 };

        this.totalOrders = (this.completed?.count || 0) + (this.inProgress?.count || 0) + (this.canceled?.count || 0);

        console.log("Data", data);
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
}

// export default OrderStatusComponent
