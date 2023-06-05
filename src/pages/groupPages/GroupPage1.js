import React, {useEffect, useState} from "react";
import styles from './GroupPage.module.css';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from '../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";

function GroupPage1() {
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
            const outcome = data.userLeanOutputDtos;
            setMembers(outcome);
        } catch (e) {
            console.log(e)
        }
    }

    function getImage(member) {
        const base64Photo = member.photo;
        console.log(base64Photo);
        const img = new Image();
        img.src = `data:image/jpeg;base64,${base64Photo}`;
        setMemberImages((prevImages) => ({
            ...prevImages,
            [member.id]: img,
        }));
    }


// async function fetchMessagesMessageBoard() {
//     const outcomeMessages = "bla";
//     setMessages(outcomeMessages);
// }


    useEffect(() => {
        fetchGroupMembers();
        // fetchMessagesMessageBoard();
    }, []);

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
                                {members.map((member) => (
                                    <span key={member.id}>
                                   {memberImages[member.id] && (
                                   <img src={memberImages[member.id].src} alt={member.firstName}/>
                                   )}
                                   <h3>{member.firstName}</h3>
                                    </span>
                                ))}
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
                            <h2> Prikbord VOEG TOE GROEPNAAM </h2>
                            <Innerbox>
                                {/*   {messages.map((message) => (*/}
                                {/*   <span key={message.id}>*/}
                                {/*<p>{message.author}</p>
                             <p>{new Date(message.createdAt).toLocaleString()}</p>
                             <p>"{message.content}"</p> </span>*/}
                            </Innerbox>
                        </WhiteBox>
                    </article>
                </section>
            </section>
        </div>
    );

}

export default GroupPage1;