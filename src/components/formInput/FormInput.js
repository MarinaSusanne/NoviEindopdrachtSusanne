import React from 'react';
import styles from './FormInput.module.css';

function FormInput({
                       htmlFor,
                       register,
                       labelText,
                       type,
                       id,
                       registerName,
                       validationRules,
                       className,
                       errors,
                       changeHandler
                   }) {

    return (
        <label htmlFor={htmlFor}>
            {labelText}
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    {...register(registerName, validationRules)}
                    className={styles[className]}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    {...register(registerName, validationRules)}
                    className={styles[className]}
                    onChange={changeHandler}
                />
            )}
            {errors[registerName] && <p className={styles['error-message']}>{errors[registerName].message}</p>}
        </label>
    );
}

export default FormInput;