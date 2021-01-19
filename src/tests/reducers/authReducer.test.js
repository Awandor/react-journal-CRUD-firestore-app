import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe( 'Pruebas de authReducer', () => {

  const testState = {
    auth: {
      uid: 'EQmm15nuu7fH1AC6nUPHlqqkXfv2',
      name: 'Test Name'
    },
    ui: {
      loading: false,
      msgError: ''
    },
    notes: {
      notes: [ {
        id: '2ReLw5ogoWR7luHObWQj',
        body: 'Hello',
        date: 1609766312821,
        title: 'Note title'
      } ],
      active: null
    }
  };

  test( 'debe retornar el estado por defecto', () => {

    const state = authReducer( testState, {} ); // enviamos una acción vacía para ver el resultado por defecto

    expect( state ).toEqual( testState );

  } );

  test( 'debería realizar el logout', () => {

    const action = {
      type: types.logout
    };

    const state = authReducer( testState, action ); // enviamos una acción nueva

    // console.log( state );

    expect( state ).toEqual( {} );

  } );

  test( 'debería realizar el login', () => {

    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Alguien'
      }
    };

    const state = authReducer( initialState, action ); // enviamos una acción nueva

    // console.log( state );

    expect( state ).toEqual( { uid: 'abc', name: 'Alguien' } );

  } );



} );
