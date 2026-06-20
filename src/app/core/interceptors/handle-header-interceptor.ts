import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
const NEED_TOKEN = ['cart' , 'products' , 'categories' , 'wishlist' , 'orders' , 'addresses' , 'updateMe'
  , 'changeMyPassword' , 'users'
]
export const handleHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  NEED_TOKEN.map(r => {})
  if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders') ||
   req.url.includes('addresses') || req.url.includes('updateMe') 
   || req.url.includes('changeMyPassword') || req.url.includes('users')){
    req = req.clone({
      setHeaders : {
        token : authService.token() || ''
      }
    })
  }
  return next(req);
};