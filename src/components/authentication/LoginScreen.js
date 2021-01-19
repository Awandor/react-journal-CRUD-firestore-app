import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { /* loginAction,  */startGoogleLoginAction, startLoginEmailPasswordAction } from '../../actions/authActions';

export const LoginScreen = () => {

    const [ formValues, handleInputChange ] = useForm( {
        email: 'test@test.es',
        password: '123456'
    } );

    const { email, password } = formValues;

    // Vamos a leer una propiedad del state

    const { loading } = useSelector( state => state.ui );

    const dispatch = useDispatch();

    const handleLogin = ( e ) => {

        e.preventDefault();

        // console.log( email, password );

        // Vamos a hacer el dispatch al Store

        // dispatch( loginAction( `rtge453333`, 'Dan' ) );

        dispatch( startLoginEmailPasswordAction( email, password ) );

    };

    const handleGoogleLogin = () => {

        console.log( 'handleGoogleLogin' );

        dispatch( startGoogleLoginAction() );

    };

    return (
        <>
            <h3 className="auth__title mb-5">Login Screen</h3>

            <form onSubmit={handleLogin}>
                <input className="auth__input" type="text" name="email" value={email} placeholder="Email" autoComplete="off" onChange={handleInputChange} />
                <input className="auth__input" type="password" name="password" value={password} placeholder="Password" onChange={handleInputChange} />

                <button className="btn btn-primary btn-block mb-5" type="submit" disabled={ loading }>Login</button>

                <hr />

                <div className="auth__social-networks">
                    <p>Login with social network</p>

                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">Create new account</Link>
            </form>
        </>
    );

};
