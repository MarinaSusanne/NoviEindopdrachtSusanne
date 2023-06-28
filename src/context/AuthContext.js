import React, {createContext, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import fromTokentoDate from "../helpers/fromTokentoDate";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        userGroup: null,
        status: 'pending',
    });

    useEffect(() => {
            const token = localStorage.getItem('token');
            if (token && fromTokentoDate(token)) {
                const decodedToken = jwt_decode(token);
                console.log(decodedToken);
                fetchDataUser(token, decodedToken.id);
            } else {
                setAuthState({
                    isAuth: false,
                    user: null,
                    userGroup: null,
                    status: 'done',
                });
            }
        },
        []);

    const navigate = useNavigate();

    function logIn(JWT) {
        console.log('gebruiker is ingelogd');
        localStorage.setItem('token', JWT);
        const decodedToken = jwt_decode(JWT);
        console.log(decodedToken);
        fetchDataUser(JWT, decodedToken.id);
    }

    async function fetchDataUser(JWT, id) {
        try {
            const result = await axios.get(`http://localhost:8081/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(result);
            setAuthState({
                ...authState,
                isAuth: true,
                user: {
                    username: result.data.username,
                    firstname: result.data.firstName,
                    lastname: result.data.lastName,
                    id: result.data.id,
                },
                status: 'done',
                groupStatus: 'done'
            });
            console.log(authState);
            if (result.data.username !== 'admin') {
                console.log(result);
                fetchGroup(JWT, result.data.id, result.data.username, result.data.firstName, result.data.lastName);
                }
            } catch (e) {
            console.log(e)
         }
    }

    async function fetchGroup(JWT, id, userName, firstName, lastName) {
        try {
            const response = await axios.get(`http://localhost:8081/groups/users/${id}/group`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            setAuthState({
                isAuth: true,
                user: {
                    username: userName,
                    firstname: firstName,
                    lastname: lastName,
                    id: id
                },
                userGroup:{
                    groupId: response.data.id,
                    groupName: response.data.groupName,
                },
                status:'done',
            });
            console.log(authState);
        } catch (e) {
            console.log(e)
        }
    }


    function logOut() {
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            userGroup: null,
            status: 'done',
        });
        console.log('gebruiker is uitgelogd');
        navigate('/');
    };


    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        userGroup:authState.userGroup,
        logIn: logIn,
        logOut: logOut,
    };


    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'done' ? children : <p> Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;