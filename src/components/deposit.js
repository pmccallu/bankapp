//imports
import React from "react";
import Card from "./context.js";
import { useContext, useState } from "react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "../context/UserContext";
import AccountContext from "../context/AccountContext";
import Form from "react-bootstrap/Form";

// withdraw function including export
export default function Deposit() {
  //set variables
  const [balance, setBalance] = React.useState(0);
  const { user, setUser } = useContext(UserContext);
  const { accounts, setAccounts } = useContext(AccountContext);

  //Function clear form
  function clearForm() {
    formik.resetForm({ values: "" });
  }

  const initialValues = {
    deposit: 0,
  };

  //Function validate function, Yup validates a positive numeric number for deposit
  const validationSchema = Yup.object({
    deposit: Yup.number()
      .required("Numeric deposit required")
      .min(1, "Must withdraw at least $1")
      .max(10000, "Can not deposit more than $10,000")
      .integer("Must be an integer"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit(values, { resetForm }) {
      // check for errors
      if (formik.errors.withdraw) return;

      const amount = parseInt(formik.values.deposit);
      updateAccount(amount);
      resetForm({ values: "" });
    },
  });

  function updateAccount(amount) {
    const updateUser = user; // pulling the user from the state
    updateUser.balance += amount; // modify the balance
    setUser(updateUser); // re set the user on the state
    setBalance(updateUser.balance);
    alert("Deposit successful");

    console.log(user);

    const modifiedAccounts = accounts; // pull the accounts from state

    for (let account of modifiedAccounts) {
      if (account.email === updateUser.email) {
        account.balance = updateUser.balance;
      }
    }
    setAccounts(modifiedAccounts);
  }

  //Return statement, built with Formik example for validation for handling errors & touched
  //  https://formik.org/docs/guides/validation
  return (
    <>
      {user ? (
        <div>
          <Card
            bgcolor="primary"
            header="Deposit Money"
            body={
              <Form onSubmit={formik.handleSubmit}>
                <p>
                  {" "}
                  {user.name} your balance is currently ${user.balance}{" "}
                </p>
                <input
                  id="deposit"
                  label="Deposit"
                  name="deposit"
                  type="number"
                  className="form-control"
                  placeholder="Enter a number"
                  onChange={formik.handleChange}
                  value={formik.values.deposit}
                />
                {formik.errors.deposit ? (
                  <div>{formik.errors.deposit}</div>
                ) : null}

                <button type="submit" className="btn btn-light">
                  Deposit Money
                </button>
                <>
                  <button
                    type="submit"
                    className="btn btn-light"
                    onClick={clearForm}
                  >
                    Reset
                  </button>
                </>
              </Form>
            }
          ></Card>
        </div>
      ) : (
        <p>You are not logged in, please navigate to login screen</p>
      )}
    </>
  );
}
