import React from "react";
import styles from './LogIn.module.css'
import WhiteBox from "../../components/WhiteBox/WhiteBox";
import Navigation from "../../components/navigation/Navigation";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";

function LogIn(props) {
    return (
        <body className={styles["page-body"]}>
          <Navigation/>
          <section className={styles["outer-container"]}>
              <section className={styles["inner-container"]}>
              <WhiteBox>
                  <h2> Welkom bij Vulva Adventures!</h2>
                  <FormInput>

                  </FormInput>
                  <FormInput>

                  </FormInput>
                  <Button>

                  </Button>

              </WhiteBox>


              />
              </section>
          </section>
        </body>
    );
}

export default LogIn;