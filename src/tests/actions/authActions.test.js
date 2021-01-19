import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { loginAction, logout, startLoginEmailPasswordAction, startLogoutAction, startRegisterEmailPasswordNameAction } from "../../actions/authActions";
import { startAddNewNoteAction } from '../../actions/notesActions';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Creamos el mock Store

const initialState = {
  auth: {
    uid: 'TESTING',
    name: 'Pedro'
  }
};

let store = mockStore( initialState );

describe( 'Pruebas con las Acciones de authActions', () => {

  beforeEach( () => {

    // store = mockStore( initialState ); // También funciona

    store.clearActions();

  } );

  test( 'login y logout deberían crear la acción respectiva', () => {

    // Estas Acciones no son asíncronas

    const myLoginAction = loginAction( 'TESTING', 'Pedro' );
    const myLogoutAction = logout( 'TESTING', 'Pedro' );

    expect( myLoginAction ).toEqual( {
      type: types.login,
      payload: { uid: 'TESTING', displayName: 'Pedro' }
    } );

    expect( myLogoutAction ).toEqual( {
      type: types.logout
    } );

  } );

  test( 'debería realizar el startLogoutAction', async() => {

    // Con el mock podemos usar dispatch, que es asíncrono

    await store.dispatch( startLogoutAction() );

    const actions = store.getActions();

    // console.log( actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.logout
    } );

    expect( actions[ 1 ] ).toEqual( {
      type: types.notesLogoutCleaning
    } );

  } );

  test( 'debería iniciar el startLoginEmailPasswordAction', async() => {

    // Con el mock podemos usar dispatch, que es asíncrono

    // Hemos creado este usuario en el proyecto de Firebase que usamos para testing

    await store.dispatch( startLoginEmailPasswordAction( 'testing@test.es', '123456' ) );

    const actions = store.getActions();

    // console.log( actions ); // Hemos añadido un return a la llamada a firebase en startLoginEmailPasswordAction

    // Antes sólo salía una Acción

    expect( actions[ 0 ] ).toEqual( {
      type: types.uiStartLoading
    } );

    expect( actions[ 1 ] ).toEqual( {
      type: types.login,
      payload: { uid: 'GLjPY13EJ6R9JlpCY106KqyyFOr2', displayName: null }
    } );

    expect( actions[ 2 ] ).toEqual( {
      type: types.uiFinishLoading
    } );

  } );

  test( 'debería iniciar startRegisterEmailPasswordNameAction', async() => {

    // Con el mock podemos usar dispatch, que es asíncrono

    // Lo dejamos comentado pues se genera el mismo usuario cada vez y Firebase lo rechaza, aunque funciona

    /* await store.dispatch( startRegisterEmailPasswordNameAction( 'new@test.es', '123456', '' ) );

    const actions = store.getActions();

    console.log( actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.login,
      payload: { uid: expect.any( String ), displayName: null }
    } ); */

  } );


} );
