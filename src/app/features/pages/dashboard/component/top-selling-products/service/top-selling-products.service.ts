import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../../../../../environments/ApiEndPoint';
import {Observable} from 'rxjs';
import {TopSellingProducts} from '../model/top-selling-products';

@Injectable({
  providedIn: 'root'
})
export class TopSellingProductsService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  getTopSellingProducts(): Observable <TopSellingProducts> {
    return this.httpClient.get <TopSellingProducts> (ApiEndPoint.TOP_SELLING_PRODUCTS);
  }
}
