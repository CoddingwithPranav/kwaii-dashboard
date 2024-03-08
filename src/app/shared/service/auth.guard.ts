import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (route, state) => {
  // if (typeof document !== 'undefined') {
  //   const router = inject(Router);
  //   const loginservice = inject(LoginService);

  //   const isloggedIn = loginservice.isUserLoggedIn();
  //   if(isloggedIn){
  //     router.navigate(['dashboard'])
  //     return true
  //   }
  //   else{
  //     router.navigate(['login'])
  //     return false
  //   }
  // }
 return true;
};
