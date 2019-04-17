import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
user:string = null;
isAuthenticated:boolean;
@Output() sidenavToggle = new EventEmitter<void>();

  constructor(private afauth:AngularFireAuth,private auth:AuthService) { 
  }

  ngOnInit() {
//  this.afauth.user.subscribe(user => {
//   console.log('cuurent user' + user.email);
//   this.user = user.email;
// }, (err) => {
//   this.user = null;
//   console.warn('error =>', err)
// })

this.auth.authChange.subscribe(authvalue => this.isAuthenticated = authvalue);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
 

 

  Logout(){
this.auth.logout();
  }


}
