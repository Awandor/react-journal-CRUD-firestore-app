// ========================================
// Authentication Actions
// ========================================

import { types } from '../types/types';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoadingAction, startLoadingAction } from './uiActions';

import Swal from 'sweetalert2';
import { deleteAllNoteStoreAction } from './notesActions';

/* export const loginAction = ( uid, displayName ) => {

    return { type: types.login, payload: { uid, displayName } };

}; */

export const loginAction = ( uid, displayName ) => ( { type: types.login, payload: { uid, displayName } } );

export const startLoginEmailPasswordAction = ( email, password ) => {

  // La diferencia es que va a retornar un callback, esto es de la documentación de thunk, así se hace cualquier tarea asíncrona

  return ( dispatch ) => {

    // dispatch envía la acción a todos los reducers hasta que da con el que tiene el tipo adecuado que lo ejecuta cambiando el state

    // Aquí se pueden hacer varios dispatch

    /* setTimeout( () => {

      // Dispara una Acción síncrona una vez se resuelve la Acción asíncrona

      dispatch( loginAction( 123, 'Pedro' ) );

    }, 3500 ); */

    dispatch( startLoadingAction() );

    // Vamos a hacer que firebase retorne para las pruebas y ver los retornos de las acciones

    return firebase.auth().signInWithEmailAndPassword( email, password ).then( ( { user } ) => {

      dispatch( loginAction( user.uid, user.displayName ) );

      // Aquí podríamos realizar dispatch de varias cosas

      dispatch( finishLoadingAction() );

    } ).catch( err => {

      console.log( err );

      dispatch( finishLoadingAction() );

      Swal.fire( {
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Close'
      } );

    } );

  };

};

export const startRegisterEmailPasswordNameAction = ( email, password, name ) => {

  // Como es una acción asíncrona retornamos un callback

  return ( dispatch ) => {

    return firebase.auth().createUserWithEmailAndPassword( email, password ).then( async( { user } ) => {

      // console.log( 'createUserWithEmailAndPassword', user );

      // Firebase no nos retorna el displayName, nos lo da como null

      // Con updateProfile podemos añadir el nombre, retorna una promesa que podemos manejar con then pero lo vamos a hacer con async await

      await user.updateProfile( { displayName: name } );

      dispatch( loginAction( user.uid, user.displayName ) );

      // Aquí podríamos realizar dispatch de varias cosas

    } ).catch( err => {

      console.log( err );

      Swal.fire( {
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Close'
      } );

      throw err; // Para las pruebas estamos valorando el error

    } );

  };

};

export const startGoogleLoginAction = () => {

  // Como es una tarea asíncrona retornamos un callback que tiene dispatch como argumento que nos lo provee thunk

  return ( dispatch ) => {

    // Esto es una promesa

    firebase.auth().signInWithPopup( googleAuthProvider ).then( resp => {

      console.log( resp );

      dispatch( loginAction( resp.user.uid, resp.user.displayName ) );

    } );

  };

};

export const startLogoutAction = () => {

  // Como es una tarea asíncrona retornamos un callback que tiene dispatch como argumento que nos lo provee thunk

  return async( dispatch ) => {

    // Esto es una promesa

    await firebase.auth().signOut();

    dispatch( logout() );

    dispatch( deleteAllNoteStoreAction() );

  };

};

export const logout = () => ( { type: types.logout } ); // No es necesario export pero sí es necesario para las pruebas
