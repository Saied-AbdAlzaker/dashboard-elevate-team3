import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../shared/components/ui/sidebar/sidebar.component";
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { StatCardComponent } from "../../../shared/components/ui/stat-card/stat-card.component";
import { StatsService, DashboardStats } from "../../../shared/services/stats/stats.service";

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, SidebarComponent, NavbarComponent, RouterOutlet, StatCardComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  
  // Step 3: Define component properties for stats data
  dashboardStats: DashboardStats | null = null;
  isLoading = true;
  hasError = false;
  errorMessage = '';

  constructor(private _statsService: StatsService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  /**
   * Step 4: Method to load dashboard statistics
   * This method handles the API call and state management
   */
  private loadDashboardStats(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    // Try the single statistics endpoint first, fallback to individual calls
    this._statsService.getStatistics().subscribe({
      next: (stats: DashboardStats | null) => {
        console.log('Statistics loaded successfully:', stats);
        this.dashboardStats = stats;
        this.isLoading = false;
        this.hasError = false;
      },
      error: (err) => {
        this.dashboardStats = null;
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'Failed to load statistics.';
        console.error('Statistics load error:', err); 
      }
    });
  }


  /**
   * Step 5: Method to retry loading stats (for error recovery)
   */
  retryLoadingStats(): void {
    this.loadDashboardStats();
  }

  /**
   * Step 6: Helper methods for formatting data
   */
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
