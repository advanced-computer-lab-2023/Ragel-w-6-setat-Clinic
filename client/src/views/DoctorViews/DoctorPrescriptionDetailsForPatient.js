import React, { useState } from "react";

import Select from "react-select";

//components

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  CardTitle,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const DoctorPrescriptionDetailsForPatient = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [editMode, setEditMode] = useState(false);

  const options = [
    { value: "Medicine1", label: "Medicine1" },
    { value: "Medicine2", label: "Medicine2" },
  ];

  const handleDone = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      <Container className="mt-5 mb-5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 mx-auto" xl="6">
            <Card
              className="card-profile shadow"
              style={{ backgroundColor: "#EEF5FF" }}
            >
              <Row>
                <Col className="ml-3 mt-3" xl="12">
                  {editMode ? (
                    <>
                      <Button color="secondary" size="sm" onClick={toggleModal}>
                        Add Medicine
                      </Button>
                      <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                          Add Medicines to this Prescription
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
                        </ModalBody>
                        <ModalFooter>
                          <Button color="default">
                            Confirm New Medicines to Prescription
                          </Button>{" "}
                          <Button color="secondary" onClick={toggleModal}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <Button color="success" size="sm" onClick={handleDone}>
                        Done
                      </Button>{" "}
                      <Button color="danger" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>{" "}
                    </>
                  ) : (
                    <Button color="secondary" size="sm" onClick={handleEdit}>
                      Edit Prescription
                    </Button>
                  )}
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
                                  {editMode ? (
                                    <Input type="text" placeholder="Dosage" />
                                  ) : (
                                    "2 times a day"
                                  )}
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                            {editMode && (
                              <Button color="danger" size="sm">
                                Delete Medicine
                              </Button>
                            )}
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
                                  {editMode ? (
                                    <Input type="text" placeholder="Dosage" />
                                  ) : (
                                    "2 times a day"
                                  )}
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                            {editMode && (
                              <Button color="danger" size="sm">
                                Delete Medicine
                              </Button>
                            )}
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
                                  {editMode ? (
                                    <Input type="text" placeholder="Dosage" />
                                  ) : (
                                    "2 times a day"
                                  )}
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                            {editMode && (
                              <Button color="danger" size="sm">
                                Delete Medicine
                              </Button>
                            )}
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
                                  {editMode ? (
                                    <Input type="text" placeholder="Dosage" />
                                  ) : (
                                    "2 times a day"
                                  )}
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                            {editMode && (
                              <Button color="danger" size="sm">
                                Delete Medicine
                              </Button>
                            )}
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
                                  {editMode ? (
                                    <Input type="text" placeholder="Dosage" />
                                  ) : (
                                    "2 times a day"
                                  )}
                                </span>
                              </div>
                            </Row>
                            <p className="mt-1 mb-0 text-muted text-sm">
                              <span className="text-nowrap">100 EGP</span>
                            </p>
                            {editMode && (
                              <Button color="danger" size="sm">
                                Delete Medicine
                              </Button>
                            )}
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
export default DoctorPrescriptionDetailsForPatient;
