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
      { path: 'add-Product', title: 'Add Product', data: { breadcrumb: 'Add Product' }, loadComponent: () =>
          import('./features/pages/products/components/add-edit-product/add-edit-product.component').then
          ((c) => c.AddEditProductComponent),
      },
      { path: 'edit-product/:id', title: 'Update Product', data: { breadcrumb: 'Update Product' }, loadComponent: () =>
          import('./features/pages/products/components/add-edit-product/add-edit-product.component').then
          ((c) => c.AddEditProductComponent),
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
      { path: 'account', title: 'Account Settings', data: { breadcrumb: 'Account Settings' }, loadComponent: () =>
          import('./features/pages/account/account.component').then
          ((c) => c.AccountComponent),children:[
            { path: 'change-password', title: 'Change Password', data: { breadcrumb: 'Change Password' },
              loadComponent: () => import('./features/pages/account/change-password/change-password.component').then
              ((c) => c.ChangePasswordComponent),
            },
          ]
      },

    ],
  },
];