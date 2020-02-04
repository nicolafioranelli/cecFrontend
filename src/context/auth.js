import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const authContext = createContext();

export function AuthProvider({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const login = (userName, password) => {
        axios.post("/api/login", {
            userName,
            password
        }).then(result => {
            if (result.status === 200) {
                setToken(result.data.token);
                localStorage.setItem("user", result.data.token);
            }
        }).catch((error) => {
            setError(error.response.data);
            return ("Error");
        });
    };

    const clearError = () => {
        setError(null);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        if (localStorage.getItem("user") && (token == null)) {
            setToken(localStorage.getItem("user"));
        }
    }, []);

    return {
        token,
        error,
        login,
        logout,
        clearError
    };
}
