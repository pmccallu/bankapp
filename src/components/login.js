import AccountContext from "../context/AccountContext";
import UserContext from "../context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import Card from "./context.js";

export default function Login() {
  const { accounts } = useContext(AccountContext);
  const { user, setUser } = useContext(UserContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    handleChange: (value) => {
      console.log(value);
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.table(accounts);
      if (formik.errors.email) return;
      if (formik.errors.password) return;

      for (let account of accounts) {
        if (account.email === formik.values.email) {
          if (account.password === formik.values.password) {
            setUser(account);
            console.log("you are logged in");
            resetForm({ values: "" });
            break;
          }
        }
      }
    },
  });

  return (
    <Card
      bgcolor="secondary"
      header="Login Page"
      status={user ? "Loggedin" : "Not logged in"}
      body={
        <Form onSubmit={formik.handleSubmit}>
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
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}

          <Button className="btn btn-light" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      }
    />
  );
}
