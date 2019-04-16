import * as CompanyActions from './company.actions';
import {Vacancy} from '../../shared/companydata.models';



export interface State  {
vacancyPosted: Vacancy[];
studentsSelected:any[];
}
const initailState : State = {
    vacancyPosted:
    [
    new Vacancy('Basic ',5000,'BSC',22),
    new Vacancy('Advance ',5000,'BSC',21)
    ],
    studentsSelected:['hamza']
}






export function CompanyReducers(state = initailState, action:CompanyActions.CompanyActions){

    switch(action.type){
        case CompanyActions.PostVacancy:
        return {
            ...state,
            vacancyPosted:[...state.vacancyPosted, action.payload ]
        }
        default:
        return state;
    }
}