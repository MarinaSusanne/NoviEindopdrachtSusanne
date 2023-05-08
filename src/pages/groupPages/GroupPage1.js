import React from "react";
import styles from './GroupPage.module.css';
import Navigation from "../../components/navigation/Navigation";
import WhiteBox from "../../components/whiteBox/WhiteBox";

function GroupPage1(props) {
    return (
        <body className="outer-container">
        <Navigation/>
        <section className={styles["page-body"]}>
            <section className="inner-container">
                <section className={styles["three-boxes"]}>
                    <section className={styles["two-boxes"]}>
                    <WhiteBox>

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