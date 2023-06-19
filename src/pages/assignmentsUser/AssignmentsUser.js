import styles from './AssignmentsUser.module.css';
import React, {useState} from 'react';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import {useForm} from "react-hook-form";
import {useEffect, useContext} from "react";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import Button from "../../components/button/Button";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";
import formatSendDate from "../../helpers/formatSendDate";
import {AuthContext} from "../../context/AuthContext";


function AssignmentsUser() {
    const {user, isAuth} = useContext(AuthContext);
    const [homeworkAssignments, setHomeworkAssignments] = useState([]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onSubmit"});
    const [error, toggleError] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState("");
    const [file, setFile] = useState([]);
    const token = localStorage.getItem('token');


    useEffect(() => {
        fetchHomeWorkAssignments();
    }, []);


    function handleAssignmentSelection(e) {
        console.log(e)
        setSelectedAssignment(e.target.value);
    }

    async function handleFormSubmit(data) {
        console.log(data)
        const uploadedFile = data.uploadFile[0];
        console.log(uploadedFile);
        setFile(uploadedFile);

       toggleError(false);
       try {
           const response = await axios.post(`http://localhost:8081/handinassignments/users/${user.id}`, {
               headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`,
               },
               info:data.info,
               assignmentName: selectedAssignment,
           })
           const assignmentId = response.data.id;
           console.log(assignmentId);
           const formData = new FormData();
           formData.append("file", uploadedFile);

           const result = await axios.post(`http://localhost:8081/handinassignments/${assignmentId}/file`, formData,
               {
                   headers: {
                       "Content-Type": "multipart/form-data"
                   },
               })
           console.log(result.data);
           setFile([]);
           reset();
       } catch (e) {
           console.log(e)
           toggleError(true);
       }
   }

    async function fetchHomeWorkAssignments() {
        try {
            const {data} = await axios.get(`http://localhost:8081/homeworkassignments/groups/${user.groupid}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }})
            console.log(data);
            setHomeworkAssignments(data);
        } catch (e) {
            console.log(e)
        }
     }

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
                                   <p style={{ fontWeight: 'bold'}}>{assignment.assignmentName} op {assignment.sendDate} </p>
                                   <p style={{ fontStyle: 'italic' }}>"{assignment.info}"</p>
                                </InnerGoldBox>
                                 </span>
                                    <span>
                                    <Button
                                        buttonStyle="download-button"
                                        onClick={()=> handleDownload(assignment)}
                                        buttonType="submit"
                                        buttonText="Downloaden"
                                        key={`download-button-${assignment.id}`}
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
                                            onChange={handleAssignmentSelection}>
                                        <option value="opdracht 1">Opdracht 1 - Van spanning naar ontspanning</option>
                                        <option value="opdracht 2">Opdracht 2 - Een nieuwe start</option>
                                        <option value="opdracht 3">Opdracht 3 - Stap voor Stap</option>
                                        <option value="opdracht 4">Opdracht 4 - Hulp van binnenuit</option>
                                        <option value="opdracht 5">Opdracht 5 - Ontspannen in intimiteit</option>
                                        <option value="opdracht 6">Opdracht 6 - Overwinning in de slaapkamer</option>
                                        <option value="opdracht 7">Opdracht 7 - Kracht van verbeelding</option>
                                        <option value="opdracht 8">Opdracht 8 - Jouw seksuele blauwdruk</option>
                                        <option value="opdracht 9">Opdracht 9 - Op weg naar intimiteit</option>
                                    </select>
                                </label>
                                <br></br>
                                <FormInput
                                    htmlFor="info-field"
                                    labelText="Extra info:"
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
                                            // fileType: (value) =>
                                            //     value[0] && ["pdf", "word"].includes(value[0].type) || "bestand moet een .Word of .Pdf zijn",
                                            fileSize: (value) => value[0] && value[0].size <= 5000000 || "bestand moet  van maximaal 5MB",
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


export default AssignmentsUser;