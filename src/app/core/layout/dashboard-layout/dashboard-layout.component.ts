import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/components/ui/sidebar/sidebar.component";
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
