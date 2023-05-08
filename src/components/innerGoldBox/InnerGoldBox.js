import React from 'react';
import styles from './InnerGoldBox.module.css'

function InnerGoldBox({children, className}) {
    const boxClassName = `${styles["inner-box"]} ${styles[className]}`;
    return (
        <div className={boxClassName}> {children} </div>
    );
}

export default InnerGoldBox;