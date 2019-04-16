import {Action} from '@ngrx/store';



export const SET_PROFILE = 'SET_PROFILE';
export const APPLY_FOR_A_COMPANY = 'APPLY_FOR_A_COMPANY';

export class setProfile implements Action{

    readonly type =  SET_PROFILE ;
   constructor(public payload:{latestdegree:string, skillset:string[]}){}
 }

 export class applyForCompany implements Action{

    readonly type =  APPLY_FOR_A_COMPANY ;
   constructor(public payload:{ companyname:string}){}
 }

 export type StudentActions = setProfile | applyForCompany;