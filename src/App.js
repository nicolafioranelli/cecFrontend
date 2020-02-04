import React from 'react';
import {AuthProvider} from './context/auth';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./Login";
import Home from "./Home";
import Details from "./Details";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <div className={"containerFluid p-3"}>
            <AuthProvider>
                <Router>
                    <div>
                        <PrivateRoute path="/" component={Home}/>
                        <PrivateRoute path="/device/:device" component={Details}/>
                        <Route path="/login" component={Login}/>
                    </div>
                </Router>
            </AuthProvider>
        </div>
    );
};

export default App;
