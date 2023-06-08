import React, {useState} from 'react';
import styles from "./ReadingPageAdmin.module.css";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import axios from "axios";

const ReadingPageAdmin = () => {
    const [selectedGroup, setSelectedGroup] = useState({});
    const [selectedMember, setSelectedMember] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);



//TODO: actieve groepen uit de context halen. Hieronder keuzemenu aanpassen!
async function handleGroupSelection(value){
    try {
        console.log(value)
        const {data} = await axios.get(`http://localhost:8081/groups/${value}/users`);
        console.log(data);
        setGroupMembers(data);
    } catch (e) {
        console.log(e)
    }
}



return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <WhiteBox className="reading-box">
                        <h2> Ingeleverde opdrachten per persoon</h2>
                        <div>
                            <label htmlFor="group-field" className={styles["selection-field"]}>
                                {"Selecteer een groep:      "}
                                <select id="group-field" value={selectedGroup}
                                        onChange={(e) => handleGroupSelection(e.target.value)}>
                                    <option value="groep1">Groep1</option>
                                    <option value="groep2">Groep2</option>
                                    <option value="groep3">Groep3</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="member-selector">Selecteer een groepslid:</label>
                            <select
                                id="member-selector"
                                multiple onChange={setSelectedMember}
                                value={selectedMember}
                                 >
                                    {groupMembers.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InnerGoldBox className="assignment-readingpage">
                            {/*<div>*/}
                            {/*    <h3>Opdrachten</h3>*/}
                            {/*    {assignments.map((assignment) => (*/}
                            {/*        <div key={assignment.id}>*/}
                            {/*        <span>*/}
                            {/*          <h4>{assignment.name}</h4>*/}
                            {/*          <p>{assignment.assignmentInfo}</p>*/}
                            {/*          <p>{assignment.sentDate}</p>*/}
                            {/*        </span>*/}
                            {/*        <span>*/}
                            {/*          <Button*/}
                            {/*              buttonStyle="download-button"*/}
                            {/*              onClick={handleDownload}*/}
                            {/*              buttonType="submit"*/}
                            {/*              buttonText="Downloaden"*/}
                            {/*          />*/}
                            {/*        </span>*/}
                            {/*      </div>*/}
                            {/*   ))}*/}
                            {/*</div>*/}
                        </InnerGoldBox>
                    </WhiteBox>
                </section>
            </section>
        </div>
    );
};

export default ReadingPageAdmin;