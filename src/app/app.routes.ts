import { SettingsComponent } from './features/profile/components/settings/settings.component';
import { AddressesComponent } from './features/profile/components/addresses/addresses.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ContactComponent } from './features/contact/contact.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { ProfileComponent } from './features/profile/profile.component';
import { OrdersComponent } from './features/orders/orders.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { BrandsComponent } from './features/brands/brands.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { SubcategoryComponent } from './features/subcategory/subcategory.component';
import { ProductsSubcategoryComponent } from './features/products-subcategory/products-subcategory.component';
import { ElectronicsProductsComponent } from './features/electronics-products/electronics-products.component';
import { WomensfashionProductsComponent } from './features/womensfashion-products/womensfashion-products.component';
import { MensfashionProductsComponent } from './features/mensfashion-products/mensfashion-products.component';
import { BeautyhealthProductsComponent } from './features/beautyhealth-products/beautyhealth-products.component';
import { BrandProductsComponent } from './features/brand-products/brand-products.component';
import { CheckoutSessionComponent } from './features/checkout-session/checkout-session.component';
import { SearchComponent } from './features/search/search.component';
import { ResearchComponent } from './features/research/research.component';
import { AdminPagesComponent } from './dashboard/admin-pages/admin-pages.component';
import { ProductsAdminComponent } from './dashboard/admin-pages/products-admin/products-admin.component';
import { OrdersAdminComponent } from './dashboard/admin-pages/orders-admin/orders-admin.component';
import { UsersAdminComponent } from './dashboard/admin-pages/users-admin/users-admin.component';
import { LoginAdminComponent } from './dashboard/login-admin/login-admin.component';
import { authAdminGuard } from './dashboard/auth-admin-guard';

export const routes: Routes = [
    {path :  '' , redirectTo : 'home' , pathMatch : 'full'} ,
    {path :  'home' , component : HomeComponent , title : 'Shopping App'} ,
    {path :  'categories' , component : CategoriesComponent , title : 'Categories'} ,
    {path :  'categories/:categoryId/subcategories' , component : SubcategoryComponent} ,
    {path :  'products/subcategory/:subId' , component : ProductsSubcategoryComponent} ,
    {path :  'shop/products' , component : ShopComponent , title : 'Shop'} ,
    {path :  'electronics' , component : ElectronicsProductsComponent , title : 'Electronics'} ,
    {path :  'womens-fashion' , component : WomensfashionProductsComponent , 
        title : 'Womens-fashion'} ,
    {path :  'mens-fashion' , component : MensfashionProductsComponent , title : 'Mens-fashion'} ,
    {path :  'beauty-health' , component : BeautyhealthProductsComponent , title : 'Beauty-health'} ,
    {path :  'brands' , component : BrandsComponent , title : 'Brands'} ,
    {path :  'brands/:brandId' , component : BrandProductsComponent} ,
    {path :  'shop/:productId' , component : ProductDetailComponent} ,
    {path :  'contact' , component : ContactComponent} ,
    {path :  'wishlist' , component : WishlistComponent} ,
    {path :  'profile' , component : ProfileComponent , 
        children : [
            {path :  '' , redirectTo : 'addresses' , pathMatch : 'full'} ,
            {path :  'addresses' , component : AddressesComponent} ,
            {path :  'settings' , component : SettingsComponent} ,
        ]
    },
    {path :  'myorders' , component : OrdersComponent} ,
    {path :  'categories' , component : CategoriesComponent} ,
    {path :  'cart' , component : CartComponent} ,
    {path :  'login' , component : LoginComponent} ,
    {path : 'checkout-session/:cartId' , component : CheckoutSessionComponent} ,
    {path : 'search' , component : SearchComponent} ,
    {path : 'research' , component : ResearchComponent} ,
    {path :  'register' , component : RegisterComponent , title : 'Register'} ,
    {path :  'forget-password' , component : ForgetPasswordComponent , title : 'Forget Password'} ,
    {path :  'admin' , component :  AdminPagesComponent, canActivate : [authAdminGuard] ,
        children : [
            {path :  '' , redirectTo : 'products-admin' , pathMatch : 'full'} ,
            {path :  'products-admin' , component : ProductsAdminComponent} ,
            {path :  'orders-admin' , component : OrdersAdminComponent} ,
            {path :  'users-admin' , component : UsersAdminComponent} ,
        ]
    },
    {path :  'login-admin' , component : LoginAdminComponent} ,
    {path :  '**' , component : NotfoundComponent} ,
];