//components

import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const FamilyMemberList = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="6">
            <Container fluid>
              <Row>
                <Col className="order-xl-6 mb-4" xl="6">
                  <Card
                    className="card-profile shadow"
                    style={{ backgroundColor: "#EEF5FF" }}
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/brand/patienticonf.png")}
                              style={{
                                height: "70px",
                                width: "70px",
                                background: "#EEF5FF",
                              }}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader
                      className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                      style={{ backgroundColor: "#EEF5FF" }}
                    ></CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <div className="text-center">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Sister
                        </div>
                        <h3>
                          Jessica Jones
                          <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Linked: Yes
                        </div>
                      </div>{" "}
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-xl-6 mb-4" xl="6">
                  <Card
                    className="card-profile shadow"
                    style={{ backgroundColor: "#EEF5FF" }}
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/brand/patienticonm.png")}
                              style={{
                                height: "70px",
                                width: "70px",
                                background: "#EEF5FF",
                              }}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader
                      className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                      style={{ backgroundColor: "#EEF5FF" }}
                    ></CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <div className="text-center">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Husband
                        </div>
                        <h3>
                          Jackson Smith
                          <span className="font-weight-light">, 37</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Linked: No
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className="order-xl-6 mb-4" xl="6">
                  <Card
                    className="card-profile shadow"
                    style={{ backgroundColor: "#EEF5FF" }}
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/brand/patienticonf.png")}
                              style={{
                                height: "70px",
                                width: "70px",
                                background: "#EEF5FF",
                              }}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader
                      className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                      style={{ backgroundColor: "#EEF5FF" }}
                    ></CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <div className="text-center">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Sister
                        </div>
                        <h3>
                          Jessica Jones
                          <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Linked: Yes
                        </div>
                      </div>{" "}
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-xl-6 mb-4" xl="6">
                  <Card
                    className="card-profile shadow"
                    style={{ backgroundColor: "#EEF5FF" }}
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/brand/patienticonm.png")}
                              style={{
                                height: "70px",
                                width: "70px",
                                background: "#EEF5FF",
                              }}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader
                      className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                      style={{ backgroundColor: "#EEF5FF" }}
                    ></CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <div className="text-center">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Husband
                        </div>
                        <h3>
                          Jackson Smith
                          <span className="font-weight-light">, 37</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Linked: No
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xl="6">
            <Container fluid>
              <Card className="bg-secondary shadow shadow w-100">
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="8"></Col>
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo" size="sm">
                        Add Family Member
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#0C356A" }}>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Family Member Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              First name
                            </label>
                            <Input
                              required
                              className="form-control-alternative"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Last name
                            </label>
                            <Input
                              required
                              className="form-control-alternative"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              National ID
                            </label>
                            <Input
                              required
                              className="form-control-alternative"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Date of Birth
                            </label>
                            <Input
                              required
                              className="form-control-alternative"
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Gender:
                            </label>
                            <br />
                            <Input name="select" type="select">
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Relationaship:
                            </label>
                            <br />
                            <Input name="select" type="select">
                              <option value="wife">Wife</option>
                              <option value="husband">Husband</option>
                              <option value="child">Child</option>
                              <option value="sibling">Sibling</option>
                              <option value="parent">Parent</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr
                      className="my-4"
                      style={{ backgroundColor: "#f7fafc" }}
                    />
                    <h6 className="heading-small text-muted mb-4">
                      Is your family member a registered patient? Link their
                      account with yours!
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Email (Must match the email your family member
                              registered with)
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <Button color="secondary" href="#pablo" size="sm">
                            Link Family Member
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FamilyMemberList;
