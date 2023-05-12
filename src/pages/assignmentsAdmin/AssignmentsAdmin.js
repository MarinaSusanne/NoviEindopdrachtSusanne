import styles from './AssignmentsAdmin.module.css';
import React, {useEffect, useState} from 'react';
import Navigation from "../../components/navigation/Navigation";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";

function AssignmentsAdmin(props) {

    const [homeworkAssignments, setHomeworkAssignments] = useState([]);
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});

    function handleFormSubmit(data){
        console.log(data)
    }

    async function fetchHomeworkAssignments(){
        const outcomefunction=["bla", "blabla"];
        setHomeworkAssignments(outcomefunction);
    }


    useEffect(() => {
        fetchHomeworkAssignments();
    }, []);


    return (
        <body className="outer-container">
        <div className="combine-nav-page">
            <Navigation/>
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <section className={styles["two-boxes"]}>
                        <WhiteBox className="assignment-box">
                            <h2> De volgende opdrachten staan online </h2>
                            {/*Aanpassen wat hieronder staat!*/}
                            {/*   {assignments.map((assignment) => (*/}
                            {/*   <div key={assignment.id}>*/}
                            {/*<span> <InnerGoldBox className="assignment-box"> */}
                            {/* <h3> {assignment.assignmentName}</h3> */}
                            {/*<p> {assignment.assignmentInfo} </p>*/}
                            {/*</InnerGoldBox> </span> */}
                            {/*<span> <Button buttonStyle="download-button" onClick={handleDownload} buttonType="submit" buttontext="Downloaden"/>*/}
                            {/*</span>*/}
                            {/*</div>*/}
                        </WhiteBox>
                        < WhiteBox className="assignment-box">
                            <h2> Inleveren opdracht </h2>
                            <form className="form-login" onSubmit={handleSubmit(handleFormSubmit) }>
                                <FormInput
                                    htmlFor="name-field"
                                    labelText="Naam opdracht:"
                                    type="text"
                                    id="name-field"
                                    register = {register}
                                    registerName="name"
                                    validationRules= {{
                                        required: {
                                            value: true,
                                            message: 'Dit veld is verplicht',
                                        },
                                    }}
                                    className="input"
                                    errors={errors}
                                />

                                <FormInput
                                    htmlFor="info-field"
                                    labelText="Omschrijving:"
                                    type="text"
                                    id="info-field"
                                    register={register}
                                    registerName="info"
                                    validationRules= {{
                                        required: "Dit veld is verplicht",
                                        minlength: {
                                            value: 10,
                                            message: "Minstens 10 karakters"
                                        },
                                        maxLength: {
                                            value: 500,
                                            message:"maximaal 200 karakters"
                                        },
                                    }}
                                    className="input-bigger"
                                    errors={errors}
                                />

                                <FormInput
                                    htmlFor="uploadfile-field"
                                    labelText="Bestand uploaden:  "
                                    type="file"
                                    id="uploadfile-field"
                                    register={register}
                                    errors={errors}
                                    registerName="uploadFile"
                                    validationRules={{
                                        required: true,
                                        validate: {
                                            fileType: (value) =>
                                                value[0] && ["pdf", "word"].includes(value[0].type),
                                            fileSize: (value) => value[0] && value[0].size <= 5000000,
                                            message: "bestand moet een .pdf of .word zijn van maximaal 5MB",
                                        },
                                    }}
                                    className="input-uploadfield"
                                    accept=".pdf .word"
                                />
                               //TODO:-keuze-menu-aan-toevoegen!!!

                            </form>
                            <Button
                                buttonType="submit"
                                buttonText="verzenden"
                                buttonStyle="buttonStyle"
                            />
                        </WhiteBox>
                    </section>
                </section>
            </section>
        </div>
        </body>
    );
}

export default AssignmentsAdmin;