import React from 'react';
import styles from './LogIn.module.css';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import Navigation from '../../components/navigation/Navigation';
import FormInput from '../../components/formInput/FormInput';
import Button from '../../components/button/Button';

export default function LogIn() {
    return (
        <body className={styles["page-body"]}>
           <section className="outer-container">
              <section className="inner-container">
              <WhiteBox className={'login-box'}>
                  <h2> Welkom bij Vulva Adventures!</h2>
                  {/* <FormInput>*/}

                  {/*</FormInput>*/}
                  {/*<FormInput>*/}

                  {/*</FormInput>*/}
                  {/*<Button>*/}

                  {/*</Button>*/}
              </WhiteBox>
              </section>
          </section>
        </body>
    );
};
