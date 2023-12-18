// reactstrap components

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.js";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Added state for email
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { dispatch } = useAuthContext();

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        switch (data.userType) {
          case "doctor":
            navigate("/doctor");
            break;
          case "patient":
            navigate("/patient");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            // Default redirection or handle unknown user type
            navigate("/default/dashboard");
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setVisible(true);
      setAlertMessage(error.message);
    }
  };

  const toggleForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/resetPasswordOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }), // Pass both username and email
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Implement logic for successful password reset
        // For now, let's just close the modal
        toggleForgotPasswordModal();
      } else {
        // Handle errors from the backend (data.message)
        console.error("Error resetting password:", data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
            <Alert
              className="mt-3"
              color="danger"
              isOpen={visible}
              toggle={onDismiss}
            >
              {alertMessage}
            </Alert>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={toggleForgotPasswordModal}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
        {/* Forgot Password Modal */}
        <Modal
          isOpen={isForgotPasswordModalOpen}
          toggle={toggleForgotPasswordModal}
        >
          <ModalHeader toggle={toggleForgotPasswordModal}>
            Forgot Password
          </ModalHeader>
          <ModalBody>
            <p>Log in with the password sent to you on email</p>
            <Form>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  color="primary"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Col>
    </>
  );
};

export default Login;
