import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { UpsertProductComponent } from './product/upsert-product/upsert-product.component';
import { ReviewComponent } from './product/review/review.component';
import { authGuard } from '../shared/service/auth.guard';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = ()=> redirectLoggedInTo(['dashboard']);
const routes: Routes = [
  {


    path:'',
    component:UserDashboardComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path:'product-list',
    component:ListProductComponent,
        ...canActivate(redirectToLogin)
  },
  {
    path:'product-add',
    component:UpsertProductComponent,
        ...canActivate(redirectToLogin)
  },
  {
    path:'product-edit/:id',
    component:UpsertProductComponent,
        ...canActivate(redirectToLogin)
  },
  {
    path:'product-review/:id',
    component:ReviewComponent,
        ...canActivate(redirectToLogin)
  },
  {
    path:'product-review',
    component:ReviewComponent,
        ...canActivate(redirectToLogin)
  },
  {
    path:'category',
    component:ListCategoryComponent,
        ...canActivate(redirectToLogin)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
