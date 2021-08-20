import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";
import Notify from "../Notify/Notify";
import AuthLayout from "../Layouts/AuthLayout";
function Register() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const { userRegister, notification, setNotification } =
    useContext(AuthContext);

  //
  const handleInputOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //REGISTER
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.rePassword) {
      setNotification({
        isShown: true,
        content: "Confirm password not match !!!",
        type: "danger",
      });
      setTimeout(() => {
        setNotification({ isShown: false, ...notification });
      }, 5000);
      return;
    }
    userRegister(input.username, input.password);
  };
  return (
    <AuthLayout>
      <Form className="auth-form" onSubmit={handleOnSubmit}>
        {notification.isShown ? (
          <Notify type={notification.type} content={notification.content} />
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInputOnChange}
            type="text"
            name="username"
            value={input.username}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleInputOnChange}
            type="password"
            name="password"
            value={input.password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control
            onChange={handleInputOnChange}
            type="password"
            name="rePassword"
            value={input.rePassword}
            placeholder="Confirm password"
          />
        </Form.Group>

        <div className="form-footer">
          <Form.Text className="text-muted">
            Already have an account ? Login <Link to="/login">here </Link>!!!
          </Form.Text>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Register;
