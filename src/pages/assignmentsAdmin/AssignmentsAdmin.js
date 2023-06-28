import styles from './AssignmentsAdmin.module.css';
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import FormInput from "../../components/formInput/FormInput";
import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import axios from "axios";

function AssignmentsAdmin() {

    const {user, isAuth} = useContext(AuthContext);
    const [homeworkAssignments, setHomeworkAssignments] = useState([]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onSubmit"});
    const [selectedAssignment, setSelectedAssignment] = useState('opdracht 1');
    const [error, toggleError] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState({});
    const [selectedGroupId2, setSelectedGroupId2] = useState({});
    const [file, setFile] = useState([]);
    const token = localStorage.getItem('token');
    const [activeGroups, setActiveGroups] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(() => {
        fetchActiveGroups();
    }, []);


    useEffect(() => {
        if (activeGroups.length > 0) {
            setSelectedGroupId(activeGroups[0].id);
        }
    }, [activeGroups]);



    useEffect(() => {
        if (selectedGroupId) {
            fetchHomeworkAssignments();
        }
    }, [selectedGroupId]);
//hierboven file weggehaald


    function handleGroupSelection(e) {
        const groupId = e.target.value;
        setSelectedGroupId(groupId);
    }

    function handleGroupSelection2(e) {
        setSelectedGroupId2(e.target.value);
    }

    function handleAssignmentSelection(e) {
        setSelectedAssignment(e.target.value);
    }

    async function fetchActiveGroups() {
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/admin/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setActiveGroups(data);
            console.log(activeGroups);
        } catch (e) {
            console.log(e)
        }
    }

    async function handleFormSubmit(data) {
        console.log(data);
        const uploadedFile = data.uploadFile[0];
        setFile(uploadedFile);
        toggleError(false);
        try {
            const response = await axios.post(`http://localhost:8081/homeworkassignments/admin/groups/${selectedGroupId2}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                info: data.info,
                assignmentName: selectedAssignment,
            })
            const assignmentId = response.data.id;
            console.log(assignmentId); // first POST request to create an assignment - retrieve assignmentID to use for the POST request to create and assign a File
            const formData = new FormData();
            formData.append("file", uploadedFile);

            const result = await axios.post(`http://localhost:8081/homeworkassignments/${assignmentId}/file`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
            setFile([]);
            reset();
            setIsSubmitted(true);
        } catch (e) {
            console.error(e)
            toggleError(true);
        }
    }

    async function fetchHomeworkAssignments() {
        try {
            const {data} = await axios.get(`http://localhost:8081/homeworkassignments/groups/${selectedGroupId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setHomeworkAssignments(data);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <article className={styles["two-boxes"]}>
                        <WhiteBox className="assignment-box">
                            <h2> De volgende opdrachten staan online </h2>
                            <label htmlFor="group-field" className={styles["selection-field"]}>
                                {"Selecteer een groep:      "}
                                <select
                                    id="group-field"
                                    onChange={handleGroupSelection}
                                    value={selectedGroupId}
                                >
                                    {activeGroups.map((group) => (<option key={group.id} value={group.id}>
                                            {group.groupName}
                                        </option>
                                    ))}
                                </select>


                            </label>
                            {homeworkAssignments.map((assignment) => (
                                <div key={assignment.id}>
                                   <span>
                                <InnerGoldBox className="assignment-box-admin">
                             <p> {assignment.assignmentName} ~ "{assignment.info}" </p>
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
                                <br></br>
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

                                <label htmlFor="groupselection-field" className={styles["selection-field"]}>
                                    {"Selecteer een groep:      "}
                                    <select
                                        id="groupselection-field"
                                        onChange={handleGroupSelection2}
                                        value={selectedGroupId2}
                                    >
                                        {activeGroups.map((group) => (<option key={group.id} value={group.id}>
                                            {group.groupName}
                                        </option>))}
                                    </select>
                                </label>
                                <br></br>
                                <br></br>

                                <FormInput
                                    htmlFor="uploadfile-field"
                                    labelText="Bestand uploaden:  "
                                    type="file"
                                    id="uploadfile-field"
                                    register={register}
                                    errors={errors}
                                    registerName="uploadFile"
                                    validationRules={{
                                        required: "Je moet een bestand uploaden",
                                        validate: {
                                            fileSize: (value) => value[0] && value[0].size <= 5000000 || "bestand moet  van maximaal 5MB",
                                        },
                                    }}
                                    className="input-uploadfield"
                                    accept=".pdf, .doc, .docx"
                                />
                                <br></br>
                                {isSubmitted && (
                                    <p style={{color: "green"}}>Opdracht is verzonden naar de groep</p>
                                )}
                                {error && (
                                    <p style={{color: "red"}}>
                                        Er is een fout opgetreden bij het verzenden van de opdracht</p>
                                )}
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

export default AssignmentsAdmin;