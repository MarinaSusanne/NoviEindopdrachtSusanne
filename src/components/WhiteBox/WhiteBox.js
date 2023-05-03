import React from 'react';
import styles from './WhiteBox.module.css'

function WhiteBox({children}) {
    return (
        <div className={styles['White-box']}> {children} </div>
    );
}

export default WhiteBox;