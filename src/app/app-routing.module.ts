import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'welcome2',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'item-details/:id',
    loadChildren: () => import('./item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./search-product/search-product.module').then( m => m.SearchProductPageModule)
  },
  {
    path: 'orderdetail/:id',
    loadChildren: () => import('./orderdetail/orderdetail.module').then( m => m.OrderdetailPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'done',
    loadChildren: () => import('./done/done.module').then( m => m.DonePageModule)
  },
  {
    path: 'listproducts',
    loadChildren: () => import('./listproducts/listproducts.module').then( m => m.ListproductsPageModule)
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  },
  {
    path: 'welcome-admin',
    loadChildren: () => import('./welcome-admin/welcome-admin.module').then( m => m.WelcomeAdminPageModule)
  },
  {
    path: 'reg-admin',
    loadChildren: () => import('./reg-admin/reg-admin.module').then( m => m.RegAdminPageModule)
  },
  {
    path: 'list-orders',
    loadChildren: () => import('./list-orders/list-orders.module').then( m => m.ListOrdersPageModule)
  },
  {
    path: 'order-details-admin/:id',
    loadChildren: () => import('./order-details-admin/order-details-admin.module').then( m => m.OrderDetailsAdminPageModule)
  },
  {
    path: 'receive-details/:id',
    loadChildren: () => import('./receive-details/receive-details.module').then( m => m.ReceiveDetailsPageModule)
  },
  {
    path: 'receive-details-user/:id',
    loadChildren: () => import('./receive-details-user/receive-details-user.module').then( m => m.ReceiveDetailsUserPageModule)
  },
  {
    path: 'item-details-admin/:id',
    loadChildren: () => import('./item-details-admin/item-details-admin.module').then( m => m.ItemDetailsAdminPageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./list-users/list-users.module').then( m => m.ListUsersPageModule)
  },
  {
    path: 'viewcustomers/:id',
    loadChildren: () => import('./viewcustomers/viewcustomers.module').then( m => m.ViewcustomersPageModule)
  },
  {
    path: 'edit-user-admin/:id',
    loadChildren: () => import('./edit-user-admin/edit-user-admin.module').then( m => m.EditUserAdminPageModule)
  },
  {
    path: 'search-user',
    loadChildren: () => import('./search-user/search-user.module').then( m => m.SearchUserPageModule)
  },
  {
    path: 'search-order',
    loadChildren: () => import('./search-order/search-order.module').then( m => m.SearchOrderPageModule)
  },
  {
    path: 'search-products-admin',
    loadChildren: () => import('./search-products-admin/search-products-admin.module').then( m => m.SearchProductsAdminPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'comp-details/:id',
    loadChildren: () => import('./comp-details/comp-details.module').then( m => m.CompDetailsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'edit-product-admin/:id',
    loadChildren: () => import('./edit-product-admin/edit-product-admin.module').then( m => m.EditProductAdminPageModule)
  },
  {
    path: 'search-product-admin',
    loadChildren: () => import('./search-product-admin/search-product-admin.module').then( m => m.SearchProductAdminPageModule)
  },
  {
    path: 'skincare',
    loadChildren: () => import('./skincare/skincare.module').then( m => m.SkincarePageModule)
  },
  {
    path: 'haircare',
    loadChildren: () => import('./haircare/haircare.module').then( m => m.HaircarePageModule)
  },
  {
    path: 'moisturizer',
    loadChildren: () => import('./moisturizer/moisturizer.module').then( m => m.MoisturizerPageModule)
  },
  {
    path: 'sunscreen',
    loadChildren: () => import('./sunscreen/sunscreen.module').then( m => m.SunscreenPageModule)
  },
  {
    path: 'conditioner',
    loadChildren: () => import('./conditioner/conditioner.module').then( m => m.ConditionerPageModule)
  },
  {
    path: 'hairoil',
    loadChildren: () => import('./hairoil/hairoil.module').then( m => m.HairoilPageModule)
  },
  {
    path: 'makeup',
    loadChildren: () => import('./makeup/makeup.module').then( m => m.MakeupPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
