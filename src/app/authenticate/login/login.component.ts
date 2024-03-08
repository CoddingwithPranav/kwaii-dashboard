import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginService = inject(LoginService)
email!:string;
password!:string;

router = inject(Router);

Login(){
  this.loginService.login(this.email, this.password);

}
}
