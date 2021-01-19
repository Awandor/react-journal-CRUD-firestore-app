import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/authentication/LoginScreen';
import { RegisterScreen } from '../components/authentication/RegisterScreen';

export const AuthenticationRouter = () => {

    return (
        <div className="auth__main">
            <div className="auth__box-container animate__animated animate__fadeIn animate_faster">
            <Switch>
                {/* Estos path no usa exact */}
                <Route path="/auth/login">
                    <LoginScreen />
                </Route>

                <Route path="/auth/register">
                    <RegisterScreen />
                </Route>

                <Redirect to="/auth/login" />
            </Switch>
            </div>
        </div>
    );

};
