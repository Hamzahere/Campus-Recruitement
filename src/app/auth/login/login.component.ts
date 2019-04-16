import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/auth.service';
import { AuthData } from '../../shared/authdata.model';
import { Store } from '@ngrx/store';
import * as FromAppState  from '../../appstore/app.reducers';
import * as LoginActions from './loginstore/login.action';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userType:any;
errShow:any = '';
  constructor(private authservice:AuthService,private store:Store<FromAppState.AppState>,private router:Router) { }

  ngOnInit() {
    this.authservice.errMessage.subscribe(errMess=>{
      this.errShow = errMess;
    })
  }

  setUserType(ev:any){
    //this.admin = 'ad';
    console.log(ev.target.value);
    const user = ev.target.value;
    this.store.dispatch(new LoginActions.tryLogin(user));
    // this.store.select('LoginData').subscribe(x=>{
    //   console.log(x);
    // })
    //console.warn(this.userType, f.value.name);
  }

  Login(f:NgForm){

    this.AdminLogin(f.value.email,f.value.password);
    let authdata:AuthData = {
      email:f.value.email,
      password : f.value.password
    }
 console.log(f.value.email);
 console.log(f.value.password);
 this.authservice.login(authdata);
  }

  AdminLogin(adminemail:string,adminpass:string){
    if(adminemail == 'admin123@gmail.com' && adminpass == 'reserved'){
this.router.navigate(['/admin']);
    }
  }

}
