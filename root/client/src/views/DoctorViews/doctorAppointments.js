// reactstrap components
import React, { useState } from "react";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Media,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const DoctorAppointments = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Date and/or Status
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Status:</label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            From Date:
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
                              timeFormat={false}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Filter Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Show Upcoming Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Show Past Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                {/* Table */}
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row>
                          <Col lg="6">
                            <h3 className="mb-0">Appointments</h3>
                          </Col>
                          <Col lg="6">
                            <Button
                              color="primary"
                              size="sm"
                              onClick={toggleModal}
                            >
                              Add Available Appointment
                            </Button>
                            <Modal isOpen={modal} toggle={toggleModal}>
                              <ModalHeader toggle={toggleModal}>
                                Add an extra available time-slot for an
                                appointment
                              </ModalHeader>
                              <ModalBody>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Appointment Date:
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
                                </Row>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Price of Appointment
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        type="number"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" onClick={toggleModal}>
                                  Add Appointment
                                </Button>{" "}
                                <Button color="secondary" onClick={toggleModal}>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </Col>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Patient</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    Lojain Tarek
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>$2,500 USD</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                upcoming
                              </Badge>
                            </td>
                            <td>23-12-2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">Follow-up</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorAppointments;
