import { Component, ViewChild, inject } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 loginService = inject(LoginService);
 ngOnInit(){
  this.loginService.checkUserLoggedIn();
 }
}
