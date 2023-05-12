import React from 'react';
import styles from './LogIn.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";


function LogIn() {
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});

    function handleFormSubmit(data){
        console.log(data)
    }

    return (
        <body className="outer-container">
        <div className="combine-nav-page">
        <Navigation/>
        <section className={styles["page-body"]}>
            <section className="inner-container">
               <WhiteBox className="login-box">
                  <h2> Welkom bij Vulva Adventures!</h2>
                  <form className="form-login" onSubmit={handleSubmit(handleFormSubmit) }>
                      <FormInput
                          htmlFor="email-field"
                          labelText="Email:"
                          type="text"
                          id="email-field"
                          register = {register}
                          registerName="email"
                          validationRules= {{
                              required: {
                              value: true,
                              message: 'Dit veld is verplicht',
                          },
                              validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
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

                    </form>
                   <Button
                    buttonType="submit"
                    buttonText="Inloggen"
                    buttonStyle="buttonStyle"
                   />
                   <p> Heb je nog geen account? <Link to="/registreer"> Klik dan hier! </Link>  </p>
                </WhiteBox>
              </section>
          </section>
        </div>
        </body>
    );
};
export default LogIn;
