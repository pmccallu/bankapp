import React from "react";
import Card from "./context.js";
import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateAccount() {
  const { accounts, setAccounts } = useContext(AccountContext);
  const { user, setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  function clearForm() {
    formik.resetForm({ values: "" });
    setShow(true);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name Required").max(50),
    email: Yup.string().required("Email Required"),
    password: Yup.string().min(8).max(20).required("Password Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      if (formik.errors.name) return;
      if (formik.errors.email) return;
      if (formik.errors.password) return;

      const userAdd = {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        balance: 100,
      };

      for (let account of accounts) {
        if (account.email === userAdd.email) {
          return;
        }
      }

      let users = accounts; // set users to the array of accounts
      users.push(userAdd); //add the new user in
      setAccounts(users); // setting the accounts
      setUser(userAdd); // set the current user

      // get current user
      let user1 = user; // pull user from state
      setUser(user1); // update user state
      setSuccess(true);
      setShow(false);
    },
  });
  //I can't get the conditional (show) and add another account button to function
  return (
    <Card
      bgcolor="secondary"
      header="Create Account"
      status={success ? "Account created" : "Need account info"}
      body={
        show ? (
          <Form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form-control"
              name="name"
              type="input"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <label htmlFor="password">password</label>
            <input
              id="password"
              className="form-control"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <Button className="btn btn-light" variant="primary" type="submit">
              Submit
            </Button>
            <Button className="btn btn-light" type="reset" onClick={clearForm}>
              {" "}
              Reset
            </Button>
          </Form>
        ) : (
          <>
            <p>Click to add another account, or proceed to log-in</p>
            <Button
              className="btn btn-light"
              variant="primary"
              type="submit"
              onClick={clearForm}
            >
              Add another account
            </Button>
          </>
        )
      }
    />
  );
}
