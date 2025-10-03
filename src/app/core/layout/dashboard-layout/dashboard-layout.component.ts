import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../shared/components/ui/sidebar/sidebar.component";
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { StatCardComponent } from "../../../shared/components/ui/stat-card/stat-card.component";
import { StatsService, DashboardStats } from '../../../shared/services/stats/stats.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, SidebarComponent, NavbarComponent, RouterOutlet, StatCardComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  stats: DashboardStats = {
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalRevenue: 0
  };

  loading = true;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    
    // Try the dedicated stats endpoint first
    this.statsService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: () => {
        // Fallback to calculating stats from products
        this.statsService.calculateStatsFromProducts().subscribe({
          next: (stats) => {
            this.stats = stats;
            this.loading = false;
          },
          error: (error) => {
            console.error('Failed to load stats:', error);
            this.loading = false;
          }
        });
      }
    });
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    });
  }
}
