import { mount } from 'enzyme';
import { RegisterScreen } from '../../components/authentication/RegisterScreen';
import { Provider } from 'react-redux';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Creamos el mock Store

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore( initialState );

// const wrapper = mount( <Provider store={store}><MemoryRouter><LoginScreen /></MemoryRouter></Provider> );
const wrapper = mount( <Provider store={store}><MemoryRouter><RegisterScreen /></MemoryRouter></Provider> );


describe( 'Pruebas en <RegisterScreen />', () => {

    test( 'el componente debería mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debe de hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find( 'input[name="email"]' ); // selección por name

        emailField.simulate( 'change', {
            target: {
                value: '',
                name: 'email'
            }
        } );

        // Simulamos el submit con simulate

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        const actions = store.getActions();

        // console.log( actions );

        expect( actions[0] ).toEqual( { type: types.uiSetError, payload: 'Email is not valid' } );
        
    } );

    test( 'debería mostrar la caja de alerta con el error', () => {

        // El state no cambia por simular submit porque el test no está conectado a los reducers
        // Por ello cambiamos manualmente el state
        
        const initialState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid'
            }
        };
        
        const store = mockStore( initialState );
        
        const wrapper = mount( <Provider store={store}><MemoryRouter><RegisterScreen /></MemoryRouter></Provider> );

        const errorBox = wrapper.find( '.auth__alert-error' );

        // console.log( errorBox );

        expect( errorBox.exists() ).toBe( true );

        expect( errorBox.text().trim() ).toBe( initialState.ui.msgError );
        
    } );
    
    

} );
