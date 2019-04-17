import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated:boolean;
  
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.authChange.subscribe(authvalue => this.isAuthenticated = authvalue);
  }

  onClose() {
    console.warn('aaa');
    this.closeSidenav.emit();
    //this.Logout();
  }

  Logout(){
    this.closeSidenav.emit();
    this.auth.logout();
      }

}