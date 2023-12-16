import React, { useState, useEffect, useContext } from "react";
import { useLocation,useParams } from "react-router-dom";
import { Button, Card, CardBody, Container, Row, Col, Input, CardTitle, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { UserContext } from "../../contexts/UserContext";

const DoctorPrescriptionDetailsForPatient = () => {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [editMode, setEditMode] = useState(false);
  const [dosageChanges, setDosageChanges] = useState({}); // State to track dosage changes
  const [selectedName, setselectedName] = useState("");
  const [selectedDosage, setselectedDosage] = useState("");


  const options = [
    { value: "Medicine1", label: "Medicine1" },
    { value: "Medicine2", label: "Medicine2" },
  ];

  const handleDone = async () => {
    setEditMode(false);
  
    // Extract names from dosageChanges object and sort them
    const medicineNames = Object.keys(dosageChanges).sort();
  
    // Create an array of query parameters in the correct order
    const queryString = medicineNames.map(name => `${encodeURIComponent('name')}=${encodeURIComponent(name)}&${encodeURIComponent('dosage')}=${encodeURIComponent(dosageChanges[name])}`).join('&');
  
    // Send a request to update dosages in the backend
    try {
      const response = await fetch(`/doctors/addDosage/${user._id}?${queryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log(data.message);
  
      // Clear dosageChanges state
      setDosageChanges({});
  
    } catch (error) {
      console.error("Error updating dosages:", error);
    }
  };
  
  

  const handleCancel = () => {
    setEditMode(false);
    // Reset dosageChanges when the user cancels the edit
    setDosageChanges({});
  };

  const handleEdit = () => {
    setEditMode(true);
  };

 // const handleDosageChange = (medicineName, dosage) => {
   // // Update dosageChanges state when the user changes the dosage
   // setDosageChanges((prevDosageChanges) => ({
     // ...prevDosageChanges,
      //[medicineName]: dosage,
    //}));
  //};


  const { user } = useContext(UserContext);
  const [prescription, setPrescription] = useState(null);
  const { prescriptionId } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(`/doctors/selectPrescription/${user._id}/${prescriptionId}`);
        const data = await response.json();
        setPrescription(data.prescription);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [user._id, prescriptionId]);

  if (!prescription) {
    return <div>Loading...</div>; // Add a loading state or component
  }

  const downloadPDF = async (prescriptionId) => {
    try {
      const response = await fetch(`/patients/downloadPrescriptionPDF/${prescriptionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Prescription_${prescriptionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading prescription:", error);
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 mx-auto" xl="6">
            <Card className="card-profile shadow" style={{ backgroundColor: "#EEF5FF" }}>
              <Row>
                <Col className="ml-3 mt-3" xl="12">
                  {editMode ? (
                    <>
                      <Button color="secondary" size="sm" onClick={toggleModal}>
                        Add Medicine
                      </Button>
                      <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Add Medicines to this Prescription</ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col className="mt--4" lg="12">
                              <Label className="form-control-label">Medicines Added:</Label>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label className="form-control-label">Medicine:</Label>
                                <Select options={options} isSearchable={true} placeholder="Select Medicine" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label className="form-control-label">Dosage:</Label>
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
                          <Button color="default" onClick={handleDone}>
                            Confirm New Medicines to Prescription
                          </Button>{" "}
                          <Button color="secondary" onClick={handleCancel}>
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
                    Prescribed by: <span className="font-weight-light">{prescription.doctor.username}</span>
                  </div>
                  <div className="h5 mt-4">
                    Medication: <br />
                    <Row>
                      {prescription.medication.map((med, index) => (
                        <Col xl="4" key={index}>
                          <Card className="card-stats mb-4" style={{ backgroundColor: "#f7fafc" }}>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle className="text-uppercase font-weight-bold mb-0">{med.name}</CardTitle>
                                  <span className="h4 text-muted mb-0">
                                  {editMode ? (
  <Input
    type="text"
    placeholder="Dosage"
    value={dosageChanges[med.name] || ""}
    onChange={(e) => setDosageChanges({ ...dosageChanges, [med.name]: e.target.value })}
  />
) : (
  `Dosage: ${med.dosage}`
)}
</span>

                                </div>
                              </Row>
                              <p className="mt-1 mb-0 text-muted text-sm">
                                <span className="text-nowrap">Price : {med.price} EGP</span>
                                {editMode && (
                                  <Button color="danger" size="sm">
                                    Delete Medicine
                                  </Button>
                                )}
                              </p>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className="h5 mt-4">
                    Notes: <span className="font-weight-light">{prescription.notes}</span>
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
