import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import styles from './LogIn.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


function LogIn() {
    const context = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onChange"});
    const [error, toggleError] = useState(false);


    async function handleFormSubmit(data) {
        try {
            const result = await axios.post('http://localhost:8081/authenticate', {
                username: data.username,
                password: data.password,
            })
            console.log(result);
            const JWT = result.data.jwt;
            context.logIn(JWT);
            reset();
        } catch (e) {
            console.log(e)
            toggleError(true);
        }
    }

    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <WhiteBox className="login-box">
                        <h2> Welkom bij Vulva Adventures!</h2>
                        {context.isAuth ? (
                            <p> U bent ingelogd en kunt nu navigeren via de navigatiebalk naar een pagina</p>
                        ) : (
                            <form className="form-login" onSubmit={handleSubmit(handleFormSubmit)}>

                                <FormInput
                                    htmlFor="username-field"
                                    labelText="Usernaam:"
                                    type="text"
                                    id="username-field"
                                    register={register}
                                    registerName="username"
                                    validationRules={{
                                        required: "Dit veld is verplicht",
                                        minlength: {
                                            value: 5,
                                            message: "Minstens 10 karakters"
                                        },
                                        maxLength: 15,
                                    }}
                                    className="input"
                                    errors={errors}
                                />

                                <FormInput
                                    htmlFor="password-field"
                                    labelText="Wachtwoord:"
                                    type="password"
                                    id="password-field"
                                    register={register}
                                    registerName="password"
                                    validationRules={{
                                        required: "Dit veld is verplicht",
                                        minlength: {
                                            value: 10,
                                            message: "Minstens 10 karakters"
                                        },
                                        maxLength: 50,
                                    }}
                                    className="input"
                                    errors={errors}
                                />
                                <Button
                                    buttonType="submit"
                                    buttonText="Inloggen"
                                    buttonStyle="buttonStyle"
                                />
                                <p> Heb je nog geen account? <Link to="/registreer"> Klik dan hier! </Link></p>

                                {error && <p style={{color: 'red'}}> Usernaam en/of wachtwoord is incorrect</p>}
                            </form>
                        )}
                    </WhiteBox>
                </section>
            </section>
        </div>
    );
};

export default LogIn;
