import {Action} from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN ';


export class tryLogin implements Action{

   readonly type =  TRY_LOGIN;
  constructor(public payload:string){}
}

export type LoginActions  = tryLogin;