import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const PrescriptionDetails = () => {
  const { user } = useAuthContext();

  const [prescription, setPrescription] = useState("");
  const { prescriptionid } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `/patients/selectPrescription/${user.user._id}/${prescriptionid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setPrescription(data.prescription);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [user, prescriptionid]);

  if (!prescription) {
    return <div>Loading...</div>; // Add a loading state or component
  }

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

  const markPrescriptionAsExported = async () => {
    try {
      const response = await fetch(
        `/patients/markPrescriptionAsExported/${prescription._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPrescription((prescription) => ({
          ...prescription,
          exported: true,
        }));
      }

      // You can also update the local state or perform any other necessary actions
    } catch (error) {
      console.error("Error marking prescription as exported:", error);
    }
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
                <Col className="ml-3 mr-6 mt-3" xl="3">
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() => downloadPDF(prescription._id)}
                  >
                    Download as PDF
                  </Button>
                </Col>
                <Col className="mt-3" xl="2"></Col>
                <Col className="mt-3 ml-5 mr--5" xl="4">
                  <Button
                    color="secondary"
                    size="sm"
                    disabled={prescription.exported}
                    onClick={markPrescriptionAsExported}
                  >
                    {prescription.exported
                      ? `Prescription has been exported`
                      : `Export to Pharmacy`}
                  </Button>
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
                                    Dosage: {med.dosage}
                                  </span>
                                </div>
                              </Row>
                              <p className="mt-1 mb-0 text-muted text-sm">
                                <span className="text-nowrap">
                                  Price: {med.price} EGP
                                </span>
                              </p>
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

export default PrescriptionDetails;
