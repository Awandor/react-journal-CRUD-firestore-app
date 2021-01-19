import { NoteScreen } from "../../../components/notes/NoteScreen";

import { mount } from 'enzyme';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { Provider } from "react-redux";
import { activeNoteStoreAction } from "../../../actions/notesActions";

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

jest.mock( '../../../actions/notesActions', ()=>( {

  activeNoteStoreAction: jest.fn()

} ) );


// Creamos el mock Store

const initialState = {
  auth: {
    uid: '6542',
    name: 'Dan'
  },
  ui: {
    loading: false,
    msgError: null
  },

  // Debemos proveer active y notes o nos da error
  notes: {

    active: {
      id: 'fdwf42r',
      title: 'Título',
      body: 'Hello',
      date: 1609766312821
    },

    notes: [ {
      id: 'fdwf42r',
      title: 'Título',
      body: 'Hello',
      date: 1609766312821
    } ]
  }
};

let store = mockStore( initialState );

// Vamos a hacer un mock del dispatch

store.dispatch = jest.fn();

describe( 'Pruebas en <NoteScreen />', () => {

  const wrapper = mount( <Provider store={store}><NoteScreen /></Provider> );

  beforeEach( () => {

    // store = mockStore( initialState ); // También funciona

    // store.clearActions();

    // Es buena práctica limpiar los mocks

    // jest.clearAllMocks();

  } );


  test( 'debería mostarse correctamente', () => {

    expect( wrapper ).toMatchSnapshot();

  } );

  test( 'should debería dispararse activeNoteStoreAction', () => {

    // Simulamos un cambio en el input title enviando el objeto evento
    
    wrapper.find( 'input[name="title"]' ).simulate( 'change', {
      target: {
        name: 'title',
        value: 'Hola de nuevo'
      }
    } );

    expect( activeNoteStoreAction ).toHaveBeenCalled();

    expect( activeNoteStoreAction ).toHaveBeenCalledWith( 'fdwf42r', {
      id: 'fdwf42r',
      title: 'Hola de nuevo', // El cambio de la simulación
      body: 'Hello',
      date: 1609766312821
    } );

    // Si se dispara una función más de una vez y sólo nos interesa la última vez
    // podemos usar toHaveBeenLastCalledWith
  
} );
  

} );
