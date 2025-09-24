import {Component} from '@angular/core';
import OrderStatusComponent from './component/order-status/order-status.component';
import {LowStockProducts} from './component/low-stock-products/low-stock-products';
import {TopSellingProductsComponent} from './component/top-selling-products/top-selling-products.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    OrderStatusComponent,
    LowStockProducts,
    TopSellingProductsComponent,
    OrderStatusComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}


