import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute = ( { isAuthenticated, component: Component, ...rest } ) => {

    // console.log( 'rest', rest );

    // const { pathname, search } = rest.location;

    // localStorage.setItem( 'lastPath', pathname + ( search || '' ) ); // No lo necesitamos pues si está autenticado sólo tenemos una ruta

    return (
        <Route {...rest} component={

            ( props ) => {

                return ( isAuthenticated ) ? ( <Component {...props} /> ) : ( <Redirect to="/auth/login" /> );

            }
        } />
    );

};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired // Es una función pues es un functional component
};
