import React, {createContext, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'done',
    });
    //TODO: status aanpassen naar "pending"


    const navigate = useNavigate();

    function logIn(JWT){
        console.log('gebruiker is ingelogd');
        localStorage.setItem('token', JWT);
        const decodedToken = jwt_decode(JWT);
        console.log(decodedToken);
        fetchDataUser(JWT, decodedToken.id);
    }

    async function fetchDataUser(JWT, id){
        try {
            const result = await axios.get(`http://localhost:8081/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(result);
            setAuthState({
                isAuth: true,
                user: {
                    username: result.data.username,
                    firstname: result.data.firstName,
                    lastname: result.data.lastName,
                    id: result.data.id,
                },
                status: 'done',
            });
            navigate("/groepspagina1");
        } catch (e) {
            console.log(e)
        }
    }

    function logOut(){
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('gebruiker is uitgelogd');
        navigate('/');
    };


    const data = {
        isAuth: isAuth.isAuth,
        user:isAuth.user,
        logIn: logIn,
        logOut: logOut,
        banaan:'geel',
    };



    return (
        <AuthContext.Provider  value={data}>
            {isAuth.status === 'done' ? children : <p> Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;