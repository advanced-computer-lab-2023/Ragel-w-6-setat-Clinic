import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const HomePatient = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const [patientDetails, setPatientDetails] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `/patients/patientProfile/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setPatientDetails(json.patient);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchPatientDetails();
  }, [user]);

  const cancelMyHealthPackage = async () => {
    try {
      const response = await axios.patch(
        `/patients/cancelHealthPackage/${user.user._id}/`,
        null,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
        setPatientDetails(response.data.patient);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      console.error(
        "Error cancelling the package:",
        error.response.data.message
      );
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleFamilyMembersClick = () => {
    navigate("/patient/familyMembers");
  };
  const handleAppointmentsClick = () => {
    navigate("/patient/myAppointments");
  };
  const handlePrescriptionsClick = () => {
    navigate("/patient/myPrescriptions");
  };

  const handleMedicalHistoryClick = () => {
    navigate("/patient/medicalHistory");
  };

  return (
    <>
      <div
        className="header pb-6 pt-5 pt-lg-2 d-flex align-items-center"
        style={{
          backgroundColor: "#0C356A",
          display: "flex",
        }}
      ></div>
      <Container className="mt--5 ml-6" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card
              className="card-profile shadow"
              style={{ backgroundColor: "#EEF5FF" }}
            >
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/brand/patienticonf.png")}
                        style={{
                          height: "100px",
                          width: "100px",
                          background: "#EEF5FF",
                        }}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader
                className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                style={{ backgroundColor: "#EEF5FF" }}
              ></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="card-profile-stats d-flex justify-content-center mt-md-4"></div>
                <div className="text-center">
                  <h3>
                    {patientDetails.fName} {patientDetails.lName}
                    <span className="font-weight-light">
                      , {calculateAge(patientDetails.dateOfBirth)}
                    </span>
                  </h3>
                  <div className="h5 mt-4">
                    <Button
                      block
                      outline
                      color="default"
                      size="lg"
                      type="button"
                      onClick={handleAppointmentsClick}
                    >
                      Appointments
                    </Button>
                  </div>
                  <div className="h5 mt-4">
                    <Button
                      block
                      outline
                      color="default"
                      size="lg"
                      type="button"
                      onClick={handlePrescriptionsClick}
                    >
                      Prescriptions
                    </Button>
                  </div>
                  <div className="h5 mt-4">
                    <Button
                      block
                      outline
                      color="default"
                      size="lg"
                      type="button"
                      onClick={handleMedicalHistoryClick}
                    >
                      Medical History
                    </Button>
                  </div>

                  <div className="h5 mt-4">
                    <Button
                      block
                      outline
                      color="default"
                      size="lg"
                      type="button"
                      onClick={handleFamilyMembersClick}
                    >
                      Family Members
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-2 mt-5" xl="2">
            <Card
              className="my-2 ml-1 "
              inverse
              style={{
                width: "19rem",
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                Subscribed Health Package
              </CardHeader>
              <CardBody>
                <CardTitle tag="h5" style={{ color: "#ffffff" }}>
                  {patientDetails?.subscribedPackage && (
                    <CardTitle tag="h5" style={{ color: "#ffffff" }}>
                      {patientDetails.subscribedPackage.packageName} Package
                    </CardTitle>
                  )}
                </CardTitle>
                <CardText>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span
                      className="text-nowrap"
                      style={{
                        color: "white",
                      }}
                    >
                      <div>
                        Status:{" "}
                        {patientDetails?.subscribedPackage &&
                          patientDetails.subscribedPackage.subscriptionStatus}
                        <br />
                        Renewal Date:{" "}
                        {patientDetails?.subscribedPackage &&
                          (patientDetails.subscribedPackage.renewalDate === null
                            ? "Not determined"
                            : new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }).format(
                                new Date(
                                  patientDetails.subscribedPackage.renewalDate
                                )
                              ))}
                        <br />
                        Cancellation Date:{" "}
                        {patientDetails?.subscribedPackage &&
                          (patientDetails.subscribedPackage.cancellationDate ===
                          null
                            ? "Not determined"
                            : new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }).format(
                                new Date(
                                  patientDetails.subscribedPackage.cancellationDate
                                )
                              ))}
                      </div>
                    </span>
                  </p>
                  <Button
                    style={{ backgroundColor: "#F8F6F4" }}
                    className="mt-2"
                    type="button"
                    size="sm"
                    disabled={
                      (patientDetails?.subscribedPackage &&
                        patientDetails.subscribedPackage.cancellationDate !==
                          null) ||
                      patientDetails?.subscribedPackage === null
                    }
                    onClick={cancelMyHealthPackage}
                  >
                    Cancel
                  </Button>
                </CardText>
                <Alert color={alertColor} isOpen={visible} toggle={onDismiss}>
                  {alertMessage}
                </Alert>
              </CardBody>
            </Card>
            <Card
              className="card-stats mb-4 mb-xl-0 ml-1"
              style={{
                width: "19rem",
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase  mb-0"
                      style={{ color: "#ffffff" }}
                    >
                      Wallet Amount
                    </CardTitle>
                    <span
                      className="h2 font-weight-bold mb-0"
                      style={{ color: "#ffffff" }}
                    >
                      {patientDetails.wallet} EGP
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-default rounded-circle shadow">
                      <i className="fas fa-percent" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col
            className="order-xl-2 mt-5 ml-7"
            style={{ paddingTop: 9 }}
            xl="4"
          >
            <Card
              style={{
                width: "30rem",
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#0C356A",
                  color: "#ffffff",
                }}
              >
                <i className="fa-solid fa-bell mr-2"></i>
                Notifications
                <Badge
                  className="ml-2"
                  pill
                  style={{ backgroundColor: "#BE3144" }}
                >
                  New
                </Badge>
              </CardHeader>
              <ListGroup
                flush
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-xmark mr-2"></i>
                  Appointment cancelled
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-circle-info mr-2"></i>
                  Appointment rescheduled
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-check mr-2"></i> Appointment
                  schedueled
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-circle-info mr-2"></i>
                  Appointment rescheduled
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-check mr-2"></i> Appointment
                  schedueled
                </ListGroupItem>
              </ListGroup>
              <div className="d-flex justify-content-center mt-3">
                <nav aria-label="...">
                  <Pagination
                    className="pagination pagination-lg"
                    listClassName="pagination-lg"
                  >
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePatient;
