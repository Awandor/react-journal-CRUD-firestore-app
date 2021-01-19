import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
};

export const notesReducer = ( state = initialState, action ) => {

  // console.log( 'notesReducer action.type', action.type );

  switch ( action.type ) {
    case types.notesSetActive:

      return {
        ...state,
        active: {
          ...action.payload
        }
      };

    case types.notesAddNewEntry:

      return {
        ...state,
        notes: [ action.payload, ...state.notes ]
      };

    case types.notesLoadEntries:

      return {
        ...state,
        notes: [ ...action.payload ]
      };

    case types.notesUpdated:

      let notesUpdated = state.notes.map( ( element ) => {

        if ( element.id === action.payload.id ) {

          return action.payload.note;

        }

        return element;

      } );

      // const notesUpdated = state.notes.map( note => ( note.id === action.payload.id ) ? action.payload.note : note );

      console.log( notesUpdated );

      return {
        ...state,
        notes: notesUpdated
      };

    case types.notesDeleteEntry:

      return {
        ...state,
        notes: state.notes.filter( note => ( note.id !== action.payload.id ) ),
        active: null
      };

    case types.notesLogoutCleaning:

      return {
        ...state,
        notes: [],
        active: null
      };

    default:

      return state;
  }

};
