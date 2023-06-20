import React, {createContext, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import fromTokentoDate from "../helpers/fromTokentoDate";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
        groupStatus: 'pending',
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
                    status: 'done',
                    groupStatus: 'done'
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
                isAuth: true,
                user: {
                    username: result.data.username,
                    firstname: result.data.firstName,
                    lastname: result.data.lastName,
                    id: result.data.id,
                },
                status: 'done',
                groupStatus: isAuth.groupStatus,
            });
            // if (result.data.username === 'admin') {
            //     navigate("/admin/opdrachten");
            // } else {
            console.log(result);
            await fetchGroup(JWT, result.data.id);
        } catch (e) {
            console.log(e)
        }
    }


    async function fetchGroup(JWT, id) {
        try {
            const response = await axios.get(`http://localhost:8081/groups/${id}/group`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(response);
            setAuthState({
                isAuth: true,
                user: {
                    ...isAuth.user,
                    groupId: response.data.id,
                    groupName: response.data.groupName,
                },
                status: isAuth.status,
                groupStatus: 'done',
            });
            navigate("/groepspagina");
            console.log(isAuth)
        } catch (e) {
            console.log(e)
        }
    }


    function logOut() {
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
            groupStatus: 'done',
        });
        console.log('gebruiker is uitgelogd');
        navigate('/');
    };


    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        logIn: logIn,
        logOut: logOut,
        banaan: 'geel',
    };


    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p> Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;