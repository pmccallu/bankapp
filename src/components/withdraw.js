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
export default function Withdraw() {
  //set variables
  const [balance, setBalance] = React.useState(0);
  const { user, setUser } = useContext(UserContext);
  const { accounts, setAccounts } = useContext(AccountContext);

  //Function clear form
  function clearForm() {
    formik.resetForm({ values: "" });
  }

  const initialValues = {
    withdraw: 0,
  };

  //Function validate function, Yup validates a positive numeric number for deposit
  const validationSchema = Yup.object({
    withdraw: Yup.number()
      .required("Numeric deposit required")
      .min(1, "Must withdraw at least $1")
      .max(500, "Withdrawl can not exceed $500 or balance")
      .integer("Must be an integer"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit(values, { resetForm }) {
      // check for errors
      if (formik.errors.withdraw) return;
      if (values.withdraw > user.balance) return alert("You can't overdraft");
      const amount = parseInt(formik.values.withdraw);
      updateAccount(amount);
      resetForm({ values: "" });
    },
  });

  function updateAccount(amount) {
    const updateUser = user; // pulling the user from the state
    updateUser.balance -= amount; // modify the balance
    setUser(updateUser); // re set the user on the state
    setBalance(updateUser.balance);
    alert("Withdraw successful");

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
            header="Withdraw Money"
            body={
              <Form onSubmit={formik.handleSubmit}>
                <p>
                  {" "}
                  {user.name} your balance is currently ${user.balance}{" "}
                </p>
                <input
                  id="withdraw"
                  label="Withdraw"
                  name="withdraw"
                  type="number"
                  className="form-control"
                  placeholder="Enter a number"
                  onChange={formik.handleChange}
                  value={formik.values.withdraw}
                />
                {formik.errors.withdraw ? (
                  <div>{formik.errors.withdraw}</div>
                ) : null}

                <button type="submit" className="btn btn-light">
                  Withdraw Money
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
