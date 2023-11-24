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
  Label,
} from "reactstrap";

const RegisterDoctor = () => {
  const [agree, setAgree] = useState(false);

  const showEmploymentContract = async (path) => {
    window.open(
      "https://napr.memberclicks.net/assets/docs/OldSite/PhysicianHospitalContract3.pdf"
    );
  };

  const [doctorFields, setDoctorFields] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    dateOfBirth: "",
    sessionPrice: "",
    specialty: "",
    affiliation: "",
    hourlyRate: "",
    educationalBackground: "",
    password: "",
  });

  const [fileID, setFileID] = useState();
  const [fileMedicalDegree, setFileMedicalDegree] = useState();
  const [fileMedicalLicense, setFileMedicalLicense] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleDoctorRegister = async () => {
    try {
      // Validate all fields
      for (const key in doctorFields) {
        if (!doctorFields[key]) {
          alert(`Please complete all the form`);
          return;
        }
      }
      if (!fileID) {
        alert(`Please complete all the form`);
        return;
      }
      if (!fileMedicalDegree) {
        alert(`Please complete all the form`);
        return;
      }
      if (!fileMedicalLicense) {
        alert(`Please complete all the form`);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(doctorFields.email)) {
        alert("Please enter a valid email address");
        return;
      }
      if (!agree) {
        alert(
          "Please view the employment contract and accept to be able to register in the system"
        );
        return;
      }
      const formData = new FormData();
      formData.append("fileID", fileID);
      formData.append("fileMedicalLicense", fileMedicalLicense);
      formData.append("fileMedicalDegree", fileMedicalDegree);

      const requestData = {
        doctorFields: { ...doctorFields },
      };

      formData.append("requestData", JSON.stringify(requestData));

      const response = await axios.post("/doctors/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
                        value={doctorFields.username}
                        onChange={handleChange}
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
                        value={doctorFields.fName}
                        onChange={handleChange}
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
                        value={doctorFields.lName}
                        onChange={handleChange}
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
                        value={doctorFields.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>{" "}
              </Row>
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
                        placeholder="Hourly Rate EGP"
                        type="number"
                        name="hourlyRate"
                        value={doctorFields.hourlyRate}
                        onChange={handleChange}
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
                        value={doctorFields.dateOfBirth}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
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
                        placeholder="Session Price"
                        type="number"
                        name="sessionPrice"
                        value={doctorFields.sessionPrice}
                        onChange={handleChange}
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
                        placeholder="Specialty"
                        type="text"
                        name="specialty"
                        value={doctorFields.specialty}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Affiliation"
                        type="text"
                        name="affiliation"
                        value={doctorFields.affiliation}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Educational Background"
                        type="text"
                        name="educationalBackground"
                        value={doctorFields.educationalBackground}
                        onChange={handleChange}
                      />
                    </InputGroup>
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
                        value={doctorFields.password}
                        onChange={handleChange}
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

              <Row>
                <Col md="12">
                  <small>Upload Personal ID</small>
                  <div class="input-group mb-3">
                    <label class="input-group-text mr-1" for="inputGroupFile01">
                      Upload
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFileID(e.target.files[0])}
                      class="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Meidcal License</small>
                  <div class="input-group mb-3">
                    <label class="input-group-text mr-1" for="inputGroupFile01">
                      Upload
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFileMedicalLicense(e.target.files[0])}
                      class="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Medical Degree</small>
                  <div class="input-group mb-3">
                    <label class="input-group-text mr-1" for="inputGroupFile01">
                      Upload
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFileMedicalDegree(e.target.files[0])}
                      class="form-control"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <Row>
                      <Col xs="6">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            onClick={(e) => {
                              setAgree(!agree);
                            }}
                          />{" "}
                          <Label check>
                            <span className="text-muted">
                              I agree with the Employment Contract
                            </span>
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <Button
                          className="mt-3"
                          color="primary"
                          onClick={() => showEmploymentContract()}
                          size="sm"
                        >
                          View Employment Contract
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleDoctorRegister}
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

export default RegisterDoctor;
