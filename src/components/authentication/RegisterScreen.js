import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterEmailPasswordNameAction } from '../../actions/authActions';
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const [ formValues, handleInputChange ] = useForm( {
        name: 'Dan Anders Häggblom',
        email: 'test@test.es',
        password: '123456',
        password2: '123456'
    } );

    const { name, email, password, password2 } = formValues;

    // Podríamos usar useState para algo tan sencillo que sólo va usarse en esta página, pero usaremos Redux para aprender

    const dispatch = useDispatch();

    // Vamos a recuperar el mensaje de error del State

    /* const state = useSelector( state => state.ui );

    console.log( state ); */

    const { msgError } = useSelector( state => state.ui );

    console.log( 'msgError', msgError );

    const handleRegister = ( e )=>{

        e.preventDefault();

        // console.log( name, email, password, password2 );

        if( isFormValid() ){

            console.log( 'Formulario correcto' );

            dispatch( startRegisterEmailPasswordNameAction( email, password, name ) );
        
        }
    
    };

    const isFormValid = () => {

        if( name.trim().length === 0 ){

            console.log( 'Name is required' );

            dispatch( setErrorAction( 'Name is required' ) );

            return false;
        
        } else if( !validator.isEmail( email ) ){

            console.log( 'Email is not valid' );

            dispatch( setErrorAction( 'Email is not valid' ) );

            return false;
        
        } else if( password !== password2 || password.length < 5 ){

            console.log( 'Passwords are not equal or length must be 5 or longer' );

            dispatch( setErrorAction( 'Passwords are not equal or length must be 5 or longer' ) );

            return false;
        
        }

        // Remove error

        dispatch( removeErrorAction() );

        return true;

    };

    return (
        <>
            <h3 className="auth__title mb-5">Register Screen</h3>

            <form onSubmit={handleRegister}>

                {msgError && ( <div className="auth__alert-error">
                    {msgError}
                </div> )}

                <input className="auth__input" type="text" name="name" value={name} placeholder="Name" autoComplete="off" onChange={handleInputChange} />
                <input className="auth__input" type="text" name="email" value={email} placeholder="Email" autoComplete="off" onChange={handleInputChange} />
                <input className="auth__input" type="password" name="password" value={password} placeholder="Password" onChange={handleInputChange} />
                <input className="auth__input" type="password" name="password2" value={password2} placeholder="Confirm password" onChange={handleInputChange} />

                <button className="btn btn-primary btn-block mb-5" type="submit">Register</button>

                <Link to="/auth/login" className="link">Already registered?</Link>
            </form>
        </>
    );

};
