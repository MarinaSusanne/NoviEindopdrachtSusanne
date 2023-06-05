import React from "react";
import styles from './Button.module.css';


export default function Button({buttonText, onClick, buttonStyle, buttonType}) {

    return(
        <button
            type={buttonType}
            onClick={onClick}
            className={`${styles[buttonStyle]}`}>{buttonText}</button>
    )
}