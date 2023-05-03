import React from "react";
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo-vulva-v.png';



function Navigation(props) {
    let amountGroups = ["group1", "group2", "group3"];
    //TODO:oaanvullen-navbar-naar-groepslid
    function renderNavigation(amountGroups) {
        switch (amountGroups.length) {
            case 0:
                return (
                    <>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/groep-aanmaken"> Groep aanmaken </NavLink>
                    </>)
            case 1:
                return (
                    <>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/groep-aanmaken"> Groep aanmaken </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina1"> Groep 1 </NavLink>
                    </> )
            case 2:
                return(
                    <>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/groep-aanmaken"> Groep aanmaken </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina1"> Groep 1 </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina2"> Groep 2 </NavLink>
                    </> )
            case 3:
                return (
                    <>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina1"> Groep 1 </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina2"> Groep 2 </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/groepspagina3"> Groep 3 </NavLink>
                    </>)
            default:
                return null
        }
    }
    const navigationLinks = renderNavigation(amountGroups);
    return (
       <nav className={styles['navigation-bar']}>
            <img src={logo} className={styles.logo} alt="logo-vulva-adventures" />
            <section className={styles['navigation-text']}>
            <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/lees-pagina" > Leesbox </NavLink>
            <NavLink className={({ isActive }) => isActive ? styles['active-menu-link'] : styles['default-menu-link']} to="/admin/opdrachten"> Opdrachten </NavLink>
            {navigationLinks}
            <h2> Welkom, Admin</h2>
           </section>
        </nav>

    );
}

export default Navigation;

