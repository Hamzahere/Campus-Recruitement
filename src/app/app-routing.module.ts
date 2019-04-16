import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { CreatestudentprofileComponent } from './createstudentprofile/createstudentprofile.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'', component:WelcomeComponent
  },
  {
path:'login', component:LoginComponent

},
{
  path:'dashboard', component:DashboardComponent
},
{
  path:'companyProfile', component:CompanyprofileComponent, canActivate:[AuthGuard]
},
{
  path:'studentProfile', component:CreatestudentprofileComponent, canActivate:[AuthGuard]
},
{
  path:'admin', component:AdminComponent, canActivate:[AuthGuard]
},
{
  path:'signup', component:SignupComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
