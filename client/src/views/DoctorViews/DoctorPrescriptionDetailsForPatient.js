import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorPrescriptionDetailsForPatient = () => {
  const { prescriptionid } = useParams();
  const { user } = useAuthContext();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [editMode, setEditMode] = useState(false);

  const [prescription, setPrescription] = useState("");

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

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `/doctors/selectPrescription/${user.user._id}/${prescriptionid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setPrescription(data.prescription);
      } catch (error) {
        console.error(
          "Error fetching prescription:",
          error.response.data.message
        );
      }
    };
    fetchPrescription();
  }, [user, prescriptionid]);

  if (!prescription) {
    return <div>Loading...</div>; // Add a loading state or component
  }

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
                    <span className="font-weight-light">
                      Dr. {prescription.doctor.fName}{" "}
                      {prescription.doctor.lName}
                    </span>
                  </div>
                  <div className="h5 mt-4">
                    Medication: <br />
                    <Row>
                      {prescription.medication.map((med, index) => (
                        <Col xl="4" key={index}>
                          <Card
                            className="card-stats mb-4"
                            style={{ backgroundColor: "#f7fafc" }}
                          >
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle className="text-uppercase font-weight-bold mb-0">
                                    {med.name}
                                  </CardTitle>
                                  <span className="h4 text-muted mb-0">
                                    {editMode ? (
                                      <Input type="text" placeholder="Dosage" />
                                    ) : (
                                      `Dosage: ${med.dosage}`
                                    )}
                                  </span>
                                </div>
                              </Row>
                              <p className="mt-1 mb-0 text-muted text-sm">
                                <span className="text-nowrap">
                                  Price : {med.price} EGP
                                </span>
                              </p>
                              {editMode && (
                                <Button color="danger" size="sm">
                                  Delete Medicine
                                </Button>
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className="h5 mt-4">
                    Notes:{" "}
                    <span className="font-weight-light">
                      {prescription.notes}
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
