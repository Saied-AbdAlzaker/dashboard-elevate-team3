import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Step 1: Define interfaces for our stats data structure

// make a file for the stats interface individually

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: boolean;
}
//till here

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }
  /**
   * Get statistics from the dedicated statistics endpoint
   */
  getStatistics(): Observable<DashboardStats | null> {
    return this._http
      .get<any>(`${environment.apiUrl}statistics`)
      .pipe(
        map((response) => (response?.statistics?.overall ?? null) as DashboardStats | null),
        catchError((error) => {
          try {
            // eslint-disable-next-line no-console
            console.error('[StatsService] getStatistics error', error);
          } catch {}
          return of(null);
        })
      );
  }
}
