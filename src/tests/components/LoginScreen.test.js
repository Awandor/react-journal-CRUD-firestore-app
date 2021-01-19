import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../components/authentication/LoginScreen';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLoginAction, startLoginEmailPasswordAction } from '../../actions/authActions';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );


jest.mock( '../../actions/authActions', ()=>( {

    startGoogleLoginAction: jest.fn(),

    startLoginEmailPasswordAction: jest.fn()

} ) );

// Creamos el mock Store

const initialState = {
    auth: {},
    ui:{
        loading: false,
        msgError: null
    }
};

let store = mockStore( initialState );

// Vamos a hacer un mock del dispatch

store.dispatch = jest.fn();

// Necesitamos meter el componente dentro de <Provider>

// Como <LoginScreen /> hace uso de <Link /> debemos de envolver con <MemoryRouter>

const wrapper = mount( <Provider store={store}><MemoryRouter><LoginScreen /></MemoryRouter></Provider> );


describe( 'Pruebas en <LoginScreen />', () => {

    beforeEach( () => {

        // store = mockStore( initialState ); // También funciona
    
        store.clearActions();

        // Es buena práctica limpiar los mocks

        jest.clearAllMocks();
    
      } );

  test( 'el componente debería mostrarse correctamente', () => {

    expect( wrapper ).toMatchSnapshot();

  } );

  test( 'debería disparar la acción de startGoogleLoginAction', () => {

    // Simulamos el click con enzyme

    wrapper.find( '.google-btn' ).prop( 'onClick' )();

    expect( startGoogleLoginAction ).toHaveBeenCalled();
      
  } );
  
test( 'debería disparar la acción de startLoginEmailPasswordAction', () => {
    
    // Simulamos el click con enzyme

    wrapper.find( 'form' ).prop( 'onSubmit' )( { preventDefault(){} } );

    expect( startLoginEmailPasswordAction ).toHaveBeenCalledWith( 'test@test.es', '123456' );

} );



} );
