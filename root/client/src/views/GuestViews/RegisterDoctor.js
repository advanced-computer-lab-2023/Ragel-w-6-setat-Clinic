import { useState } from "react";
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

  // eslint-disable-next-line
  const [fileID, setFileID] = useState();
  // eslint-disable-next-line
  const [fileMedicalDegree, setFileMedicalDegree] = useState();
  // eslint-disable-next-line
  const [fileMedicalLicense, setFileMedicalLicense] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
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
                <Button className="mt-4" color="primary" type="button">
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
