import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject } from 'rxjs';


import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  router = inject(Router);
  loggedIn :WritableSignal<boolean> = signal(false);


  constructor(private authService:AngularFireAuth , private toastr: HotToastService) {

   }

  login(email:string, password:string){
    this.authService.signInWithEmailAndPassword(email, password).then(()=>{
        this.toastr.success("Logged in successfully")
        this.loadUser();

    }).catch((e)=>{
      this.toastr.error("Invalid Cradentials")
    })
  }
  loadUser(){
    this.authService.authState.subscribe(user =>{
    // here you can request for user info like picture
    })
    this.router.navigate(['dashboard'])
  }
  logOut(){
    this.authService.signOut().then(()=>{
        this.toastr.success('User logged Out SuccessFully')
        this.loggedIn.set(false)
        this.router.navigate(['/login']) ;

        localStorage.removeItem('user');

    })
  }

 checkUserLoggedIn(){
  this.authService.authState.subscribe(res =>{
    if(res?.uid){
      this.loggedIn.set(true);
    }
  })
 }

}
