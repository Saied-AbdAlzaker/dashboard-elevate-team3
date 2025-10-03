import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Step 1: Define interfaces for our stats data structure
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

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  /**
   * Step 2: Create method to fetch all dashboard statistics
   * This method will make multiple API calls and combine the results
   * Using forkJoin with error handling for each request
   */
  /**
   * Step 4: Alternative method using a single endpoint (if available)
   * Some APIs provide a dedicated dashboard stats endpoint
   */
  getDashboardStatsFromSingleEndpoint(): Observable<DashboardStats> {
    return this._http.get<any>(`${environment.apiUrl}statistics`)
      .pipe(
        map((response) => (response?.statistics?.overall ?? null) as DashboardStats),
        catchError((error) => {
          try {
            // eslint-disable-next-line no-console
            console.error('[StatsService] getDashboardStatsFromSingleEndpoint error', error);
          } catch {}
          return of(null as unknown as DashboardStats);
        })
      );
  }

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
