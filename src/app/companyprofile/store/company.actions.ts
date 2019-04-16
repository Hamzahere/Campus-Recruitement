import {Action} from '@ngrx/store';
import {Vacancy} from '../../shared/companydata.models';

export const PostVacancy = 'PostVacancy';
export const DeleteVacancy = 'DeleteVacancy';

export class Postvacancy implements Action{

   readonly type =  PostVacancy;
  constructor(public payload:Vacancy){}
}

export type CompanyActions  = Postvacancy;