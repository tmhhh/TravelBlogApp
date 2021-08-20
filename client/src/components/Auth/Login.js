import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import Notify from "../Notify/Notify";
import "./style.css";
import AuthLayout from "../Layouts/AuthLayout";
function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { userLogin, authState, notification } = useContext(AuthContext);
  const { isAuthenticated, isLoading } = authState;
  console.log(authState);
  //INPUT CHANGE
  const handleInputOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //LOGIN
  const handleOnSubmit = (e) => {
    e.preventDefault();
    userLogin(input.username, input.password);
  };
  return (
    <>
      {!isLoading ? (
        isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <AuthLayout>
            <Form className="auth-form" onSubmit={handleOnSubmit}>
              {notification.isShown ? (
                <Notify
                  type={notification.type}
                  content={notification.content}
                />
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
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <div className="form-footer">
                <Form.Text className="text-muted">
                  Don't have an account ? Register{" "}
                  <Link to="/register">here </Link> !!!
                </Form.Text>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </AuthLayout>
        )
      ) : null}
    </>
  );
}

export default Login;
