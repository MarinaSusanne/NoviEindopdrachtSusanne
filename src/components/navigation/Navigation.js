import React, {useEffect} from "react";
import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo-vulva-v.png';
import {AuthContext} from "../../context/AuthContext";
import {useContext, useState} from "react";
import axios from "axios";
import Button from "../button/Button";

function Navigation() {
    const [activeGroups, setActiveGroups] = useState([]);
    const token = localStorage.getItem('token');
    const {isAuth, user, userGroup, logOut, test} = useContext(AuthContext);

    useEffect(() => {
        if (user && user.username === 'admin') {
            fetchActiveGroups();
        }
    }, [user]);


    async function fetchActiveGroups() {
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/admin/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setActiveGroups(data);
        } catch (e) {
            console.log(e)
        }
    }

    function renderAdminNavigation() {
        if (!user || !user.username) {
            return null;
        }

        const isMaxActiveGroupsReached = activeGroups.length >= 3;

        return (
            <>
                <NavLink to="/admin/lees-pagina"
                         className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> Leesbox </NavLink>
                <NavLink to="/admin/opdrachten"
                         className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> Opdrachten </NavLink>
                {!isMaxActiveGroupsReached && (
                    <NavLink to="/admin/groep-aanmaken"
                             className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> Groep
                        aanmaken </NavLink>
                )}

                {activeGroups.map(group => (
                    <NavLink to={`/groepspagina/${group.id}`} key={group.id}
                             className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> {group.groupName} </NavLink>
                ))}
                <p> Welkom, Admin</p>
            </>
        );
    }

    function renderUserNavigation() {
        if (!user || !user.username) {
            return null;
        }

        return (
            <>
                {userGroup &&
                    <NavLink to={`/groepspagina/${userGroup.groupId}`}
                             className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> Mijn
                        Groep </NavLink>
                }
                <NavLink to="/opdrachten"
                         className={({isActive}) => isActive ? styles['active-menu-link'] : styles['default-menu-link']}> Opdrachten </NavLink>
                <p> Welkom, {user.firstname}</p>
            </>
        );
    }

    return (
        <nav className={styles['navigation-bar']}>
            <img src={logo} className={styles.logo} alt="logo-vulva-adventures"/>
            <section className={styles['navigation-text']}>
                {user && user.username === 'admin' ? renderAdminNavigation() : renderUserNavigation()}
            </section>
            {isAuth && (
                <Button
                    buttonType="submit"
                    buttonText="Uitloggen"
                    buttonStyle="buttonStyle"
                    onClick={logOut}
                />
            )}
        </nav>
    );
}

export default Navigation;
