// ========================================
// Notes Actions
// ========================================

import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

// Vamos a nombrar las funciones asíncronas con start...

export const startAddNewNoteAction = () => {

  // Como es una tarea asíncrona retornamos un callback, el primer argumento es dispatch aunque podemos ponerle el nombre que queramos
  // el segundo argumento es una función que retorna el state muy parecido a useSelect, también podemos usar el nombre que queramos
  // estos dos argumentos nos los da React

  return async( dispatch, getState ) => {

    // const state = getState();

    // console.log( state );

    const { uid } = getState().auth;

    // Creamos la nueva nota que vamos a guardar

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    try {

      // importamos la referencia a la base de datos de Firebase y usamos sus métodos

      // No hace falta definir la estructura previamente en Firebase, se genera automáticamente al guardar por primera vez

      const doc = await db.collection( `${uid}/journal/notes` ).add( newNote ); // add retorna una promesa

      dispatch( activeNoteStoreAction( doc.id, newNote ) );

      dispatch( addNewNoteStoreAction( doc.id, newNote ) );

    } catch ( err ) {

      console.log( 'error', err );

      Swal.fire( 'Error', 'FirebaseError', 'error' );

    }

  };

};

// No necesita exportarse pero sí para las pruebas

export const activeNoteStoreAction = ( id, note ) => ( {
  type: types.notesSetActive,
  payload: {
    id,
    ...note
  }
} );

export const addNewNoteStoreAction = ( id, note ) => ( {
  type: types.notesAddNewEntry,
  payload: {
    id,
    ...note
  }
} );

export const getNotesStoreAction = notes => ( {
  type: types.notesLoadEntries,
  payload: notes
} );

export const startLoadNotesAction = uid => {

  return async( dispatch ) => {

    // Cargamos las notas del usuario

    const notes = await loadNotes( uid ); // loadNotes retorna una promesa

    dispatch( getNotesStoreAction( notes ) );

  };

};

/* export const activateEntryAction = ( id ) => {

  return async( dispatch, getState ) => {

    const { notes } = getState().notes;

    console.log( 'activateEntryAction', notes );

    // Filtramos el arreglo para obtener el objeto que vamos a guardar como activo

    const activeNote = notes.filter( element => {

      return ( element.id === id ) || null;

    } );

    console.log( 'activeNote', activeNote[ 0 ] );

    // Creamos la nueva nota que vamos a setear en el Store como active



    // importamos la referencia a la base de datos de Firebase y usamos sus métodos

    // No hace falta definir la estructura previamente en Firebase, se genera automáticamente

    // const doc = await db.collection( `${uid}/journal/notes` ).add( newNote ); // add retorna una promesa

    // dispatch( activeNoteStoreAction( doc.id, newNote ) );

  };

}; */

export const startSaveNoteAction = ( note ) => {

  return async( dispatch, getState ) => {

    try {

      const { uid } = getState().auth;

      // Verificamos que url no sea undefined

      if ( !note.url ) {

        delete note.url;

      }

      // Lo clonamos para no modificar note, pues borramos el id

      const noteToFirestore = {...note };

      delete noteToFirestore.id; // Para Firestore no necesitamos el id

      await db.doc( `${uid}/journal/notes/${note.id}` ).update( noteToFirestore );

      // dispatch( startLoadNotesAction( uid ) ); // Esto carga de nuevo todo el panel lateral, sólo debería usarse para una paginación

      dispatch( refreshSidebarNoteStoreAction( note.id, note ) ); // necesitamos que la nota tenga el id, por eso no podemos usar noteToFirestore

      Swal.fire( 'Saved', note.title, 'success' );

    } catch ( err ) {

      console.log( 'error', err );

      Swal.fire( 'Error', 'FirebaseError', 'error' );

    }


  };

};

export const refreshSidebarNoteStoreAction = ( id, note ) => {

  return {
    type: types.notesUpdated,
    payload: {
      id,
      note
    }
  };

};

export const startImageUploading = ( file ) => {

  return async( dispatch, getState ) => {

    const { active: activeNote } = getState().notes;

    // console.log( file );

    // console.log( activeNote );



    try {

      Swal.fire( {
        title: 'Uploading',
        text: 'Please wait',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {

          Swal.showLoading();

        }
      } );

      const fileUrl = await fileUpload( file );

      console.log( 'fileUrl', fileUrl );

      activeNote.url = fileUrl;

      dispatch( startSaveNoteAction( activeNote ) );

      Swal.fire( 'Saved', 'Image saved', 'success' );

    } catch ( err ) {

      console.log( 'error', err );

      Swal.fire( 'Error', 'FirebaseError', 'error' );

    }

  };

};

export const startDeleteNoteAction = ( id ) => {

  console.log( id );

  return async( dispatch, getState ) => {

    const uid = getState().auth.uid;

    // Delete from Firebase

    try {

      await db.doc( `${uid}/journal/notes/${id}` ).delete();

      dispatch( deleteNoteStoreAction( id ) );

      Swal.fire( 'Deleted', 'The note has been deleted', 'success' );

    } catch ( error ) {

      console.log( error );

      throw error;

    }


  };

};

export const deleteNoteStoreAction = ( id ) => ( {
  type: types.notesDeleteEntry,
  payload: { id }
} );

export const deleteAllNoteStoreAction = () => ( {
  type: types.notesLogoutCleaning
} );
