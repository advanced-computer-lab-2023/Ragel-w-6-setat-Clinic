import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
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
} from "reactstrap";
import ReactDatetime from "react-datetime";

import { useAuthContext } from "../../hooks/useAuthContext";

const PatientPrescriptions = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const [doctorsOptions, setDoctorsOptions] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isFilled, setIsFilled] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/patients/myDoctors/${user.user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        setDoctorsOptions(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error.response.data.message);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          `/patients/viewPrescription/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setPrescriptions(data.prescriptions);
      } catch (error) {
        console.error(
          "Error fetching prescriptions:",
          error.response.data.message
        );
      }
    };

    fetchDoctors();
    fetchPrescriptions();
  }, [user]);

  const handleViewDetailsClick = (prescriptionId) => {
    const url = `/patient/prescriptionDetails/${prescriptionId}`;
    navigate(url);
  };

  const handleFilterPrescriptions = async () => {
    try {
      const response = await fetch(
        `/patients/filterThePrescription/${user.user._id}?doctor=${selectedDoctor}&date=${selectedDate}&isFilled=${isFilled}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setPrescriptions(json.prescriptions);
      }
      setSelectedDoctor("");
      setSelectedDate("");
      setIsFilled("");
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const downloadPDF = async (prescriptionId) => {
    try {
      const response = await fetch(
        `/patients/downloadPrescriptionPDF/${prescriptionId}`,
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
                    Filter with Doctor, Date, and/or Filled/Unfilled
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Doctor:
                          </label>
                          <br />
                          <Input
                            name="select"
                            type="select"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                          >
                            <option value="">All</option>
                            {doctorsOptions.map((doctor, index) => (
                              <option key={index} value={doctor._id}>
                                {doctor.name}
                              </option>
                            ))}
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
                <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                  My Prescriptions
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
                        )}
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
export default PatientPrescriptions;
