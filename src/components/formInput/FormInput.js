import React from 'react';
import styles from './FormInput.module.css';

function FormInput({ htmlFor, register, labelText, type, id, registerName, validationRules, className, errors }) {
    return (
        <label htmlFor={htmlFor}>
            {labelText}
            <input
                type={type}
                id={id}
                {...register(registerName, validationRules)}
                className={className}
            />
            {errors[registerName] && <p className={styles['error-message']}>{errors[registerName].message}</p>}
        </label>
    );
}

export default FormInput;