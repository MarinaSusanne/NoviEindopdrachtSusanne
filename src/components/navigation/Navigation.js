import React, {useEffect} from "react";
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo-vulva-v.png';
import {AuthContext} from "../../context/AuthContext";
import  {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import Button from "../button/Button";

function Navigation() {
    const [activeGroups, setActiveGroups] = useState([]);
    const token = localStorage.getItem('token');
    const whatsInTheContext = useContext(AuthContext);

    useEffect(() => {
        if (whatsInTheContext.user.username === 'admin') {
            fetchActiveGroups();
        }
    }, [whatsInTheContext.user]);

        async function fetchActiveGroups() {
            try {
                const {data} = await axios.get(`http://localhost:8081/groups/admin/all`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(data);
                setActiveGroups(data);
            } catch (e) {
                console.log(e)
            }
        }

    function renderAdminNavigation() {
        return (
            <>
                <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/lees-pagina" > Leesbox </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/opdrachten"> Opdrachten </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/groep-aanmaken"> Groep aanmaken </NavLink>

                {activeGroups.map(group => (
                    <NavLink
                        key={group.id}
                        className={styles['default-menu-link']}
                        activeClassName={styles['active-menu-link']}
                        to={`/groepspagina/${group.id}`}> {group.groupName} </NavLink>
                ))}
            </>
        );
    }

    function renderUserNavigation() {
        return (
            <>
                <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to ={`/groepspagina/${whatsInTheContext.user.groupid}`}> Mijn Groep </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/opdrachten"> Opdrachten </NavLink>
            </>
        );
    }





    return (
       <nav className={styles['navigation-bar']}>
            <img src={logo} className={styles.logo} alt="logo-vulva-adventures" />
            <section className={styles['navigation-text']}>
                {whatsInTheContext.user.username === 'admin' ? renderAdminNavigation() : renderUserNavigation()}
                <Button
                    buttonType="submit"
                    buttonText="Uitloggen"
                    buttonStyle="buttonStyle"
                    onClick={whatsInTheContext.logOut}
                />
                <h2> {whatsInTheContext.user.username === 'admin' ? 'Welkom, Admin' : `${whatsInTheContext.user.firstName}`}</h2>
            </section>
       </nav>
    );
}

export default Navigation;
