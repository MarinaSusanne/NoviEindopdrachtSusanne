import React from "react";
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    return (
        <div>
            <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/"> Home </NavLink>


        </div>
    );
}

export default Navigation;

