import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('../app/core/layout/dashboard-layout/dashboard-layout.component').then
      (c => c.DashboardLayoutComponent), children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'dashboard', title: 'Dashboard', data: { breadcrumb: 'Dashboard' },
          loadComponent: () => import('./features/pages/dashboard/dashboard.component').then
            ((c) => c.DashboardComponent),
        },
        {
          path: 'products', title: 'Products', data: { breadcrumb: 'products' },
          loadComponent: () => import('./features/pages/products/products.component').then
            ((c) => c.ProductsComponent),
        },
        {
          path: 'add-product', title: 'Add Product', data: { breadcrumb: 'add-product' },
          loadComponent: () => import('./features/pages/products/components/add-edit-product/add-edit-product.component').then
            ((c) => c.AddEditProductComponent),
        },

        {
          path: 'edit-product/:id', title: 'Update Product', data: { breadcrumb: 'add-product' },
          loadComponent: () => import('./features/pages/products/components/add-edit-product/add-edit-product.component').then
            ((c) => c.AddEditProductComponent),
        },
      ],
  },
];
