//components

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

const PrescriptionDetails = () => {
  return (
    <>
      <Container className="mt-5 ml-6" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="6">
            <Card
              className="card-profile shadow"
              style={{ backgroundColor: "#EEF5FF" }}
            >
              <Row>
                <Col className="ml-3 mr-9 mt-3" xl="3">
                  <Button color="secondary" size="sm">
                    Download as PDF
                  </Button>
                </Col>
                <Col className="mt-3" xl="3">
                  <Button color="secondary" size="sm">
                    Pay with Credit Card
                  </Button>
                </Col>
                <Col className=" mt-3" xl="3">
                  <Button color="secondary" size="sm">
                    Pay with Wallet
                  </Button>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <div className="card-profile-stats d-flex justify-content-center mt-md-2"></div>
                <div className="text-center">
                  <h3>Prescription Details</h3>
                  <div className="h5 mt-4">
                    Prescribed by:{" "}
                    <span className="font-weight-light">Dr. Jessica Jones</span>
                  </div>
                  <div className="h5 mt-4">
                    Medication: <br />
                    <Row>
                      <Col xl="4">
                        <Card
                          className="card-stats mb-4"
                          style={{ backgroundColor: "#f7fafc" }}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase font-weight-bold mb-0">
                                  Panadol
                                </CardTitle>
                                <span className="h4 text-muted mb-0">
                                  2 times a day
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl="4">
                        <Card
                          className="card-stats mb-4"
                          style={{ backgroundColor: "#f7fafc" }}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase font-weight-bold mb-0">
                                  Panadol
                                </CardTitle>
                                <span className="h4 text-muted mb-0">
                                  2 times a day
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl="4">
                        <Card
                          className="card-stats mb-4"
                          style={{ backgroundColor: "#f7fafc" }}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase font-weight-bold mb-0">
                                  Panadol
                                </CardTitle>
                                <span className="h4 text-muted mb-0">
                                  2 times a day
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl="4">
                        <Card
                          className="card-stats mb-4"
                          style={{ backgroundColor: "#f7fafc" }}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase font-weight-bold mb-0">
                                  Panadol
                                </CardTitle>
                                <span className="h4 text-muted mb-0">
                                  2 times a day
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl="4">
                        <Card
                          className="card-stats mb-4"
                          style={{ backgroundColor: "#f7fafc" }}
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle className="text-uppercase font-weight-bold mb-0">
                                  Panadol
                                </CardTitle>
                                <span className="h4 text-muted mb-0">
                                  2 times a day
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                  <div className="h5 mt-4">
                    Notes:{" "}
                    <span className="font-weight-light">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
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
export default PrescriptionDetails;
