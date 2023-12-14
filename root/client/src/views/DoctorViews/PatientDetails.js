//components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";

const PatientDetails = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 mx-auto" xl="8">
            <Card
              className="card-profile shadow mb-5"
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
                          height: "100px",
                          width: "100px",
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
                  <div className="h5 mt-4">
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Patient information
                      </h6>

                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Username
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                type="text"
                                value="drjones"
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Email address
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="email"
                                readOnly
                                value="drjones@gmail.com"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value="Jessica"
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Last name
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value="jones"
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Gender
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value="female"
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Phone Number
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                readOnly
                                value="+201234567890"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">Age</label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value="27"
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <div className="h5 mt-4">
                        <Button
                          block
                          outline
                          href="/doctor/patientPrescriptions"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Patient's Prescriptions
                        </Button>
                      </div>
                      <div className="h5 mt-4">
                        <Button
                          block
                          outline
                          href="/doctor/patientMedicalHistory"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Patient's Medical History
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PatientDetails;
