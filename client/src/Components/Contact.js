import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Formik } from "formik";
import * as yup from "yup";

const Schema = yup.object().shape({});

const initialValues = {
  email: "",
  message: "",
  Nom: "",
  Telephone: "",
  password: "",
  // location: "",
  // occupation: "",
  picture: "",
};

const Contact = () => {
  const form = useRef();
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (values.email !== "" && values.message !== "") {
      sendEmail();
    }
  };
  const sendEmail = () => {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_x2ptuea",
        "template_rjksv7n",
        form.current,
        "0gVLi2r1jSXZY0q1H"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Avez-vous une question en tête ?</h1>
      <h1 className="primary-heading">Laissez-nous vous aider.</h1>
      <div
        className="contact-form-container"
        style={{ flexDirection: "column" }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={Schema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form ref={form} onSubmit={handleSubmit}>
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Votre email ..."
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              
              {/* <input value={values.email} onChange={handleChange}  type="text" placeholder="Votre email ..." style={{ border: '1px solid grey' , borderRadius: '5px' , width: '80%' }}  /> */}
             

              <div className="contact-form-container2">
                <TextField
                  id="comment"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder="Votre message ..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.message}
                  name="message"
                  error={Boolean(touched.message) && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <form ref={form} onSubmit={HandleSoumettre} > */}
                {/* <input hidden value={values.message} type="text" name="message" />
            <input hidden value={values.email} type="email" name="user_email" /> */}
                <button
                  type="submit"
                  className="secondary-button"
                  style={{ marginLeft: "5px" }}
                >
                  Soumettre
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
