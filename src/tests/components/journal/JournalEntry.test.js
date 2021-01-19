import { JournalEntry } from '../../../components/journal/JournalEntry';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

// Como el componente hace uso del State necesitamos trabajar con el mock

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { activeNoteStoreAction } from '../../../actions/notesActions';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Creamos el mock Store

const initialState = {};
  
let store = mockStore( initialState );

// Vamos a hacer un mock del dispatch

store.dispatch = jest.fn();


describe( 'Pruebas en <JournalEntry />', () => {

  const note = {
    id: '1234',
    date: 1609766312821,
    title: 'new title',
    body: 'new body',
    url: ''
  };
  const wrapper = mount( <Provider store={store}><JournalEntry key="5452535" {...note} /></Provider> );

  test( 'debería mostrarse correctamente', () => {

    expect( wrapper ).toMatchSnapshot();

  } );

  test( 'debería activar la nota', () => {
      
    wrapper.find( '.journal__entry' ).prop( 'onClick' )();

    expect( store.dispatch ).toHaveBeenCalled();

    expect( store.dispatch ).toHaveBeenCalledWith( activeNoteStoreAction( note.id, { ...note } ) );

  } );
  

} );
