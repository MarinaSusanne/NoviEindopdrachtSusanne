import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import styles from './GroupPage.module.css';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from '../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import formatSendDate from "../../helpers/formatSendDate";
import {useParams} from "react-router-dom";


function GroupPage() {
    const {user, userGroup, isAuth} = useContext(AuthContext);
    const [groupInfo, setGroupInfo] = useState({});
    const [messageBoardId, setMessageBoardId] = useState('');
    const [members, setMembers] = useState([]);
    const [memberImages, setMemberImages] = useState({});
    const [messages, setMessages] = useState([]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onSubmit"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const token = localStorage.getItem('token');
    const {groupId} = useParams();

    useEffect(() => {
        fetchGroupMembers();
    }, [groupId]);


    useEffect(() => {
        fetchMessagesMessageBoard();
    }, [messageBoardId, messageSent]);


    useEffect(() => {
        members.forEach((member) => getImage(member));
    }, [members]);


    async function handleFormSubmit(formData) {
        console.log(formData.message);
        toggleLoading(true);
        toggleError(false);
        try {
            if (user.username === "admin") {
                const response = await axios.post(`http://localhost:8081/messages/${user.id}`, {
                    content: formData.message,
                    groupId: groupId
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            } else {
                const response = await axios.post(`http://localhost:8081/messages/${user.id}`, {
                    content: formData.message
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            }
            setMessageSent(true);
            reset();
            fetchMessagesMessageBoard();
        } catch (e) {
            console.log(e)
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchGroupMembers() {
        toggleError(false);
        try {
            const {data} = await axios.get(`http://localhost:8081/groups/${groupId}`);
            setGroupInfo(data);
            setMessageBoardId(data.messageBoardId);
            const outcome = data.userPictureOutputDtos;
            setMembers(outcome);
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
    }

    function getImage(member) {
        const base64Photo = member.photo;
        setMemberImages((prevImages) => ({
            ...prevImages,
            [member.id]: `${base64Photo}`,
        }));
        console.log(memberImages);
    }

    async function fetchMessagesMessageBoard() {
        setMessages([]);
        toggleLoading(true);
        toggleError(false);
        try {
            if (!messageBoardId) {
                return;
            }
            const {data} = await axios.get(`http://localhost:8081/messageboards/${messageBoardId}`);
            setMessages(data);
        } catch (e) {
            console.log(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <article className={styles["three-boxes"]}>
                        <div className={styles["two-boxes"]}>
                            <WhiteBox className="group-members">
                                <h2> Groepsleden </h2>
                                {Object.keys(members).length > 0 && (
                                    <>
                                        {Object.values(members).map((member) => (
                                            <span key={member.id} className={styles["group-span"]}>
                                             {memberImages[member.id] && (
                                                 <img src={member.photo} alt={member.firstName}
                                                      className={styles["image-span"]}/>
                                             )}
                                                <p>{member.firstName} {member.lastName}</p>
                                             </span>
                                        ))}
                                    </>
                                )}
                            </WhiteBox>

                            < WhiteBox className="sent-message">
                                <h2> Bericht plaatsen</h2>
                                <Innerbox className="sent-message">
                                    <form className="form-login" onSubmit={handleSubmit(handleFormSubmit)}>
                                        <FormInput
                                            htmlFor="message-field"
                                            labelText=""
                                            type="textarea"
                                            id="message-field"
                                            register={register}
                                            registerName="message"
                                            validationRules={{
                                                required: "Voer een bericht in",
                                                maxLength: {
                                                    value: 200,
                                                    message: "Maximaal 200 karakters"
                                                }
                                            }}
                                            className="input-bigger"
                                            errors={errors}
                                        />
                                        {messageSent && <p> Bericht is verzonden!</p>}
                                        <Button buttonType="submit" buttonText="Verzenden" buttonStyle="buttonStyle"
                                        />
                                    </form>
                                </Innerbox>

                            </WhiteBox>
                        </div>
                        <WhiteBox className="message-board">
                            <h2> Prikbord van {groupInfo.groupName} </h2>
                            <Innerbox>
                                {(messages).length > 0 && (
                                    <>
                                        {(messages).map((message) => (
                                            <span key={message.id}>
                                            <p style={{fontWeight: 'bold'}}> {message.userLeanOutputDto.firstName} geschreven op {formatSendDate(message.submitDate)} </p>
                                            <p style={{fontStyle: 'italic'}}>"{message.content}"</p>
                                         </span>
                                        ))}
                                    </>
                                )}
                            </Innerbox>
                            {loading && (
                                <p style={{color: "purple"}}>
                                    Laden... </p>)}
                        </WhiteBox>
                    </article>
                </section>
            </section>
        </div>
    );
}

export default GroupPage;