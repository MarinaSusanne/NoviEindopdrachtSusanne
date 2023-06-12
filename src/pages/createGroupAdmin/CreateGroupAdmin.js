import styles from './CreateGroupAdmin.module.css';
import React from 'react';
import WhiteBox from "../../components/whiteBox/WhiteBox";
import Innerbox from '../../components/innerGoldBox/InnerGoldBox';
import Button from '../../components/button/Button';
import FormInput from "../../components/formInput/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";

function CreateGroupAdmin() {

function handleFormSubmit(){

}


    return (
        <div className="outer-container">
            <section className={styles["page-body"]}>
                <section className="inner-container">
                    <WhiteBox className='register-box'>
                        <h2> Groep aanmaken</h2>
                        <form className="group-registration" onSubmit={handleSubmit(handleFormSubmit)}>
                            <FormInput>

                            </FormInput>
                        </form>
                    </WhiteBox>
                </section>
            </section>
        </div>
    )

}

export default CreateGroupAdmin;