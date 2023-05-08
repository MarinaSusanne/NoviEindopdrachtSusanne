import React from "react";
import styles from './GroupPage.module.css';
import Navigation from "../../components/navigation/Navigation";
import WhiteBox from "../../components/whiteBox/WhiteBox";

function GroupPage1() {


    function fetchGroupMembers(){
    let AmountGroupMembers = 8;
    }

    return (
        <body className="outer-container">
        <Navigation/>
        <section className={styles["page-body"]}>
            <section className="inner-container">
                <section className={styles["three-boxes"]}>
                    <section className={styles["two-boxes"]}>
                    <WhiteBox className="group-members">
                    <h2> Groepsleden </h2>
                     functie haal de groepsleden op
                     zet in de state en die hierin gooien om te mappen
                     map over deze lijst en geef foto weer met naam
                     //span en span en daar gewoon styling op
                    </WhiteBox>

                    < WhiteBox>

                    </WhiteBox>
                    </section>
                    <WhiteBox>

                    </WhiteBox>
                </section>
            </section>
        </section>
        </body>
    );

}

export default GroupPage1;