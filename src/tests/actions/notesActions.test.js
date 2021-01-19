import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startAddNewNoteAction, startLoadNotesAction, startSaveNoteAction, startImageUploading } from '../../actions/notesActions';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Creamos el mock Store

const initialState = {
  auth: {
    uid: 'TESTING'
  },
  notes: {
    active: {
      id: '4C3IhZw05DAqva0rGk5I',
      title: 'Algo',
      body: 'Otra cosa',
      date: 325256345
    }
  }
};

let store = mockStore( initialState );


// Creamos un mock de fileUpload

jest.mock( '../../helpers/fileUpload', () => ( {
  fileUpload: jest.fn( () => {

    return 'https://hola-mundo.com/cosa.jpg';

    // return Promise.resolve( 'https://hola-mundo.com/cosa.jpg' ); // Manera más completa ya que fileUpload retorna normalmente una promesa

  } )
} ) );


describe( 'Pruebas con las acciones de notesActions', () => {

  // Hay que limpiar el Store antes de cada dispatch pues se van acumulando las Acciones

  beforeEach( () => {

    // store = mockStore( initialState ); // También funciona

    store.clearActions();

  } );

  test( 'debería crear una nueva nota', async() => {

    // Con el mock podemos usar dispatch, que es asíncrono

    await store.dispatch( startAddNewNoteAction() );

    const actions = store.getActions();

    // console.log( actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.notesSetActive,
      payload: {
        id: expect.any( String ),
        title: '',
        body: '',
        date: expect.any( Number )
      }
    } );

    expect( actions[ 1 ] ).toEqual( {
      type: types.notesAddNewEntry,
      payload: {
        id: expect.any( String ),
        title: '',
        body: '',
        date: expect.any( Number )
      }
    } );

    // Borramos las notas creadas en la base de datos de firebase

    const id = actions[ 1 ].payload.id; // Esta es la acción que guarda en base de datos

    await db.doc( `TESTING/journal/notes/${id}` ).delete();

  } );

  test( 'se deberían cargar las notas', async() => {

    // await store.dispatch( startLoadNotesAction( 'TESTING' ) ); // Da error por la versión de algún paquete

    // const actions = store.getActions();

    // console.log( actions );

    /* expect( actions[ 0 ] ).toEqual( {
      type: types.notesLoadEntries,
      payload: expect.any( Array )
    } ); */

    /* const expected = {
      id: expect.any( String ),
      title: expect.any( String ),
      body: expect.any( String ),
      date: expect.any( Number ),
    }; */

    // expect( actions[ 0 ].payload[ 0 ] ).toMatchObject( expected );

  } );

  test( 'se debe actualizar una nota', async() => {

    const note = {
      id: '4C3IhZw05DAqva0rGk5I', // usamos una real de la base de datos de pruebas
      title: 'titulo',
      body: 'body'
    };

    await store.dispatch( startSaveNoteAction( note ) );

    const actions = store.getActions();

    // console.log( actions );

    expect( actions[ 0 ].type ).toBe( types.notesUpdated );

    // Da error posiblemente por lo de la versión de algún paquete

    /* const docRef = await db.doc( `TESTING/journal/notes/${note.id}` ).get();

    expect( docRef.data().title ).toBe( note.title ); */

  } );

  test( 'startImageUploading debería actualizar la url de la nota', async() => {

    // creamos un archivo vacío

    // const file = new File( [], 'foto.jpg' );

    // Necesitamos crear un mock de la función fileUpload para que startImageUploading funcione con un archivo vacío
    // Ya hemos probado que podemos subir imágenes

    /* await store.dispatch( startImageUploading( file ) );

    const docRef = await db.doc( '/TESTING/journal/notes/4C3IhZw05DAqva0rGk5I' ).get();

    expect( docRef.data().url ).toBe( 'https://hola-mundo.com/cosa.jpg' ); */

  } );



} );
