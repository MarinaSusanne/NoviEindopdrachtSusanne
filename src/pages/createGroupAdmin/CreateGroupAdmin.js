import styles from './CreateGroupAdmin.module.css';
import React, {useEffect, useState} from 'react';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";

function CreateGroupAdmin() {
    const [grouplessMembers, setGrouplessMembers] = useState([]);
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm({mode: "onSubmit"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [groupCreatedMessage, setGroupCreatedMessage] = useState("");

    async function handleFormSubmit(formData) {
        try {
            const response = await axios.post('http://localhost:8081/groups/admin', {
                groupInfo: formData.info,
                groupName: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
                users: formData.selectedMembers,
            });
            console.log(response);
            setGroupCreatedMessage(
                `Een groep is aangemaakt met groepsnaam ${formData.name} en met id ${response.data.id}`
            );
            reset();
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
        toggleLoading(false);
    }


    async function fetchMembersWithoutGroup() {
        try {
            const response = await axios.get(`http://localhost:8081/users/nogroup`);
            console.log(response);
            setGrouplessMembers(response.data);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchMembersWithoutGroup();
    }, []);

    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <WhiteBox className='register-box'>
                        <InnerGoldBox>
                            <h2> Groep aanmaken</h2>
                            {groupCreatedMessage && <p className={styles["group-created-message"]}> {groupCreatedMessage}</p>}
                            <form className="group-registration" onSubmit={handleSubmit(handleFormSubmit)}>
                                <div>
                                    <label htmlFor="member-selector">Selecteer nieuwe leden:</label>
                                    <br></br>
                                    <select
                                        id="member-selector"
                                        multiple
                                        {...register("selectedMembers")}
                                        className={styles["custom-select"]}
                                    >
                                        {grouplessMembers.map((member) => (
                                            <option key={member.id} value={member.id}>
                                                {member.firstName} {member.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <FormInput
                                    htmlFor="info-field"
                                    labelText="Omschrijving:"
                                    type="textarea"
                                    id="info-field"
                                    register={register}
                                    registerName="info"
                                    validationRules={{
                                        required: "Dit veld is verplicht",
                                        minlength: {
                                            value: 10,
                                            message: "Minstens 10 karakters"
                                        },
                                        maxLength: {
                                            value: 500,
                                            message: "maximaal 200 karakters"
                                        },
                                    }}
                                    className="input-bigger"
                                    errors={errors}
                                />

                                <FormInput
                                    htmlFor="groupname-field"
                                    labelText="Groepsnaam"
                                    type="text"
                                    id="name-field"
                                    register={register}
                                    registerName="name"
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
                                    htmlFor="startDate-field"
                                    labelText="Startdatum:"
                                    type="date"
                                    id="start-date-field"
                                    register={register}
                                    registerName="startDate"
                                    validationRules={{
                                        required: {
                                            value: true,
                                            message: "Dit veld is verplicht",
                                        },
                                        min: {
                                            value: "2023-06-01",
                                            message: "Voer een geldige datum in na 1 juni 2023",
                                        },
                                    }}
                                    className="input"
                                    errors={errors}
                                />

                                <FormInput
                                    htmlFor="endDate-field"
                                    labelText="Einddatum:"
                                    type="date"
                                    id="end-date-field"
                                    register={register}
                                    registerName="endDate"
                                    validationRules={{
                                        required: {
                                            value: true,
                                            message: "Dit veld is verplicht",
                                        },
                                        min: {
                                            value: watch("startDate"),
                                            message: "Voer een geldige datum in na de startdatum",
                                        },
                                    }}
                                    className="input"
                                    errors={errors}
                                />
                                <Button
                                    buttonType="submit"
                                    buttonText="  Maak nieuwe groep aan  "
                                    buttonStyle="buttonStyle"
                                />

                            </form>
                        </InnerGoldBox>
                    </WhiteBox>
                </section>
            </section>
        </div>
    )

}

export default CreateGroupAdmin;