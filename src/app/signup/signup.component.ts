import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

interface SignupData{
  accountType:string
  user:string
  email:string,
  password:string
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  accountType:string;
  favoriteSeason: string;
 
  accounts: string[] = ['Company', 'Students'];
  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }

  submit(f:NgForm){
let signupdata : SignupData = {
  accountType:this.accountType,
  user:f.value.name,
  email : f.value.email,
  password:f.value.password
  
}

this.authservice.signup(signupdata);
  }
//   setAccountType(ev:any){
// this.accountType = ev.target.value;
// console.log(this.accountType);
//   }

}
