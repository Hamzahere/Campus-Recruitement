
import * as StudentActions from './studentprofile.action';


export interface State  {
    latestDegree:string,
    skillset:any[],
    CompaniesSelected:any[],
    appliedfor:any[]
    }


const initialState : State = {
    latestDegree: '',
    skillset:['college'],
    CompaniesSelected:['none'],
    appliedfor:['none']

}


export function StudentReducer(state = initialState, action:StudentActions.StudentActions){

    switch(action.type){
        case StudentActions.SET_PROFILE :
        {
            return {
                ...state,
                latestDegree:action.payload.latestdegree,
                skillset : [...state.skillset, action.payload.skillset]
            }
        }

        case StudentActions.APPLY_FOR_A_COMPANY:
        {
            return {
                ...state,
                appliedfor : action.payload.companyname
            }
        }

        default:
        return state;
    }
}