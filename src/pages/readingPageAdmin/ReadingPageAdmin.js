import React, {useEffect, useState} from 'react';
import styles from "./ReadingPageAdmin.module.css";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import axios from "axios";
import Button from "../../components/button/Button";

const ReadingPageAdmin = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(1);
    const [selectedMember, setSelectedMember] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);
    const [error, toggleError] = useState(false);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchGroupMembers();
    }, []);

    function handleGroupSelection(e) {
        console.log(e)
        setSelectedGroupId(e.target.value);
        fetchGroupMembers();
    }

    async function fetchGroupMembers(e) {
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/${selectedGroupId}/users`);
            console.log(data);
            setGroupMembers(data);
        } catch (e) {
            console.log(e)
        }
    }

    function handleMemberSelection(e) {
        const memberId = parseInt(e.target.value);
        const selectedMember = groupMembers.find(member => member.id === memberId);
        setSelectedMember(selectedMember);
        fetchAssignmentsByMember();
    }

    async function fetchAssignmentsByMember() {
        try {
            console.log(selectedMember);
            const {data} = await axios.get(`http://localhost:8081/handinassignments/${selectedMember.id}`);
            console.log(data);
            setAssignments(data);
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDownload(assignment) {
        try {
            console.log(assignment);
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


    return (<div className="outer-container">
        <section className={styles["page-body"]}>
            <section className="inner-container">
                <article className={styles["reading-box"]}>
                    <WhiteBox className="reading-box">
                        <h2> Ingeleverde opdrachten per persoon</h2>
                        <div>
                            <label htmlFor="group-field" className={styles["selection-field"]}>
                                {"Selecteer een groep:"}
                                <br></br>
                                <select id="group-field" value={selectedGroupId}
                                        onChange={handleGroupSelection}>
                                    <option value="groep 1">Groep1</option>
                                    <option value="groep 2">Groep2</option>
                                    <option value="groep 3">Groep3</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="member-selector">Selecteer een groepslid:</label>
                            <br></br>
                            <select
                                id="member-selector"
                                onChange={handleMemberSelection}
                                value={selectedMember?.id}
                            >
                                {groupMembers.map((member) => (<option key={member.id} value={member.id}>
                                    {member.firstName} {member.lastName}
                                </option>))}
                            </select>
                        </div>
                        <InnerGoldBox className="assignment-readingpage">
                            <div>
                                {assignments.map((assignment) => (<div key={assignment.id}>
                                    <h4>{assignment.name}</h4>
                                    <p style={{fontWeight: 'bold'}}>{assignment.assignmentName} op {assignment.sentDate}</p>
                                    <p style={{fontStyle: 'italic'}}>{assignment.info}</p>
                                    <Button
                                        buttonStyle="download-button"
                                        onClick={() => handleDownload(assignment)}
                                        buttonType="submit"
                                        buttonText="Downloaden"
                                        key={`download-button-${assignment.id}`}
                                    />
                                </div>))}
                            </div>
                        </InnerGoldBox>
                    </WhiteBox>
                </article>
            </section>
        </section>
    </div>);
};

export default ReadingPageAdmin;
