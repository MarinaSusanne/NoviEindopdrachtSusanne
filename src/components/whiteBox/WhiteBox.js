import React from 'react';
import styles from './WhiteBox.module.css'

function WhiteBox({children, className}) {
    const boxClassName = `${styles["white-box"]} ${styles[className]}`;
    return (
        <div className={boxClassName}> {children} </div>
    );
}

export default WhiteBox;