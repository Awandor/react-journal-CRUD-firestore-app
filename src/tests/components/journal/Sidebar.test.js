import { mount } from 'enzyme';

import { Sidebar } from "../../../components/journal/Sidebar";

import { Provider } from 'react-redux';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules

import thunk from 'redux-thunk';

import { startLogoutAction } from '../../../actions/authActions';
import { startAddNewNoteAction } from '../../../actions/notesActions';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );


// Creamos el mock Store

const initialState = {
    auth: {
        uid: '6542',
        name: 'Dan'
    },
    ui:{
        loading: false,
        msgError: null
    },

    // Debemos proveer active y notes o nos da error
    notes: {

        /* active: {
            id: 'ABC'
        }, */

        notes: []
    }
};

let store = mockStore( initialState );

jest.mock( '../../../actions/authActions', ()=>( {

    startLogoutAction: jest.fn()

} ) );

jest.mock( '../../../actions/notesActions', ()=>( {

    startAddNewNoteAction: jest.fn()

} ) );

// Vamos a hacer un mock del dispatch

store.dispatch = jest.fn();

describe( 'Pruebas en <Sidebar />', () => {

    const wrapper = mount( <Provider store={store}><Sidebar /></Provider> );

    beforeEach( () => {

        // store = mockStore( initialState ); // También funciona
    
        store.clearActions();

        // Es buena práctica limpiar los mocks

        jest.clearAllMocks();
    
      } );


  test( 'debería mostarse correctamente', () => {

    expect( wrapper ).toMatchSnapshot();

  } );

  test( 'debería llamar startLogoutAction', () => {

    // Simulamos el click con enzyme

    wrapper.find( '.btn' ).prop( 'onClick' )();

    expect( startLogoutAction ).toHaveBeenCalled();

  } );

  test( 'debería llamar startAddNewNoteAction', () => {

    // Simulamos el click con enzyme

    wrapper.find( '.fa-calendar-plus' ).prop( 'onClick' )();

    expect( startAddNewNoteAction ).toHaveBeenCalled();

  } );

} );
