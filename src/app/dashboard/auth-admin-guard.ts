import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAdmin = localStorage.getItem('Mohammed 1940'); 
  if(isAdmin === 'true'){
    return true;
  }
  router.navigate(['/login-admin']);
  return false;
};