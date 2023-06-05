import React, {useEffect, useState} from "react";
import styles from './ReadingPageAdmin.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import InnerGoldBox from "../../components/innerGoldBox/InnerGoldBox";
import Button from "../../components/button/Button";

function ReadingPageAdmin() {
    // const [groups, setGroups] = useState([]);
    // const [selectedGroup, setSelectedGroup] = useState(null);
    // const [members, setMembers] = useState([]);
    // const [selectedMember, setSelectedMember] = useState(null);
    // const [assignments, setAssignments] = useState([]);


    // useEffect(() => {
    //     // const outcomefunction = ["bla", "blabla"];
    //     // //getfunction Active Groups
    //     // setGroups(response.data);
    //   // });
    //   // }, []);
    //
    // useEffect(() => {
    //     //getfunction get members selected group
    //     // setMembers (response.data);
    //     //     });
    //     // }, [selectedGroup]);
    //
    // useEffect(()=> {
    //     //getfunction getassignments from member
    //     // setAssignments (repsonde.data)
    //     // }), [selectedGroup, selectedMember]);
    //
    //
    //    function handleGroupChange (e) {
    //    // const outcomefunction = e.target.value;
    //    // setSelectedGroup = outcomefunction;
    //    // setMembers([]);
    //    // setAssignments([]);
    //    // }
    //
    //    function handleMemberChange(e){
    //    //     const outcomefunction = e.target.value;
    //    //     setSelectedMember(outcomefunction);
    //    //     setAssignments([]);
    //    // }
    //
    //    function handleDownload(e){
    //     // //getassignments content
    //     // };



    return (
        <div className="outer-container">
        <section className={styles["page-body"]}>
            <section className="inner-container">
                <WhiteBox className="reading-box">
                    <h2> Ingeleverde opdrachten</h2>
                    <div>
                        {/*<label htmlFor="group-selector">Kies een groep:</label>*/}
                        {/*<select id="group-selector" onChange={handleGroupChange}>*/}
                        {/*    <option value="">-- Selecteer een groep --</option>*/}
                        {/*    {groups.map((group) => (*/}
                        {/*        <option key={group.id} value={group.id}>*/}
                        {/*            {group.name}*/}
                        {/*        </option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                    </div>
                    <div>
                            {/*<label htmlFor="member-selector">Selecteer een groepslid:</label>*/}
                            {/*<select*/}
                            {/*    id="member-selector"*/}
                            {/*    multiple onChange={handleMemberChange}*/}
                            {/*    value={selectedMember}*/}
                            {/*     >*/}
                            {/*    {members.map((member) => (*/}
                            {/*        <option key={member.id} value={member.id}>*/}
                            {/*            {member.name}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</select>*/}
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
    )
 }

export default ReadingPageAdmin();