import React, { useState } from "react";
import Select from "react-select";

import {
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  CardBody,
  Input,
  CardHeader,
  Table,
  Badge,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import ReactDatetime from "react-datetime";

const DoctorPrescriptionsForPatient = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const options = [
    { value: "Medicine1", label: "Medicine1" },
    { value: "Medicine2", label: "Medicine2" },
  ];

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
                    Filter with Date, and/or Filled/Unfilled
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            On Date:
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
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Filled/Unfilled:
                          </label>
                          <br />
                          <Input name="select" type="select">
                            <option value="">All</option>
                            <option value="true">Filled</option>
                            <option value="false">Unfilled</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Filter Prescriptions
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
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
                <Row>
                  <Col lg="6">
                    <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                      Patient's Name Prescriptions
                    </h3>
                  </Col>
                  <Col lg="6">
                    <Button color="secondary" size="sm" onClick={toggleModal}>
                      Add a Prescription
                    </Button>
                    <Modal isOpen={modal} toggle={toggleModal}>
                      <ModalHeader toggle={toggleModal}>
                        Add a Prescription for Patients name
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col className="mt--4" lg="12">
                            <Label className="form-control-label">
                              Medicines Added:
                            </Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Label className="form-control-label">
                                Medicine:
                              </Label>
                              <Select
                                options={options}
                                isSearchable={true}
                                placeholder="Select Medicine"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Label className="form-control-label">
                                Dosage:
                              </Label>
                              <Input type="text" placeholder="Dosage" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mb-3" lg="12">
                            <Button color="default" size="sm">
                              Add Medicine
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Any Notes you'd Like to Mention?
                              </label>
                              <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="default">Add Prescription</Button>{" "}
                        <Button color="secondary" onClick={toggleModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
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
                      Date
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Is Filled?
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
                    <td>24-12-2024 </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        No
                      </Badge>
                    </td>
                    <td>
                      <Button color="secondary" size="sm">
                        View Details
                      </Button>
                    </td>
                    <td>
                      <Button color="secondary" size="sm">
                        Download as PDF
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DoctorPrescriptionsForPatient;
