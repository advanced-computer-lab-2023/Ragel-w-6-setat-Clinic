import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CardBody,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

const DoctorPatients = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter/Search for Patients
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            First Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Last Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Search Patients
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Get Patients with Upcoming Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
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
                              id="tooltip1"
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
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltip1"
                            style={{ backgroundColor: "#0C356A" }}
                          >
                            Click to view profile
                          </UncontrolledTooltip>
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
                          Female
                        </div>
                        <h3>
                          Jessica Jones
                          <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone No.: 01000000000
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
                              id="tooltip2"
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
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltip2"
                            style={{ backgroundColor: "#0C356A" }}
                          >
                            Click to view profile
                          </UncontrolledTooltip>
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
                          Male
                        </div>
                        <h3>
                          Jackson Smith
                          <span className="font-weight-light">, 37</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone No.: 01000000000
                        </div>
                      </div>
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
                              id="tooltip3"
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
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltip3"
                            style={{ backgroundColor: "#0C356A" }}
                          >
                            Click to view profile
                          </UncontrolledTooltip>
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
                          Female
                        </div>
                        <h3>
                          Jessica Jones
                          <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone No.: 01000000000
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
                              id="tooltip4"
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
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltip4"
                            style={{ backgroundColor: "#0C356A" }}
                          >
                            Click to view profile
                          </UncontrolledTooltip>
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
                          Male
                        </div>
                        <h3>
                          Jackson Smith
                          <span className="font-weight-light">, 37</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone No.: 01000000000
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorPatients;
