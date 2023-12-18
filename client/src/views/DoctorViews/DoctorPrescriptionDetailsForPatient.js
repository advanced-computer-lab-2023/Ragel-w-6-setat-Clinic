import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  Alert,
} from "reactstrap";

import { Tooltip, IconButton } from "@mui/material";

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorPrescriptionDetailsForPatient = () => {
  const { prescriptionid } = useParams();
  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setAddedMedicines([]);
    setModal(!modal);
  };
  const [editMode, setEditMode] = useState(false);

  const [prescription, setPrescription] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [addedMedicines, setAddedMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  // eslint-disable-next-line
  const [deletedMedicines, setDeletedMedicines] = useState([]);
  const [updatedMedications, setUpdatedMedications] = useState([]);
  const [updatedDosages, setUpdatedDosages] = useState([]);
  const [initialDosages, setInitialDosages] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`/doctors/getAllMedicines`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setMedicines(data);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error.response.data.message);
      }
    };
    fetchMedicines();
  }, [user]);

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
        if (response.ok) {
          setPrescription(data.prescription);
          setUpdatedMedications(data.prescription.medication);
          setInitialDosages(
            data.prescription.medication.map((med) => med.dosage)
          );
        }
      } catch (error) {
        console.error(
          "Error fetching prescription:",
          error.response.data.message
        );
      }
    };
    fetchPrescription();
  }, [user, prescriptionid]);

  const options = medicines.map((medicine) => ({
    value: medicine._id,
    label: medicine.name,
  }));

  useEffect(() => {
    if (editMode) {
      setUpdatedDosages([...initialDosages]);
    }
  }, [editMode, initialDosages]);

  const handleDone = async () => {
    setEditMode(false);
    const newMedications = updatedMedications.map((med, index) => ({
      ...med,
      dosage: updatedDosages[index],
    }));
    setUpdatedMedications(newMedications);

    try {
      const response = await axios.patch(
        `/doctors/updatePrescription/${user.user._id}/${prescriptionid}`,
        { medication: newMedications },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setPrescription(response.data.prescription);
        setUpdatedMedications(response.data.prescription.medication);
        setInitialDosages(
          response.data.prescription.medication.map((med) => med.dosage)
        );
      }
      setDeletedMedicines([]);
    } catch (error) {
      console.error(
        "Error updating prescription:",
        error.response.data.message
      );
    }
  };

  const handleDeleteMedicine = (index) => {
    const deletedMedicine = updatedMedications[index];
    setDeletedMedicines((prevDeleted) => [...prevDeleted, deletedMedicine]);

    const newUpdatedMedication = updatedMedications.filter(
      (medicine, i) => i !== index
    );
    const newUpdatedDosages = updatedDosages.filter((item, i) => i !== index);
    setUpdatedMedications(newUpdatedMedication);
    setUpdatedDosages(newUpdatedDosages);
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedMedications(prescription.medication);
    setUpdatedDosages([...initialDosages]);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleAddMedicine = () => {
    if (!selectedMedicine) {
      setAlertMessage("Please select a medicine");
      setAlertColor("danger");
      setVisible(true);
      return;
    }
    if (!dosage) {
      setAlertMessage("Please enter a dosage");
      setAlertColor("danger");
      setVisible(true);
      return;
    }

    const medicine = {
      medicineId: selectedMedicine.value,
      name: selectedMedicine.label,
      price: medicines.find(
        (medicine) => medicine._id === selectedMedicine.value
      ).price,
      dosage: dosage,
    };

    setAddedMedicines([...addedMedicines, medicine]);
    setSelectedMedicine("");
    setDosage("");
  };

  const handleConfirmNewMedicines = async () => {
    const newMedications = [...updatedMedications, ...addedMedicines];

    setUpdatedDosages([
      ...updatedDosages,
      ...addedMedicines.map((med) => med.dosage),
    ]);
    setUpdatedMedications(newMedications);
    toggleModal();
  };

  if (!prescription) {
    return <div>Loading...</div>;
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
                                Medicines Added: {"["}{" "}
                                {addedMedicines.map(
                                  (medicine) => medicine.name + ", "
                                )}{" "}
                                {"]"}
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
                                  value={selectedMedicine}
                                  onChange={(selectedOption) =>
                                    setSelectedMedicine(selectedOption)
                                  }
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
                                <Input
                                  type="text"
                                  placeholder="Dosage"
                                  value={dosage}
                                  onChange={(e) => setDosage(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mb-3" lg="4">
                              <Button
                                color="default"
                                size="sm"
                                onClick={handleAddMedicine}
                              >
                                Add Medicine
                              </Button>
                            </Col>
                            <Col className="mb-3" lg="8">
                              <Alert
                                color={alertColor}
                                isOpen={visible}
                                toggle={onDismiss}
                                style={{
                                  fontSize: "12px",
                                  padding: "8px 15px",
                                }}
                              >
                                {alertMessage}
                              </Alert>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="default"
                            onClick={handleConfirmNewMedicines}
                          >
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
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={handleEdit}
                      disabled={prescription.isFilled}
                    >
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
                      {updatedMedications.map((med, index) => (
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
                                      <Input
                                        type="text"
                                        value={updatedDosages[index]}
                                        onChange={(e) =>
                                          setUpdatedDosages(
                                            updatedDosages.map((item, i) =>
                                              i === index
                                                ? e.target.value
                                                : item
                                            )
                                          )
                                        }
                                      />
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
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() => handleDeleteMedicine(index)}
                                  >
                                    <i
                                      class="fa-solid fa-trash"
                                      style={{ color: " #f5365c" }}
                                    ></i>
                                  </IconButton>
                                </Tooltip>
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
