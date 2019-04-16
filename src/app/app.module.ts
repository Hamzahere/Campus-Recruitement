import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './app.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatestudentprofileComponent } from './createstudentprofile/createstudentprofile.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StoreModule } from '@ngrx/store';
import { CompanyReducers } from './companyprofile/store/company.reducers';
import { StudentReducer} from './createstudentprofile/studentstore/studentprofile.reducer'
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginReducer } from './auth/login/loginstore/login.reducer';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
    CreatestudentprofileComponent,
    CompanyprofileComponent,
    StudentprofileComponent,
    AdminComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,

    StoreModule.forRoot({CompanyData:CompanyReducers, StudentData:StudentReducer, LoginData:LoginReducer})
    
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
