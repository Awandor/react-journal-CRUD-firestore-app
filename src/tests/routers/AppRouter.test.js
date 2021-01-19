import { mount } from 'enzyme';
import { Provider } from 'react-redux';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { loginAction } from '../../actions/authActions';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

jest.mock( '../../actions/authActions', () => ( {

    loginAction: jest.fn()

} ) );

// Creamos el mock Store

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },

    // Debemos proveer active y notes o nos da error
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore( initialState );

// Vamos a hacer un mock del dispatch

store.dispatch = jest.fn();

describe( 'Pruebas en <AppRouter />', () => {

    test( 'debería llamar al loginAction si estoy autenticado', async () => {

        let user;

        // Hay varios procesos asíncronos

        // Copiamos de LoginScreen.test y pregamos arriba y aquí

        // Necesitamos meter el componente dentro de <Provider>

        // Como <AppRouter /> hace uso de <Link /> debemos de envolver con <MemoryRouter>

        // Nos sale un error que nos dice que tenemos que envolver todo dentro de act

        await act( async() => {

            // debe ser async para hacer el login

            const userCredentials = await firebase.auth().signInWithEmailAndPassword( 'testing@test.es', '123456' );

            // console.log( userCredentials );

            user = userCredentials.user;

            const wrapper = mount( <Provider store={store}><MemoryRouter><AppRouter /></MemoryRouter></Provider> );

        } );

        expect( loginAction ).toHaveBeenCalled();


    } );


} );
