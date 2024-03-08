import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { authGuard } from './shared/service/auth.guard';
import { deactiveGuard } from './shared/service/deactive.guard';
import { canActivate , redirectUnauthorizedTo , redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = ()=> redirectLoggedInTo(['dashboard']);
const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'dashboard',
  loadChildren: () => import('./component/component.module').then(m => m.ComponentModule),
  ...canActivate(redirectToLogin)
   },
   {
    path:'login',
    loadChildren:()=> import('./authenticate/authenticate.module').then(m => m.AuthenticateModule),
    ...canActivate(redirectToHome)

   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
