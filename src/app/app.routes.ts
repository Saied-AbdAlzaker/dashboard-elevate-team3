import {Routes} from '@angular/router';

export const routes: Routes = [
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
      { path: 'categories', title: 'Categories', data: { breadcrumb: 'Categories' }, loadComponent: () =>
          import('./features/pages/categories/categories.component').then
          ((c) => c.CategoriesComponent),
      },
      { path: 'addCategory', title: 'Add Category', data: { breadcrumb: 'Add Category' }, loadComponent: () =>
          import('./features/pages/categories/add-category/add-category.component').then
          ((c) => c.AddCategoryComponent),
      },
      { path: 'editCategory/:id', title: 'Edit Category', data: { breadcrumb: 'Edit Category' }, loadComponent: () =>
          import('./features/pages/categories/add-category/add-category.component').then
          ((c) => c.AddCategoryComponent),
      },
    ],
  },
];
