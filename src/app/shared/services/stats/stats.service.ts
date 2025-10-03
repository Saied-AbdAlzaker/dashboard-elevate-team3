import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  getDashboardStats(): Observable<DashboardStats> {
    return this._http.get<DashboardStats>(`https://flower.elevateegy.com/api/v1/stats`);
  }

  // Alternative method if the API doesn't have a dedicated stats endpoint
  // We can calculate stats from existing endpoints
  calculateStatsFromProducts(): Observable<DashboardStats> {
    return new Observable(observer => {
      // Fetch products and calculate stats
      this._http.get(`https://flower.elevateegy.com/api/v1/products`).subscribe({
        next: (products: any) => {
          const stats: DashboardStats = {
            totalProducts: products?.data?.length || 0,
            totalOrders: 0, // This would need to be fetched from orders endpoint
            totalCategories: this.getUniqueCategories(products?.data || []),
            totalRevenue: this.calculateTotalRevenue(products?.data || [])
          };
          observer.next(stats);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  private getUniqueCategories(products: any[]): number {
    const categories = new Set(products.map(product => product.category?.id || product.category));
    return categories.size;
  }

  private calculateTotalRevenue(products: any[]): number {
    return products.reduce((total, product) => {
      return total + (product.price * (product.sold_quantity || 0));
    }, 0);
  }
}
