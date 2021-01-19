import React, { useEffect, useState } from 'react';
import { /* Route, */ BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthenticationRouter } from './AuthenticationRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/authActions';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// import { loadNotes } from '../helpers/loadNotes';
import { /*  getNotesStoreAction, */ startLoadNotesAction } from '../actions/notesActions';

export const AppRouter = () => {

  const dispatch = useDispatch();

  // bandera para saber si la app está comprobando si el usuario está logueado

  const [ checking, setChecking ] = useState( true );

  // bandera para saber si el usuario está logueado

  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

  useEffect( () => {

    firebase.auth().onAuthStateChanged( async ( user ) => {

      // console.log( user ); // toda la info del usuario

      if ( user?.uid ) {

        // if user exists, read property uid

        console.log( 'el usuario está autenticado' );

        dispatch( loginAction( user.uid, user.displayName ) );

        setIsLoggedIn( true );

        // Cargamos las notas del usuario. Hemos refactorizado

        // const notes = await loadNotes( user.uid ); // loadNotes retorna una promesa

        // dispatch( getNotesStoreAction( notes ) );

        dispatch( startLoadNotesAction( user.uid ) );

      } else {

        setIsLoggedIn( false );

      }

      setChecking( false );

    } );

  }, [ dispatch ] ); /* al no tener dependencias se va a ejecutar sólo una vez, pero onAuthStateChanged es un observable que va estar pendiente todo el tiempo  */


  if ( checking ) {

    return ( <h1>Wait...</h1> );

  }

  return (
    <Router>
      { /* Se aconseja meter el switch en un div */}
      <div>
        <Switch>
          { /* Este path no usa exact */}
          { /* <Route path="/auth" component={AuthenticationRouter} /> */}
          {

            /* <Route path="/auth">
                  <AuthenticationRouter />
                </Route> */

          }

          <PublicRoute isAuthenticated={isLoggedIn} path="/auth" component={AuthenticationRouter} />

          { /* <Route exact path="/" component={JournalScreen} /> */} {
            /* <Route exact path="/">
                  <JournalScreen />
                </Route> */

          }

          <PrivateRoute isAuthenticated={isLoggedIn} exact path="/" component={JournalScreen} />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );

};
