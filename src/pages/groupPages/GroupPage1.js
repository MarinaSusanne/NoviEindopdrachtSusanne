import React from "react";
import styles from './GroupPage.module.css';
import Navigation from "../../components/navigation/Navigation";
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from'../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";

function GroupPage1() {
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});

    function handleFormSubmit(data){
       console.log(data)
    }

   async function fetchGroupMembers(){
     const outcomefunction=["bla", "blabla"];
     setMembers(outcomefunction);
    }

    async function fetchMessagesMessageBoard(){
    const outcomeMessages ="bla";
    setMessages(outcomeMessages);
    }

    useEffect(() => {
        fetchGroupMembers();
        fetchMessagesMessageBoard();
    }, []);



    return (
        <body className="outer-container">
         <section className={styles["page-body"]}>
            <section className="inner-container">
                <article className={styles["three-boxes"]}>
                    <div className={styles["two-boxes"]}>
                    <WhiteBox className="group-members">
                    <h2> Groepsleden </h2>
                     {/*   {members.map((member) => (*/}
                     {/*       <span key={member.id}>*/}
                     {/*    <img src={member.photo} alt={member.name} className="image-span"  />*/}
                     {/*   <span> <h3> {member.name} <h3> </span>*/}
                    </WhiteBox>

                    < WhiteBox className="sent-message">
                      <h2> Bericht plaatsen</h2>
                        <Innerbox className="sent-message">
                        <form className="form-login" onSubmit={handleSubmit(handleFormSubmit) }>
                            <FormInput
                                htmlFor="message-field"
                                labelText=""
                                type="text"
                                id="message-field"
                                register = {register}
                                registerName="message"
                                validationRules= {{
                                    maxLength: {
                                        value: 200,
                                        message: "Maximaal 200 karakters"
                                }}}
                                className="input-message"
                                errors={errors}
                            />
                           </form>
                         <Button  buttonType="submit"  buttonText="Verzenden" buttonStyle="buttonStyle"
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
      </body>
    );

}

export default GroupPage1;