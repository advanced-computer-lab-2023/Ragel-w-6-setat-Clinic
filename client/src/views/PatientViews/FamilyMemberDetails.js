import React, { useState } from "react";

import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  CardText,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
} from "reactstrap";

import ReactDatetime from "react-datetime";

const FamilyMemberDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <Container className="mt-5" fluid>
        <div className="d-flex justify-content-center">
          <Card
            className="card-profile shadow"
            style={{ backgroundColor: "#EEF5FF", width: "30%" }}
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
        </div>
        <div className="mt-5">
          <Row>
            <Col xl="3">
              <Card
                className=" ml-1 "
                inverse
                style={{
                  width: "19rem",
                  backgroundColor: "#0C356A",
                }}
              >
                <CardHeader
                  style={{
                    backgroundColor: "#0C356A",
                  }}
                >
                  Subscribed Health Package
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5" style={{ color: "#ffffff" }}>
                    Gold Package
                  </CardTitle>
                  <CardText>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-nowrap"
                        style={{
                          color: "white",
                        }}
                      >
                        <div>
                          Status: Canceled
                          <br />
                          Renewal Date: Not determined
                          <br />
                          Cancellation Date: 24-12-2023
                        </div>
                      </span>
                    </p>
                    <Button
                      style={{ backgroundColor: "#F8F6F4" }}
                      className="mt-2"
                      type="button"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xl="9">
              <div className="d-flex justify-content-center mt-3">
                <Card
                  className="shadow"
                  style={{
                    backgroundColor: "#0C356A",
                  }}
                >
                  <CardHeader
                    className="border-0"
                    style={{
                      backgroundColor: "#0C356A",
                    }}
                  >
                    <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                      Jessica's Appointments
                    </h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        >
                          Doctor
                        </th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        ></th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        ></th>
                        <th
                          scope="col"
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f7fafc",
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key="1" style={{ color: "#f7fafc" }}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                Dr. Jessica Jones
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>100 EGP </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Upcoming
                          </Badge>
                        </td>
                        <td> 12-10-2023</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">General</span>
                          </div>
                        </td>
                        <td>
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={toggleModal}
                          >
                            Reschedule
                          </Button>
                          <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>
                              Reschedule appointment
                            </ModalHeader>
                            <ModalBody>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Reschedule to Date:
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
                                          placeholder: "Date",
                                        }}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="default">Reschedule</Button>
                              <Button color="secondary" onClick={toggleModal}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                        <td>
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={toggleModal}
                            disabled
                          >
                            Request Follow-up
                          </Button>
                          <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>
                              Request a Follow-up Appointment
                            </ModalHeader>
                            <ModalBody>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Follow-up Date:
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
                                          placeholder: "Date",
                                        }}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="default">Confirm Request</Button>
                              <Button color="secondary" onClick={toggleModal}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                        <td>
                          <Button color="secondary" size="sm">
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default FamilyMemberDetails;
