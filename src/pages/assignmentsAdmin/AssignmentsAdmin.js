import styles from './AssignmentsAdmin.module.css';
import React, {useEffect, useState} from 'react';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import axios from "axios";

function AssignmentsAdmin() {

    const [homeworkAssignments, setHomeworkAssignments] = useState([]);
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});
    const [selectedAssignment, setSelectedAssignment] = useState("");
    const [error, toggleError] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState([]);

   async function handleFormSubmit(formData){
        console.log(formData)
        toggleError(false);
        try {
            const response = await axios.post('http://localhost:8081/homeworkassignments/admin/groups/1', {
                info:formData.info,
                assignmentName: selectedAssignment,
            })
            console.log(response);
        } catch (e) {
            console.log(e)
            toggleError(true);
        }
    }
    //TODO: aanpassen naar context! ipv 1 is het {groupId}

    async function fetchHomeworkAssignments(selectedGroup){
        try {
            const {data} = await axios.get(`http://localhost:8081/homeworkassignments/groups/1`);
            console.log(data);
            setHomeworkAssignments(data);
        } catch (e) {
            console.log(e)
        }
    }

    //TODO: aanpassen naar context! In de context staan de groepen met groepId en kan je eruit halen. ipv 1 is het {groupId}

    useEffect(() => {
        fetchHomeworkAssignments();
    }, []);


    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <article className={styles["two-boxes"]}>
                        <WhiteBox className="assignment-box">
                            <h2> De volgende opdrachten staan online </h2>
                            <label htmlFor="group-field" className={styles["selection-field"]}>
                                {"Selecteer een groep:      "}
                                <select id="group-field" value={selectedGroup}
                                        onChange={(e) => setSelectedGroup(e.target.value)}>
                                    <option value="opdracht1">Groep1</option>
                                    <option value="opdracht2">Groep2</option>
                                    <option value="opdracht3">Groep3</option>
                                </select>

                                </label>
                               {homeworkAssignments.map((assignment) => (
                               <div key={assignment.id}>
                                   <span>
                                <InnerGoldBox className="assignment-box-admin">
                             <p> {assignment.assignmentName} - - "{assignment.info}" </p>
                            </InnerGoldBox>
                            </span>
                         </div>
                       ))}
                        </WhiteBox>

                        < WhiteBox className="assignment-box">
                            <h2> Huiswerk opgeven </h2>
                            <form className="form-login" onSubmit={handleSubmit(handleFormSubmit)}>
                                <br></br>
                                <label htmlFor="assignment-field" className={styles["selection-field"]}>
                                    {"Selecteer een opdracht:      "}
                                    <select id="assignment-field" value={selectedAssignment}
                                            onChange={(e) => setSelectedAssignment(e.target.value)}>
                                        <option value="opdracht1">Opdracht 1 - Van spanning naar ontspanning</option>
                                        <option value="opdracht2">Opdracht 2 - Een nieuwe start</option>
                                        <option value="opdracht3">Opdracht 3 - Stap voor Stap</option>
                                        <option value="opdracht4">Opdracht 4 - Hulp van binnenuit</option>
                                        <option value="opdracht5">Opdracht 5 - Ontspannen in intimiteit</option>
                                        <option value="opdracht6">Opdracht 6 - Overwinning in de slaapkamer</option>
                                        <option value="opdracht7">Opdracht 7 - Kracht van verbeelding</option>
                                        <option value="opdracht8">Opdracht 8 - Jouw seksuele blauwdruk</option>
                                        <option value="opdracht9">Opdracht 9 - Op weg naar intimiteit</option>
                                    </select>
                                </label>
                                <br></br>
                                <br></br>
                                <FormInput
                                    htmlFor="info-field"
                                    labelText="Omschrijving:"
                                    type="textarea"
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
                                    htmlFor="group-field"
                                    labelText="Huiswerkopdracht voor groepId:"
                                    type="number"
                                    id="group-field"
                                    register={register}
                                    registerName="group"
                                    validationRules= {{ }}
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
                                <br></br>
                                <Button buttonType="submit" buttonText="Verzenden" buttonStyle="buttonStyle"
                                />
                            </form>
                        </WhiteBox>
                    </article>
                </section>
            </section>
        </div>
    );
}
//TODO: in de context aantal actieve groepen ophalen en deze hierin zetten om optie mee te geven, kies groep


export default AssignmentsAdmin;