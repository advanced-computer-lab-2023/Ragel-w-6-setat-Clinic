// reactstrap components
import React, { useState } from "react";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Input,
  Media,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const SearchForPatients = () => {
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
                    Filter/Search for Patients
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            First Name of Patient
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Last Name of Patient
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
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
                          Search Patients
                        </Button>
                      </Col>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Get Patients with Upcoming Appointments
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
                        <h3 className="mb-0">Patients</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Patient</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    Hana Younis
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>Female</td>
                            <td>
                              <i className="bg-warning" />
                              01018668669
                            </td>
                            <td>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={toggleModal}
                              >
                                Schedule Follow Up
                              </Button>
                              <Modal isOpen={modal} toggle={toggleModal}>
                                <ModalHeader toggle={toggleModal}>
                                  Schedule follow-up appointment for Hana
                                </ModalHeader>
                                <ModalBody>
                                  <Row>
                                    <Col lg="6">
                                      <FormGroup>
                                        <label className="form-control-label">
                                          Follow-up Appointment Date:
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
                                    Schedule
                                  </Button>{" "}
                                  <Button
                                    color="secondary"
                                    onClick={toggleModal}
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </Modal>
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

export default SearchForPatients;
