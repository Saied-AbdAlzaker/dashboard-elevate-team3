import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../../../../../environments/ApiEndPoint';
import {Observable} from 'rxjs';
import {TopSellingProducts} from '../model/top-selling-products';
import { TopSellingProductsResponse } from '../model/top-selling-products-response';



@Injectable({
  providedIn: 'root'
})
export class TopSellingProductsService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  getTopSellingProducts(): Observable <TopSellingProductsResponse> {
    return this.httpClient.get <TopSellingProductsResponse> ('statistics');
  }
}
