//components

import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import ReactDatetime from "react-datetime";

const AllDoctors = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Container
            className="mb-5"
            fluid
            style={{ backgroundColor: "#0C356A" }}
          >
            <Form>
              <h6 className="heading-small text-muted mt-2 mb-4">
                Filter/Search for Doctors
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Specialty:
                      </label>
                      <br />
                      <Input name="select" type="select">
                        <option value="">Select Specialty</option>
                        <option value="">Surgeon</option>
                        <option value="">Pediatric</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        First Name of Doctor
                      </label>
                      <Input className="form-control-alternative" type="text" />
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
                        Available on Date:
                      </label>
                      <br />
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "From Date",
                          }}
                          timeFormat={true}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Last Name of Doctor
                      </label>
                      <Input className="form-control-alternative" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Button color="secondary" size="sm">
                      Filter Doctors
                    </Button>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Specialty of Doctor
                      </label>
                      <Input className="form-control-alternative" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6"></Col>
                  <Col lg="6">
                    <Button color="secondary" size="sm">
                      Search Doctors
                    </Button>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
            </Form>
          </Container>
        </Row>
        <Row>
          <Col className="order-xl-6 mb-4" xl="4">
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
                  <h3>
                    Dr. Hana Younis
                    <span className="font-weight-light">, Pediatric</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Session Price: 200
                  </div>
                </div>{" "}
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-6 mb-4" xl="4">
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
                  <h3>
                    Dr. Lojain Tarek
                    <span className="font-weight-light">, Children</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Session Price: 100
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-6 mb-4" xl="4">
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
                  <h3>
                    Dr. Habiba Hilal
                    <span className="font-weight-light">, Surgeon</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Session Price: 500
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-6 mb-4" xl="4">
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
                  <h3>
                    Dr. Lojain Tarek
                    <span className="font-weight-light">, Children</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Session Price: 100
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-6 mb-4" xl="4">
            <Card
              className="card-profile shadow"
              style={{ backgroundColor: "#EEF5FF" }}
            >
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        id="tooltip5"
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
                      target="tooltip5"
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
                  <h3>
                    Dr. Habiba Hilal
                    <span className="font-weight-light">, Surgeon</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Session Price: 500
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

export default AllDoctors;
