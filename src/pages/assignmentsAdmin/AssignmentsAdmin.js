// import styles from './AssignmentsAdmin.module.css';
// import React, {useEffect, useState} from 'react';
// import WhiteBox from "../../components/whiteBox/WhiteBox";
// import FormInput from "../../components/formInput/FormInput";
// import Button from "../../components/button/Button";
// import {useForm} from "react-hook-form";
//
// function AssignmentsAdmin() {
//
//     const [homeworkAssignments, setHomeworkAssignments] = useState([]);
//     const {register, handleSubmit, formState:{errors}} = useForm({mode:"onSubmit"});
//
//     function handleFormSubmit(data){
//         console.log(data)
//     }
//
//     async function fetchHomeworkAssignments(){
//         const outcomefunction=["bla", "blabla"];
//         setHomeworkAssignments(outcomefunction);
//     }
//
//
//     useEffect(() => {
//         fetchHomeworkAssignments();
//     }, []);
//
//
//     return (
//         <div className="outer-container">
//             <section className={styles["page-body"]}>
//                 <section className="inner-container">
//                     <article className={styles["two-boxes"]}>
//                         <WhiteBox className="assignment-box">
//                             <h2> De volgende opdrachten staan online </h2>
//                             {/*Aanpassen wat hieronder staat!*/}
//                             {/*   {assignments.map((assignment) => (*/}
//                             {/*   <div key={assignment.id}>*/}
//                             {/*<span> <InnerGoldBox className="assignment-box"> */}
//                             {/* <h3> {assignment.assignmentName}</h3> */}
//                             {/*<p> {assignment.assignmentInfo} </p>*/}
//                             {/*</InnerGoldBox> </span> */}
//                             {/*<span> <Button buttonStyle="download-button" onClick={handleDownload} buttonType="submit" buttontext="Downloaden"/>*/}
//                             {/*</span>*/}
//                             {/*</div>*/}
//                         </WhiteBox>
//
//                         < WhiteBox className="assignment-box">
//                             <h2> Inleveren opdracht </h2>
//                             <form>
//                             <Forminput className="form-login" onSubmit={handleSubmit(handleFormSubmit)}>
//                                     htmlFor="name-field"
//                                     labelText="Naam opdracht:"
//                                     type="text"
//                                     id="name-field"
//                                     register = {register}
//                                     registerName="name"
//                                     validationRules= {{
//                                         required: {
//                                             value: true,
//                                             message: 'Dit veld is verplicht',
//                                         },
//                                     }}
//                                     className="input"
//                                     errors={errors}
//                                 />
//
//                                 <FormInput
//                                     htmlFor="info-field"
//                                     labelText="Omschrijving:"
//                                     type="text"
//                                     id="info-field"
//                                     register={register}
//                                     registerName="info"
//                                     validationRules= {{
//                                         required: "Dit veld is verplicht",
//                                         minlength: {
//                                             value: 10,
//                                             message: "Minstens 10 karakters"
//                                         },
//                                         maxLength: {
//                                             value: 500,
//                                             message:"maximaal 200 karakters"
//                                         },
//                                     }}
//                                     className="input-bigger"
//                                     errors={errors}
//                                 />
//
//                                 <FormInput
//                                     htmlFor="uploadfile-field"
//                                     labelText="Bestand uploaden:  "
//                                     type="file"
//                                     id="uploadfile-field"
//                                     register={register}
//                                     errors={errors}
//                                     registerName="uploadFile"
//                                     validationRules={{
//                                         required: true,
//                                         validate: {
//                                             fileType: (value) =>
//                                                 value[0] && ["pdf", "word"].includes(value[0].type),
//                                             fileSize: (value) => value[0] && value[0].size <= 5000000,
//                                             message: "bestand moet een .pdf of .word zijn van maximaal 5MB",
//                                         },
//                                     }}
//                                     className="input-uploadfield"
//                                     accept=".pdf .word"
//                                 />
//                                 <br></br>
//
//                                 <FormInput>
//                                 <label htmlFor="assignment-field" className={styles["selection-field"]}>
//                                     {"Selecteer een opdracht:      "}
//                                     <select id="assignment-field" {...register("opdracht")} >
//                                         <option value="opdracht1">Opdracht 1 - Van spanning naar ontspanning</option>
//                                         <option value="opdracht2">Opdracht 2 - Een nieuwe start</option>
//                                         <option value="opdracht3">Opdracht 3 - Stap voor Stap </option>
//                                         <option value="opdracht4">Opdracht 4 - Hulp van binnenuit</option>
//                                         <option value="opdracht5">Opdracht 5 - Onstspannen in intimiteit</option>
//                                         <option value="opdracht6">Opdracht 6 - Overwinning in de slaapkamer</option>
//                                         <option value="opdracht7">Opdracht 7 - Kracht van verbeelding</option>
//                                         <option value="opdracht8" >Opdracht 8 - Jouw seksuele blauwdruk</option>
//                                         <option value="opdracht9" >Opdracht 9 - Op weg naar intimiteit</option>
//                                     </select>
//                                 </label>
//                                 </FormInput>
//
//                             <Button
//                                 buttonType="submit"
//                                 buttonText="verzenden"
//                                 buttonStyle="buttonStyle"
//                             />
//                         </form>
//                         </WhiteBox>
//                     </article>
//                 </section>
//             </section>
//         </div>
//     );
// }
//
// export default AssignmentsAdmin;