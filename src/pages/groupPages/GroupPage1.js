import React, {useEffect, useState} from "react";
import styles from './GroupPage.module.css';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from '../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import formatSendDate from "../../helpers/formatSendDate";


function GroupPage1() {
    const [group, setGroup] = useState({});
    const [messageBoardId, setMessageBoardId] = useState('');
    const [members, setMembers] = useState([]);
    const [memberImages, setMemberImages] = useState({});
    const [messages, setMessages] = useState([]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onSubmit"});
    const [error, toggleError] = useState(false);
    const [messageSent, setMessageSent] = useState(false);


   async function handleFormSubmit(formData) {
       console.log(formData);
       toggleError(false);
       try {
           const response = await axios.post('http://localhost:8081/messages/1', {
               content:formData.message
           })
           console.log(response);
           setMessageSent(true);
           reset();
           fetchMessagesMessageBoard();
       } catch (e) {
           console.log(e)
           toggleError(true);

       }
    }

    //TODO:aanpassen naar useContext wanneer dat kan, nu is 1 maar is {userId} en let op bij fetcchmessages dat messageboardId gelijk bekend is

    async function fetchGroupMembers() {
        try {
            const {data} = await axios.get('http://localhost:8081/groups/users/1/group');
            console.log(data);
            setGroup(data);
            setMessageBoardId(data.messageBoardId);
            const outcome = data.userPictureOutputDto;
            setMembers(outcome);
            console.log(outcome);
        } catch (e) {
            console.log(e)
        }
    }


    function getImage(member) {
        const base64Photo = member.photo;
        // console.log(base64Photo);
        setMemberImages((prevImages) => ({
            ...prevImages,
            [member.id]: `${base64Photo}`,
        }));
        console.log(memberImages);
    }

    async function fetchMessagesMessageBoard() {
        try {
            if (!messageBoardId) {
                return;
            }
            const {data} = await axios.get(`http://localhost:8081/messageboards/${messageBoardId}`);
            setMessages(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchGroupMembers();
    }, []);

    useEffect(() => {
        fetchMessagesMessageBoard();
    }, [messageBoardId]);


    useEffect(() => {
        members.forEach((member) => getImage(member));
    }, [members]);


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
                                                 <img src={member.photo} alt={member.firstName} className={styles["image-span"]}/>
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
                            <h2> Prikbord van {group.groupName} </h2>
                            <Innerbox>
                                {(messages).length > 0 && (
                                    <>
                                        {(messages).map((message) => (
                                            <span key={message.id}>
                                            <p style={{ fontWeight: 'bold'}}> {message.userLeanOutputDto.firstName }  geschreven op {formatSendDate(message.submitDate)} </p>
                                            <p  style={{ fontStyle: 'italic' }}>"{message.content}"</p>
                                         </span>
                                        ))}
                                    </>
                                )}
                            </Innerbox>
                        </WhiteBox>
                    </article>
                </section>
            </section>
        </div>
    );
//TODO: aanpassen styling zodat de twee linkerkolommen niet groter worden. en Nadenken oplossing voor teveel berichten
}

export default GroupPage1;