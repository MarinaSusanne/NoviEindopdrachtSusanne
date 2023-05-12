import styles from './AssignmentsUser.module.css';
import React from 'react';
import Navigation from "../../components/navigation/Navigation";
import WhiteBox from "../../components/whiteBox/WhiteBox";

function AssignmentsUser(props) {
    return (
        <body className="outer-container">
        <div className="combine-nav-page">
            <Navigation/>
            <section className={styles["page-body"]}>
                <section className="inner-container">
                 <section className={styles["two-boxes"]}>
                    <WhiteBox
                 </section>
                </section>
            </section>
        </div>
       </body>
    );
}

export default AssignmentsUser;