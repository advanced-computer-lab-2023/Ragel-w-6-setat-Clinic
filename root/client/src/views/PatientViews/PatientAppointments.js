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
} from "reactstrap";

import ReactDatetime from "react-datetime";

const PatientAppointments = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <Container className="mt-5" fluid>
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
                </tr>
              </thead>
              <tbody>
                <tr key="1" style={{ color: "#f7fafc" }}>
                  <th scope="row">
                    <Media className="align-items-center">
                      <Media>
                        <span className="mb-0 text-sm">Dr. Jessica Jones</span>
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
                    <Button color="secondary" size="sm" onClick={toggleModal}>
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
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default PatientAppointments;
