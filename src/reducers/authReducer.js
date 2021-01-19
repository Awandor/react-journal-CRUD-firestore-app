import { types } from "../types/types";

// Es importante que el state no sea undefined por ello lo inicializamos como un objeto vacío

export const authReducer = ( state = {}, action )=>{

    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };

        case types.logout:
            return {};
    
        default:
            return state;
    }

};