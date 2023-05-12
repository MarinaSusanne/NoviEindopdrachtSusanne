import React from 'react';
import styles from './RegistrerUser.module.css'
import WhiteBox from '../../components/whiteBox/WhiteBox';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";

function RegistrerUser() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onSubmit"});

    function handleFormSubmit(data) {
        console.log(data)
    }

    return (
        <body className="outer-container">
        <div className={styles["combine-nav-page"]}>
            <Navigation/>
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <WhiteBox className='register-box'>
                        <h2> Registratie formulier</h2>
                        <form className="form-registration" onSubmit={handleSubmit(handleFormSubmit)}>
                            <FormInput
                                htmlFor="firstname-field"
                                labelText="Voornaam:"
                                type="text"
                                id="firstname-field"
                                register={register}
                                registerName="firstname"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht'
                                    }
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="lastname-field"
                                labelText="Achternaam:"
                                type="text"
                                id="lastname-field"
                                register={register}
                                registerName="lastname"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    },
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="streetname-field"
                                labelText="Straat:"
                                type="text"
                                id="streetname-field"
                                register={register}
                                registerName="streetname"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    },
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="housenumber-field"
                                labelText="Huisnummer:"
                                type="text"
                                id="housenumber-field"
                                register={register}
                                registerName="housenumber"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    }
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="zipcode-field"
                                labelText="Postcode:"
                                type="text"
                                id="zipcode-field"
                                register={register}
                                registerName="zipcode"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                        pattern: {
                                            value: /^[0-9]{4}[a-zA-Z]{2}$/,
                                            message: "Postcode moet bestaan uit 4 cijfers en 2 letters",
                                        },
                                    }
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="birthdate-field"
                                labelText="Geboortedatum:"
                                type="date"
                                id="birthdate-field"
                                register={register}
                                registerName="birthdate"
                                validationRules={{
                                    required: {
                                        value: true,
                                        min: "2005-01-01",
                                        message: "Geldig geboortedatum invoeren",
                                    },
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="profile-picture-field"
                                labelText="Profiel Foto:"
                                type="file"
                                id="profile-picture-field"
                                register={register}
                                errors={errors}
                                registerName="profilePicture"
                                validationRules={{
                                    required: true,
                                    validate: {
                                        fileType: (value) =>
                                            value[0] && ["image/jpeg", "image/png"].includes(value[0].type),
                                        fileSize: (value) => value[0] && value[0].size <= 5000000,
                                        message: "bestand moet een .jpeg een .jpg of .png zijn van maximaal 5MB",
                                    },
                                }}
                                className="input-photo"
                                accept=".jpg, .jpeg, .png"
                            />

                            <FormInput
                                htmlFor="email-field"
                                labelText="Email:"
                                type="text"
                                id="email-field"
                                register={register}
                                registerName="email"
                                validationRules={{
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
                                validationRules={{
                                    required: 'Dit veld is verplicht',
                                    minLength: {
                                        value: 8,
                                        message: 'Wachtwoord moet minstens 8 karakters lang zijn',
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S{8,}$/,
                                        message:
                                            'Wachtwoord moet minstens 8 karakters lang zijn en minstens 1 hoofdletter, 1 kleine letter, 1 getal en 1 speciaal teken bevatten',
                                    },
                                }}
                                className="input"
                                errors={errors}
                            />

                            <FormInput
                                htmlFor="confirm-password-field"
                                labelText="Herhaal wachtwoord:"
                                type="text"
                                id="confrim-password-field"
                                register={register}
                                registerName="confirm-password"
                                validationRules={{
                                    validate: value =>
                                        value === watch('password') || 'Wachtwoorden komen niet overeen',
                                }}
                                className="input"
                                errors={errors}
                            />


                        </form>
                        <Button
                            buttonType="submit"
                            buttonText="Registreer"
                            buttonStyle="buttonStyle"
                        />
                    </WhiteBox>
                </section>
            </section>
        </div>
        </body>
    )
}

export default RegistrerUser;

//TODO:gouden-kraan-preview-foto-weergeven