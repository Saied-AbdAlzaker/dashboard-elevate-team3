import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {
        path: '', component: DashboardLayoutComponent, children: [
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent), title: 'Products' },
            { path: 'add-product', loadComponent: () => import('./features/pages/add-edit-product/add-edit-product.component').then(c => c.AddEditProductComponent), title: 'Add Product' },
            { path: 'edit-product/:id', loadComponent: () => import('./features/pages/add-edit-product/add-edit-product.component').then(c => c.AddEditProductComponent), title: 'Update Product' },
        ]
    }
];
