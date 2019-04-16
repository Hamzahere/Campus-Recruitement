import { AuthData } from './shared/authdata.model';
import { Store } from '@ngrx/store';

import { Injectable, EventEmitter } from '@angular/core';
//import { AuthData } from './auth/sign/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as FromAppState from './appstore/app.reducers';
import * as LoginActions from './auth/login/loginstore/login.action'

import { auth } from 'firebase';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './shared/user.model';

import { DataService } from './app.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {


  errMessage =  new Subject<any>();
  private user: User;
  userType: any;
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  userProfileopen = new Subject<string>();
  signInMode = false;
  user_details: any;
  credentialsReady = new Subject<any>();
  x;
  y: Observable<any>;


  constructor(private db: AngularFirestore, private router: Router, public afauth: AngularFireAuth, private store: Store<FromAppState.AppState>, private appservice: DataService) { }


returnUser(){
   return this.afauth.user;
}


  registerUser(authData: AuthData) {
    this.afauth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //this.authSuccessfully();
        this.authChange.next(true);
        console.log(result);
        this.y = this.afauth.user.pipe(map(data => data.email.toString()));
        this.y.subscribe((data) => {
          console.log(data);
        })
        //console.log(this.y);

        this.isAuthenticated = true;
        this.authChange.next(true);
      })
      .catch((result) => {
        console.log(result);
      });


    //let a = this.afauth.user.pipe(map( data => data.email.toString()));
    //console.log(a);

  }

  login(authData: AuthData) {
    console.warn('login working');
    this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((x) => {
        this.authChange.next(true);
        this.isAuthenticated = true;
        // this.authSuccessfully();

        this.store.select('LoginData').subscribe(x => {
          console.log(x);
          this.userType = x.UserType;
        }, () => {
          console.log('err')
        }, () => {

          this.store.dispatch(new LoginActions.tryLogin(this.userType));
        })

        if (this.userType == 'Student')
          this.router.navigate(['studentProfile']);
        // console.warn(x);

        else if (this.userType == 'Company')
          this.router.navigate(['companyProfile']);


      }).catch((result) => {
        console.log(result);
        this.errMessage.next(result);
      })

    //previouslt this was this.x = this.afauth.user.pipe(map(data=>data.email.toString()));
    this.x = this.afauth.user.pipe(map(data => data.email.toString()));
    // this.db.collection('users').add(authData);

  }

  logout() {
    // this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.afauth.auth.signOut();

  }



  isAuth() {
    return this.isAuthenticated;
  }

  signup(a: { accountType: string, user: string, email: string, password: string }) {

    this.afauth.auth.createUserWithEmailAndPassword(a.email, a.password).then(x => {
      this.authChange.next(true);
      console.log(x);
      this.appservice.addUser(a);
    })
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    //this.router.navigate(['/user-profile']);
  }

  


}

