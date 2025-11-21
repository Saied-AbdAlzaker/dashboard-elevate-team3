import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsResponse } from '../interface/statistics-response';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  getStatisticsDashboard(): Observable <StatisticsResponse> {
    return this.httpClient.get <StatisticsResponse> ('statistics');
  }
}
