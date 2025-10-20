import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {ApiEndPoint} from '../../../../../../../environments/ApiEndPoint';
import {OrderStatus} from '../model/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  GetOrderStatus(): Observable <OrderStatus> {
    return this.httpClient.get<OrderStatus>(ApiEndPoint.STATISTICS_ORDERS);
  }
}
