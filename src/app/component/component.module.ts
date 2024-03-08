import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ListProductComponent } from './product/list-product/list-product.component';
import { UpsertProductComponent } from './product/upsert-product/upsert-product.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';
import { ReviewComponent } from './product/review/review.component';
import { HomeComponent } from './home/home.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    DashboardComponent,
    ListProductComponent,
    UpsertProductComponent,
    ListCategoryComponent,
    UpsertCategoryComponent,
    UserDashboardComponent,
    ReviewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    StepsModule,
    TimelineModule,
    FormsModule,
    AngularEditorModule,
    RadioButtonModule,
    ToggleButtonModule,
    ImageCropperModule,
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    TableModule,
    ChartModule,
    DropdownModule
  ],
   exports:[
    DashboardComponent
   ],
   providers:[
   ]

})
export class ComponentModule { }
