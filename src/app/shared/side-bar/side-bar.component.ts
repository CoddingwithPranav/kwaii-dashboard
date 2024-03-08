import { Component, Input, ViewChild, inject } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  loginService = inject(LoginService);
  sidebarVisible: boolean = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }
  logOut(){
  this.loginService.logOut();
  }

}
