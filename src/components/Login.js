import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../Contexts/AuthContext";
import { Form, Button } from "react-bootstrap";

import styles from "./Register.module.css";

export default function Login() {
  //Executing Hooks
  const { setActiveUser, loginHandler } = useContext(userContext);
  const [error, setError] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const email = form.email.value;
    const password = form.password.value;

    loginHandler(email, password)
      .then((result) => {
        setActiveUser(result);
        form.reset();
        navigate(location?.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  return (
    <div className={styles.formContainer}>
      <Form onSubmit={(e) => handleSubmit(e)} className="border rounded p-5">
        <h1 className="text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
