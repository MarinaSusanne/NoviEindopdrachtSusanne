import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import styles from './LogIn.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";



function LogIn() {
    //dit mag uiteraard korter, namelijk const {login } =useContext, maar de nu even zo, want Nova gebruikt de 'whatsinthecontext' en is voor mezelf fijn
    const whatsInTheContext  = useContext(AuthContext);
    console.log(whatsInTheContext);
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

   async function handleFormSubmit(data){
        console.log(data);
        toggleLoading(true);
        try {
            const result = await axios.post('http://localhost:8081/authenticate', {
                username: data.username,
                password: data.password,
            })
            console.log(result);
            const JWT = result.data.jwt;
            whatsInTheContext.logIn(JWT);
            navigate('/admin-opdrachten');
        } catch (e) {
            console.log(e)
            toggleError(true);
        }
        toggleLoading(false);
    }


    return (
      <div className="outer-container">
         <section className={styles["page-body"]}>
            <section className="inner-container">
               <WhiteBox className="login-box">
                  <h2> Welkom bij Vulva Adventures!</h2>
                  <form className="form-login" onSubmit={handleSubmit(handleFormSubmit) }>

                       <FormInput
                          htmlFor="username-field"
                          labelText="Usernaam:"
                          type="text"
                          id="username-field"
                          register = {register}
                          registerName="username"
                          validationRules= {{
                              required: "Dit veld is verplicht",
                              minlength: {
                              value: 5,
                              message: "Minstens 10 karakters"
                          },
                              maxLength:15,
                          }}
                          className="input"
                          errors={errors}
                      />

                      <FormInput
                          htmlFor="password-field"
                          labelText="Wachtwoord:"
                          type="text"
                          id="password-field"
                          register={register}
                          registerName="password"
                          validationRules= {{
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
                    </form>
                   <p> Heb je nog geen account? <Link to="/registreer"> Klik dan hier! </Link>  </p>
                </WhiteBox>
              </section>
         </section>
        </div>
    );
};
export default LogIn;
