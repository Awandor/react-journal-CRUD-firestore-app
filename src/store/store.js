import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

// combineReducers es una función que agrupa varios reducers que luego enchufamos a createStore

const reducers = combineReducers( { auth: authReducer, ui: uiReducer, notes: notesReducer } );

// export const store = createStore( reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

// Como vamos a usar el Middleware thunk para el login necesitamos esta constante

const composeEnhancers = ( typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

export const store = createStore( reducers, composeEnhancers( applyMiddleware( thunk ) ) );
