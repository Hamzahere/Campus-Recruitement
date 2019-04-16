import * as CompanyData from '../companyprofile/store/company.reducers';
import * as StudentData from '../createstudentprofile/studentstore/studentprofile.reducer';
import * as LoginData from '../auth/login/loginstore/login.reducer'
import { ActionReducerMap } from '@ngrx/store';


export interface AppState  {
    CompanyData : CompanyData.State,
    StudentData : StudentData.State,
    LoginData : LoginData.State
    }

    // export const reducers : ActionReducerMap<AppState> = {

    //     CompanyData: CompanyData.CompanyReducers,
    //     StudentData: StudentData.StudentReducer
    // };