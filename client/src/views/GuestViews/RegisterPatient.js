import { useState } from "react";
import axios from "axios";
// reactstrap components
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
} from "reactstrap";

const RegisterPatient = () => {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [patientFields, setPatientFields] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    dateOfBirth: "",
    gender: "female",
    nationalID: "",
    phoneNum: "",
    password: "",
  });

  const [emergencyContact, setEmergencyContact] = useState({
    fName: "",
    lName: "",
    phoneNum: "",
  });

  const handleChangePatientFields = (e) => {
    const { name, value } = e.target;
    setPatientFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleChangeEmergencyContact = (e) => {
    const { name, value } = e.target;
    setEmergencyContact((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handlePatientRegister = async () => {
    try {
      // Validate all fields
      for (const key in patientFields) {
        if (!patientFields[key]) {
          setVisible(true);
          setAlertMessage(`Please complete all the form`);
          return;
        }
      }

      for (const key in emergencyContact) {
        if (!emergencyContact[key]) {
          setVisible(true);
          setAlertMessage(`Please complete all the form`);
          return;
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(patientFields.email)) {
        setVisible(true);
        setAlertMessage("Please enter a valid email address");
        return;
      }

      // Validate username format
      const usernameRegex = /^[^\s]+$/;
      if (!usernameRegex.test(patientFields.username)) {
        setVisible(true);
        setAlertMessage("Username should not contain spaces");
        return;
      }

      // // ensure password is at least 8 characters, with one uppercase letter, and one symbol
      // const passwordRegex =
      //   /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
      // if (!passwordRegex.test(patientFields.password)) {
      //   setVisible(true);
      //   setAlertMessage(
      //     "Password should be at least 8 characters, with one uppercase letter, and one symbol"
      //   );
      //   return;
      // }

      await axios.post("/registerPatient", {
        patientFields,
        emergencyContact,
      });

      window.location.href = "`http://localhost:3000/auth/login`";
    } catch (error) {
      console.error("Error registering patient:", error);
      setVisible(true);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
              {/* complete the form in the same style with username, educational Background, specialty, aaffiliation, and hourly rate, session price, and date of birth fields */}

              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={patientFields.username}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        name="fName"
                        value={patientFields.fName}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>{" "}
              </Row>

              <Row>
                {" "}
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        name="lName"
                        value={patientFields.lName}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={patientFields.email}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-mobile-button" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mobile Number"
                        type="text"
                        name="phoneNum"
                        value={patientFields.phoneNum}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={patientFields.dateOfBirth}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      id="dropdown"
                      type="select"
                      className="form-control-alternative"
                      name="gender"
                      value={patientFields.gender}
                      onChange={handleChangePatientFields}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      id="dropdown"
                      placeholder="National ID"
                      className="form-control-alternative"
                      name="nationalID"
                      value={patientFields.nationalID}
                      onChange={handleChangePatientFields}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
                        name="password"
                        value={patientFields.password}
                        onChange={handleChangePatientFields}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <div className="text-center text-muted mb-4">
                <small>Emergency Contact Details</small>
              </div>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        placeholder="First Name"
                        type="text"
                        name="fName"
                        value={emergencyContact.fName}
                        onChange={handleChangeEmergencyContact}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        placeholder="Last Name"
                        type="text"
                        name="lName"
                        value={emergencyContact.lName}
                        onChange={handleChangeEmergencyContact}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        placeholder="Phone Number"
                        type="text"
                        name="phoneNum"
                        value={emergencyContact.phoneNum}
                        onChange={handleChangeEmergencyContact}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handlePatientRegister}
                >
                  Create account
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
      </Col>
    </>
  );
};

export default RegisterPatient;
