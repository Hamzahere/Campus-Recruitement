import {
    CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot
}
    from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromAppState from '../appstore/app.reducers';
import * as LoginActions from './login/loginstore/login.action';
import { flushModuleScopingQueueAsMuchAsPossible } from '@angular/core/src/render3/jit/module';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate, OnInit {
    loginStatus: boolean;
    constructor(private store: Store<FromAppState.AppState>, private router: Router, public afAuth: AngularFireAuth) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        return this.afAuth.user.pipe(
            switchMap(user => user ? of(true) : of(false)),
            catchError(e => {
                this.router.navigate(['login']);
                return of(false)
            })
        );
        //  return this.loginStatus;

    }




    ngOnInit() {
        // this.store.select('LoginData').subscribe(x=>{
        //     this.loginStatus = x.UserLoggedIn
        // })
    }

}