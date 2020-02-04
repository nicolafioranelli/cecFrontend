import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../context/auth";

function PrivateRoute({component: Component, ...rest}) {
    const auth = useAuth();
    const currentLocation = rest;

    return (
        <Route
            exact {...rest}
            render={props =>
                (auth.token === null) ? (
                    <Component {...props} {...rest}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {referrer: currentLocation}
                        }}
                    />

                )
            }
        />
    );
}

//(auth.token !== null) ? (

export default PrivateRoute;
