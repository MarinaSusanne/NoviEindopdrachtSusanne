import React from 'react';
import styles from './LogIn.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Navigation from '../../components/navigation/Navigation';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";


export default function LogIn() {
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onChange"});

    function handleFormSubmit(data){
        console.log(data)
    }

    return (
        <body className={styles["page-body"]}>
           <section className="outer-container">
              <section className="inner-container">
               <WhiteBox className={'login-box'}>
                  <h2> Welkom bij Vulva Adventures!</h2>

                  <form className="form-login" onSubmit={handleSubmit(handleFormSubmit) }>
                      <FormInput
                          htmlFor="email-field"
                          labelText="Email:"
                          type="text"
                          id="email-field"
                          register="email"
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

                      <label htmlFor="email-field">
                          Email:
                          <input
                              type="text"
                              id="email-field"
                              {...register("email", {
                                      required: {
                                          value: true,
                                          message: 'Dit veld is verplicht',
                                      },
                                      validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                                  }
                              )}
                          />
                          {errors.email && <p>{errors.email.message}</p>}
                      </label>

                      <label htmlFor="password-field">
                          Wachtwoord:
                          <input
                              type="text"
                              id="password-field"
                              {...register("password", {
                                  required: "Dit veld is verplicht",
                                  minlength: {
                                      value: 10,
                                      message: "Minstens 10 karakters"
                                  },
                                  maxLength: 50,
                              })}
                          />
                          {errors.password && <p>{errors.password.message}</p>}
                      </label>
                    </form>
                   <button type="submit"> Inloggen</button>

                   <p> Heb je nog geen account? <Link to="/registreer"> Klik dan hier! </Link>  </p>


                  {/*<Button>*/}

                  {/*</Button>*/}
              </WhiteBox>
              </section>
          </section>
        </body>
    );
};
