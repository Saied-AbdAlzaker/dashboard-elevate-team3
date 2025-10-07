import {Component} from '@angular/core';
import {LowStockProducts} from './component/low-stock-products/low-stock-products';
import {TopSellingProductsComponent} from './component/top-selling-products/top-selling-products.component';
import OrderStatusComponent from './component/order-status/order-status.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    LowStockProducts,
    TopSellingProductsComponent,
    OrderStatusComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}


