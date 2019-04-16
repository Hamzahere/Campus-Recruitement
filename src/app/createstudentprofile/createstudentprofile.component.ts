import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as StudentActions from './studentstore/studentprofile.action';
import * as FromAppState from '../appstore/app.reducers';
import { DataService } from '../app.service';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-createstudentprofile',
  templateUrl: './createstudentprofile.component.html',
  styleUrls: ['./createstudentprofile.component.css']
})
export class CreatestudentprofileComponent implements OnInit, OnDestroy {
  studentCurrentInfo:any;
  Companies: Observable<any>;
  selectedCompany: string;
  userEmail : string

  constructor(private afauth: AngularFireAuth,
    private store: Store<FromAppState.AppState>,
    private service: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.afauth.user.subscribe(user => {
      console.log('cuurent user' + user.email);
      this.userEmail = user.email;
    }, (err) => {
      console.warn('error =>', err)
    })

    this.Companies = this.service.CompanyDatafromFirebase;
  }

  saveProfile(f: NgForm) {

    let setData = {
      latestdegree: f.value.degree,
      skillset: [f.value.skill]
    };

    this.store.dispatch(new StudentActions.setProfile(setData));

    this.store.select('StudentData').subscribe(x => {
      this.studentCurrentInfo = x;
    })
  }

  SelectCompany(company: any) {
    this.selectedCompany = company.name;
  }

  Applyforjob(f:NgForm){
    console.log(f.value.names);
this.service.ApplyforJob(this.selectedCompany,f.value.names);
  
}
// this.service.Companies.add(f);

  

  Logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authService.logout();
  }


}
