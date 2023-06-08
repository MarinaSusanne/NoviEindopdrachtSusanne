import React, {useState} from 'react';
import styles from './RegisterUser.module.css'
import WhiteBox from '../../components/whiteBox/WhiteBox';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";

function RegisterUser() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onSubmit"});
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    console.log(errors);
    async function handleFormSubmit(formData) {
        console.log(formData);
        toggleLoading(true);
        toggleError(false);
        try {
            const response = await axios.post('http://localhost:8081/users', {
                firstName:formData.firstName,
                lastName:formData.lastName,
                streetName:formData.streetName,
                houseNumber: formData.houseNumber,
                zipcode: formData.zipcode,
                city: formData.city,
                dateOfBirth: formData.dateOfBirth,
                photo: formData.photo,
                email: formData.email,
                password: formData.password,
                username: formData.username,
            })
            navigate('/');
        } catch (e) {
            console.log(e)
            toggleError(true);

        }
        toggleLoading(false);
    }
    //TODO: fixing error: Resolved [org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `java.lang.String` from Object value (token `JsonToken.START_OBJECT`)]. heeft te maken met curly brackets in JSON

    // function handleChange(e){
    //     console.log(' hoi')
    //     console.log(e.target.files)
    // }

    return (
        <div className="outer-container">
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
                                registerName="firstName"
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
                                registerName="lastName"
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
                                registerName="streetName"
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
                                registerName="houseNumber"
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
                                htmlFor="city-field"
                                labelText="Woonplaats:"
                                type="text"
                                id="city-field"
                                register={register}
                                registerName="city"
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
                                htmlFor="birthdate-field"
                                labelText="Geboortedatum:"
                                type="date"
                                id="birthdate-field"
                                register={register}
                                registerName="dateOfBirth"
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
                                // changeHandler={handleChange}
                                registerName="photo"
                                validationRules={{
                                    validate: {
                                        fileType: (value) =>
                                            value[0] && ["image/jpeg", "image/png"].includes(value[0].type) || "bestand moet een .jpeg een .jpg of .png zijn" ,
                                        fileSize: (value) => value[0] && value[0].size <= 5000000 || "bestand moet  van maximaal 5MB",
                                    },
                                }}
                                className="input-photo"
                                accept=".jpg, .jpeg, .png"
                            />

                            <FormInput
                                htmlFor="email-field"
                                labelText="Email:"
                                type="email"
                                id="email-field"
                                register={register}
                                registerName="email"
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
                                htmlFor="username-field"
                                labelText="Kies een usernaam:"
                                type="text"
                                id="username-field"
                                register={register}
                                registerName="username"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Usernaam moet minstens 8 karakters lang zijn',
                                    },
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
                                type="password"
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

                        <Button
                            buttonType="submit"
                            buttonText="  Registreer  "
                            buttonStyle="buttonStyle"
                        />
                       </form>
                        <p>Heb je al een account? Je kunt je <Link to="/">hier</Link> inloggen.</p>
                    </WhiteBox>
                </section>
            </section>
        </div>
    )
}

export default RegisterUser;

//TODO:gouden-kraan-preview-foto-weergeven