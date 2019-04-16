import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vacancy } from '../shared/companydata.models';
import { Observable } from 'rxjs';
import * as CompanyActions from './store/company.actions';
import { NgForm } from '@angular/forms';
import { DataService } from '../app.service';
import * as FromCompanyData from './store/company.reducers';
import * as FromAppState from '../appstore/app.reducers';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit, OnDestroy , AfterViewInit {
  CompanyStudentsApplied:Observable<{}[]>;
  CompanyState:  Observable<{ vacancyPosted:Vacancy[], studentsSelected:any[]}>;
  Applicants:Observable<any>;
  userEmail:string;
  StudnentsSelected:any;

constructor(private store:Store<FromAppState.AppState>
  , private dataservice:DataService, private authservice:AuthService,private afauth:AngularFireAuth) { }

  ngOnInit() {

   this.CompanyState =this.store.select('CompanyData');
   
   this.afauth.user.subscribe(user => {
    console.log('cuurent user' + user.email);
    this.userEmail = user.email;
  }, (err) => {
    console.warn('error =>', err)
  });



  }

  ngAfterViewInit(){
    // this.CompanyStudentsApplied = this.dataservice.ViewAppliedStudents(this.userEmail).subscribe()
   
  }

  PostVacancy(f:NgForm){
   let vancancy_posted = new Vacancy(f.value.title, f.value.amount, f.value.qualification, f.value.date );
this.store.dispatch(new CompanyActions.Postvacancy(vancancy_posted));
console.log(vancancy_posted);
this.dataservice.saveVacancies(vancancy_posted,this.userEmail);

  }

  viewStudents(){
    console.log('view=>',this.userEmail);
    this.dataservice.ViewAppliedStudents(this.userEmail).subscribe(x=>{
      this.StudnentsSelected=x;
      console.log(this.StudnentsSelected);
    });
    
  }

  Logout(){
    this.authservice.logout();
  }

  ngOnDestroy(){
    this.authservice.logout();
    
  }

}
