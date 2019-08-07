import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const SignupForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [signup, setSignup] = useState([]);
  

  useEffect(() => {
    if(status) setSignup([...signup, status]);
  }, [status]);

  console.log(signup)
  return (
    <div className="signup-form">
      <h1>Super Exclusive SignUp Form</h1>
      <Form>
        <Field type="text" name="username" placeholder="Your Name" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}

        <Field type="email" name="email" placeholder="Email Address" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field
          type="password"
          name="password"
          placeholder="Create a Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label className="checkbox-container">
          Terms of Service: You agree that this is the best form ever.
          <Field type="checkbox" name="tos" checked={values.tos} />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {signup.map(submitted => {
        return <p 
        key={submitted.username}> {submitted.email} {submitted.password}</p>
        
      })}

    </div>
  );
};

const FormikSignUpForm = withFormik({
  mapPropsToValues({ username, email, password, tos }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("This is obviously required!"),
    email: Yup.string().required(),
    password: Yup.string()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err.response));
  }
})(SignupForm);

export default FormikSignUpForm;
