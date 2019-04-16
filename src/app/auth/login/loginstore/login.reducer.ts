
import * as LoginActions from './login.action';

export interface State  {
   UserType:string,
   UserLoggedIn:boolean
    }
    const initailState : State = {
        UserType : null,
        UserLoggedIn:false
    }

    export function LoginReducer(state = initailState, action:LoginActions.LoginActions){

        switch(action.type){
            case LoginActions.TRY_LOGIN:
            return {
                ...state,
                UserType:action.payload,
                UserLoggedIn:true
            }
            default:
            return state;
        }
    }
    