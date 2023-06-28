import styles from './NotFound.module.css';

import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className={styles["page-body"]}>
            <h2> Pagina niet gevonden. Je kunt je <Link to="/">hier</Link> inloggen </h2>
        </div>
    );
}

export default NotFound;