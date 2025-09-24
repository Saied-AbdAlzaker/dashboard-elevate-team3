import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {
        path: '', component: DashboardLayoutComponent, children: [

            
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent) }
        ]
    }
];
