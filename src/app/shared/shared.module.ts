import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { CardComponent } from './card/card.component';
import { HotToastModule, provideHotToastConfig } from '@ngneat/hot-toast';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  declarations: [
    SideBarComponent,
    CardComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    TreeModule,
    HotToastModule.forRoot(),
    SkeletonModule
  ],
  exports:[
    SideBarComponent,
    CardComponent,
    SkeletonComponent
  ],
  providers:[
    provideHotToastConfig()
  ]

})
export class SharedModule { }
