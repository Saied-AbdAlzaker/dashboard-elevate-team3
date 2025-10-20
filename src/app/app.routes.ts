import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: DashboardLayoutComponent, children: [
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent), title: 'Products' },
            { path: 'add-product', loadComponent: () => import('./features/pages/add-edit-product/add-edit-product.component').then(c => c.AddEditProductComponent), title: 'Add Product' },
            { path: 'edit-product/:id', loadComponent: () => import('./features/pages/add-edit-product/add-edit-product.component').then(c => c.AddEditProductComponent), title: 'Update Product' },
        ]
    },
  { path: '', loadComponent: () => import('../app/core/layout/dashboard-layout/dashboard-layout.component').then
    (c => c.DashboardLayoutComponent), children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', title: 'Dashboard', data: { breadcrumb: 'Dashboard' },
        loadComponent: () => import('./features/pages/dashboard/dashboard.component').then
        ((c) => c.DashboardComponent),
      },
      { path: 'products', title: 'Products', data: { breadcrumb: 'Products' }, loadComponent: () =>
          import('./features/pages/products/products.component').then
          ((c) => c.ProductsComponent),
      },
    ],
  },
];
