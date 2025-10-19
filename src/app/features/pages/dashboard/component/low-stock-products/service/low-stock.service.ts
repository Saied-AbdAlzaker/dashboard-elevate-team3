import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndPoint} from '../../../../../../../environments/ApiEndPoint';
import {SellingStock} from '../model/selling-stock';
import {TOKEN} from '../../../../../../../environments/TOKEN';

@Injectable({
  providedIn: 'root'
})
export class LowStockService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  getLowStockProducts(): Observable<SellingStock> {
    return this.httpClient.get<SellingStock>(ApiEndPoint.LOW_STOCK_PRODUCTS);
  }

}
