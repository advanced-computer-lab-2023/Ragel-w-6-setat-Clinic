import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorPrescriptionsForPatient = () => {
  const navigate = useNavigate();
  const { patientid } = useParams();
  const { user } = useAuthContext();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFilled, setIsFilled] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          `/doctors/patientPrescriptions/${user.user._id}/${patientid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setPrescriptions(data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [user, patientid]);

  const handleFilterPrescriptions = async () => {
    try {
      const response = await fetch(
        `/doctors/filterThePrescription/${user.user._id}/${patientid}?date=${selectedDate}&isFilled=${isFilled}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setPrescriptions(json.prescriptions);
      }
      setSelectedDate("");
      setIsFilled("");
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const downloadPDF = async (prescriptionId) => {
    try {
      const response = await fetch(
        `/doctors/downloadPrescriptionPDF/${prescriptionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Create a blob from the PDF data
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an <a> element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `Prescription_${prescriptionId}.pdf`;

      // Append the <a> element to the body
      document.body.appendChild(a);

      // Click the <a> element to start the download
      a.click();

      // Remove the <a> element from the body
      document.body.removeChild(a);

      // Revoke the URL to release resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading prescription:", error);
    }
  };

  const options = [
    { value: "Medicine1", label: "Medicine1" },
    { value: "Medicine2", label: "Medicine2" },
  ];

  const handleViewDetailsClick = (prescriptionId) => {
    const url = `/doctor/patientPrescriptionDetails/${prescriptionId}`;
    navigate(url);
  };

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
                            <ReactDatetime
                              key={selectedDate}
                              inputProps={{
                                placeholder: "Date",
                              }}
                              timeFormat={false}
                              value={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                            />
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
                          <Input
                            name="select"
                            type="select"
                            value={isFilled}
                            onChange={(e) => setIsFilled(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="true">Filled</option>
                            <option value="false">Unfilled</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={handleFilterPrescriptions}
                        >
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
                      {prescriptions.length > 0
                        ? prescriptions[0].patient.fName.toUpperCase() +
                          " " +
                          prescriptions[0].patient.lName.toUpperCase() +
                          " "
                        : ""}
                      PRESCRIPTIONS
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
                  {prescriptions.map((prescription) => (
                    <tr key={prescription._id} style={{ color: "#f7fafc" }}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              Dr. {prescription.doctor.fName}{" "}
                              {prescription.doctor.lName}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        {new Date(prescription.date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}{" "}
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={
                              prescription.isFilled ? "bg-success" : "bg-danger"
                            }
                          />
                          {prescription.isFilled ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={() =>
                            handleViewDetailsClick(prescription._id)
                          }
                        >
                          View Details
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={() => downloadPDF(prescription._id)}
                        >
                          Download as PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
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
