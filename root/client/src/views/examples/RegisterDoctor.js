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

const RegisterDoctor = () => {
  const [agree, setAgree] = useState(false);

  const showEmploymentContract = async (path) => {
    window.open(
      "https://napr.memberclicks.net/assets/docs/OldSite/PhysicianHospitalContract3.pdf"
    );
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
                      <Input placeholder="Username" type="text" />
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
                      <Input placeholder="First Name" type="text" />
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
                      <Input placeholder="Last Name" type="text" />
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
                        autoComplete="new-email"
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
                        autoComplete="new-mobile-number"
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
                      <Input placeholder="Date of Birth" type="date" />
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
                      <Input placeholder="Session Price" type="number" />
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
                      <Input placeholder="Specialty" type="text" />
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
                      <Input placeholder="Affiliation" type="text" />
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
                      <Input placeholder="Hourly Rate EGP" type="number" />
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
                      <Input placeholder="Educational Background" type="text" />
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
                        autoComplete="new-password"
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
                    <label
                      class="input-group-text mr-1"
                      for="inputGroupFile01"
                      // onClick={handleUpload}
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      // onChange={(e) => setFile(e.target.files[0])}
                      class="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Meidcal License</small>
                  <div class="input-group mb-3">
                    <label
                      class="input-group-text mr-1"
                      for="inputGroupFile01"
                      // onClick={handleUpload}
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      // onChange={(e) => setFile(e.target.files[0])}
                      class="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Medical Degree</small>
                  <div class="input-group mb-3">
                    <label
                      class="input-group-text mr-1"
                      for="inputGroupFile01"
                      // onClick={handleUpload}
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      // onChange={(e) => setFile(e.target.files[0])}
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
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                setAgree(!agree);
                              }}
                            >
                              Employment Contract
                            </a>
                          </span>
                        </label>{" "}
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
