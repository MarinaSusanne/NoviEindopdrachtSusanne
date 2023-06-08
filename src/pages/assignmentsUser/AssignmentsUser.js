import styles from './AssignmentsUser.module.css';
import React, {useState} from 'react';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import Button from "../../components/button/Button";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";

function AssignmentsUser() {
    const [homeworkAssignments, setHomeworkAssignments] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onSubmit"});
    const [error, toggleError] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState("");


    async function handleFormSubmit(formData) {
        console.log(formData)
       toggleError(false);
       try {
           const response = await axios.post('http://localhost:8081/handinassignments/1', {
               info:formData.info,
               assignmentName: selectedAssignment,
           })
           console.log(response);
       } catch (e) {
           console.log(e)
           toggleError(true);
       }
   }
    //TODO:aanpassen naar useContext wanneer dat kan, nu is 1 maar is {userId}

    async function fetchHomeWorkAssignments() {
        try {
            const {data} = await axios.get(`http://localhost:8081/homeworkassignments/groups/1`);
            console.log(data);
            setHomeworkAssignments(data);
        } catch (e) {
            console.log(e)
        }
     }

    //TODO:aanpassen naar context, wie is er ingelogd en in welke groep zit die persoon? en de 1 aanpassen naar groepsId
    //TODO: kan maar 1 keer donwloaden en dan is er een foutmelding, waarom?

    async function handleDownload(assignment) {
            try {
                const response = await axios.get(`http://localhost:8081/download/${assignment.fileName}`, {
                    responseType: 'blob',
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', assignment.fileName);
                document.body.appendChild(link);
                link.click();
            } catch (e) {
                console.log(e);
            }

    }

    useEffect(() => {
        fetchHomeWorkAssignments();
    }, []);


    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <article className={styles["two-boxes"]}>
                        <WhiteBox className="assignment-box">
                            <h2> Opdrachten </h2>
                            {homeworkAssignments.map((assignment) => (
                                <div key={assignment.id}>
                                <span>
                                 <InnerGoldBox className="assignment-box">
                                   <p style={{ fontWeight: 'bold'}}>{assignment.assignmentName}</p>
                                   <p style={{ fontStyle: 'italic' }}>"{assignment.info}"</p>
                                   <p>{assignment.sendDate}</p>
                                </InnerGoldBox>
                                 </span>
                                    <span>
                                    <Button
                                        buttonStyle="download-button"
                                        onClick={()=> handleDownload(assignment)}
                                        buttonType="submit"
                                        buttonText="Downloaden"
                                    />
                                   </span>
                                 </div>
                            ))}
                        </WhiteBox>

                        < WhiteBox className="assignment-box">
                            <h2> Inleveren opdracht </h2>
                            <form className="form-handin" onSubmit={handleSubmit(handleFormSubmit)}>
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
                                <FormInput
                                    htmlFor="info-field"
                                    labelText="Extra info:"
                                    type="text"
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
                              <Button
                                buttonType="submit"
                                buttonText="verzenden"
                                buttonStyle="buttonStyle"/>
                            </form>

                        </WhiteBox>
                    </article>
                </section>
            </section>
        </div>
    );
}

//TODO:inzenden lukt niet!

export default AssignmentsUser;