import React, {useEffect, useState, useContext} from 'react';
import styles from "./ReadingPageAdmin.module.css";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import axios from "axios";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import logIn from "../logIn/LogIn";

const ReadingPageAdmin = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(1);
    const [selectedMember, setSelectedMember] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);
    const [activeGroups, setActiveGroups] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const {user, isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchActiveGroups();
    }, []);

    useEffect(() => {
        if (activeGroups.length > 0) {
            setSelectedGroupId(activeGroups[0].id);
        }
    }, [activeGroups]);

    useEffect(() => {
        fetchGroupMembers();
    }, [selectedGroupId]);

    useEffect(() => {
        if (groupMembers.length > 0) {
            setSelectedMember(groupMembers[0]);
            fetchAssignmentsByMember(groupMembers[0]);
        }
    }, [groupMembers]);

    async function fetchActiveGroups() {
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/admin/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setActiveGroups(data);
        } catch (e) {
            console.log(e)
        }
    }

    function handleGroupSelection(e) {
        const groupId = e.target.value;
        setSelectedGroupId(groupId);
    }

    async function fetchGroupMembers() {
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/${selectedGroupId}/users`);
            setGroupMembers(data);
            setSelectedMember({});
        } catch (e) {
            console.log(e);
        }
    }

    function handleMemberSelection(e) {
        const memberId = parseInt(e.target.value);
        const selectedMember1 = groupMembers.find(member => member.id === memberId);
        setSelectedMember(selectedMember1)
        fetchAssignmentsByMember(selectedMember1);
    }

    async function fetchAssignmentsByMember(selectedMember1) {
        if (!selectedMember) {
            return;
        }
        try {
            console.log(selectedMember);
            const {data} = await axios.get(`http://localhost:8081/handinassignments/${selectedMember1.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
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
                                <select id="group-field" value={selectedGroupId?.id}
                                        onChange={handleGroupSelection}>
                                    >
                                    {activeGroups.map((group) => (<option key={group.id} value={group.id}>
                                        {group.groupName}
                                    </option>))}
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
                                    <p style={{fontWeight: 'bold'}}>{assignment.assignmentName} op {assignment.sendDate}</p>
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
