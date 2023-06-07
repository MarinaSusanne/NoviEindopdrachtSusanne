import React, {useEffect, useState} from "react";
import styles from './GroupPage.module.css';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from '../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";

function GroupPage1() {
    const [group, setGroup] = useState({});
    const [messageBoardId, setMessageBoardId] = useState({});
    const [members, setMembers] = useState([]);
    const [memberImages, setMemberImages] = useState({});
    const [messages, setMessages] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onSubmit"});


    function handleFormSubmit(data) {
        console.log(data)
    }

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

    //TODO: aanpassen van image! gaat iets mis met de encode64


    async function fetchMessagesMessageBoard() {
        try {
            const {data} = await axios.get(`http://localhost:8081/messageboards/${messageBoardId}`);
            console.log(data);
            setMessages(data);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchGroupMembers();
    }, []);

    useEffect(() => {
        members.forEach((member) => getImage(member));
    }, [members]);

    useEffect(() => {
        fetchMessagesMessageBoard();
    }, [messages]);

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
                                            <span key={member.id}>
                                             {memberImages[member.id] && (
                                                 <img src={member.photo} alt={member.firstName}/>
                                             )}
                                                <h3>{member.firstName}</h3>
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
                                            type="text"
                                            id="message-field"
                                            register={register}
                                            registerName="message"
                                            validationRules={{
                                                maxLength: {
                                                    value: 200,
                                                    message: "Maximaal 200 karakters"
                                                }
                                            }}
                                            className="input-message"
                                            errors={errors}
                                        />
                                    </form>
                                    <Button buttonType="submit" buttonText="Verzenden" buttonStyle="buttonStyle"
                                    />
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
                                            <p>{message.userLeanOutputDto.firstName}</p>
                                             <p>{message.submitDate}</p>
                                            <p>"{message.content}"</p>
                                         </span>
                                            //TODO: check deze code!
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

}

export default GroupPage1;