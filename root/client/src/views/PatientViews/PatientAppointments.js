import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Media,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  CardBody,
  Input,
} from "reactstrap";

import ReactDatetime from "react-datetime";

const PatientAppointments = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2);

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="3">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Date and/or Status
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Status:
                          </label>
                          <br />
                          <Input name="select" type="select">
                            <option value="">All</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </Input>
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
                            From Date:
                          </label>
                          <br />
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime timeFormat={false} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Filter Appointments
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="6">
                        <Button color="secondary" size="sm">
                          Upcoming Appointments
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button color="secondary" size="sm">
                          Past Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="9">
            <div className="d-flex justify-content-center mt-5">
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
                    My Appointments
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
                          onClick={toggleModal2}
                        >
                          Request Follow-up
                        </Button>
                        <Modal isOpen={modal2} toggle={toggleModal2}>
                          <ModalHeader toggle={toggleModal2}>
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
                            <Button color="secondary" onClick={toggleModal2}>
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
      </Container>
    </>
  );
};

export default PatientAppointments;
