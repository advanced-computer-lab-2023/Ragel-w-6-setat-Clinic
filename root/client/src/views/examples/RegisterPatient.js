/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const RegisterPatient = () => {
  const [patientFields, setPatientFields] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
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
          alert(`Please complete all the form ${key}`);
          return;
        }
      }

      for (const key in emergencyContact) {
        if (!emergencyContact[key]) {
          alert(`Please complete all the form`);
          return;
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(patientFields.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const response = await axios.post("/patients/register", {
        patientFields,
        emergencyContact,
      });

      console.log(response.data);
      window.location.href = "`http://localhost:3000/auth/login`";
      alert(response.data.message);
    } catch (error) {
      // Handle errors
      console.error("Error registering doctor:", error);
      alert(error.response.data.message);
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
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}

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
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default RegisterPatient;
