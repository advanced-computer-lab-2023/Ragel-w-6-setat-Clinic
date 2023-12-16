import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  CardText,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Media,
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const FamilyMemberDetails = () => {
  const { user } = useAuthContext();
  const { familymemberemail } = useParams();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [modalStates, setModalStates] = useState([]);
  const toggleAppointmentModal = async (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
    if (updatedModalStates[index]) {
      // if the modal is opened, fetch available appointments
      const appointment = allAppointments[index];
      if (appointment?.doctor) {
        await fetchDoctorsAvailableAppointments(appointment.doctor._id);
      }
    }
  };
  const [modalStates2, setModalStates2] = useState([]);
  const toggleAppointmentModal2 = async (index) => {
    const updatedModalStates = [...modalStates2];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates2(updatedModalStates);
    if (updatedModalStates[index]) {
      // if the modal is opened, fetch available appointments
      const appointment = allAppointments[index];
      if (appointment?.doctor) {
        await fetchDoctorsAvailableAppointments(appointment.doctor._id);
      }
    }
  };

  const [familyMember, setFamilyMember] = useState("");
  const [relationship, setRelationship] = useState("");
  const [allAppointments, setAllAppointments] = useState([]);
  const [doctorsAvailableAppointments, setDoctorsAvailableAppointments] =
    useState([]);
  const [rescheduleAppointment, setRescheduleAppointment] = useState("");
  const [followUpAppointment, setFollowUpAppointment] = useState("");

  useEffect(() => {
    const fetchFamilyMember = async () => {
      try {
        const response = await fetch(
          `/patients/getFamilyMember/${user.user._id}?familyMemberEmail=${familymemberemail}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setFamilyMember(data.familyMember);
        setRelationship(data.relationship);
        setAllAppointments(data.familyMemberAppointments);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchFamilyMember();
  }, [user, familymemberemail]);

  const fetchDoctorsAvailableAppointments = async (doctorid) => {
    try {
      const response = await fetch(
        `/patients/doctorDetails/availableAppointment/${user.user._id}/${doctorid}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setDoctorsAvailableAppointments(json);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const availableAppointmentsDates = doctorsAvailableAppointments.map(
    (appointment) => ({
      value: appointment._id,
      label: new Date(appointment.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    })
  );

  useEffect(() => {
    const initialModalStates = allAppointments.map(() => false);
    setModalStates(initialModalStates);
    setModalStates2(initialModalStates);
  }, [allAppointments]);

  const handleReschedule = async (appointment) => {
    try {
      const response = await axios.patch(
        `/patients/rescheduleAppointmentforPatient/${familyMember._id}/${appointment._id}`,
        {
          appointmentRechedueledTo: rescheduleAppointment,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        toggleAppointmentModal(allAppointments.indexOf(appointment));
        setRescheduleAppointment("");
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while rescheduling:", error);
    }
  };

  const handleFollowUp = async (appointment) => {
    try {
      const response = await axios.post(
        `/patients/requestFollowUp/${familyMember._id}`,
        {
          followUpAppointment: followUpAppointment,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        toggleAppointmentModal2(allAppointments.indexOf(appointment));
        setAllAppointments(response.data.patientAppointments);
        setFollowUpAppointment("");
      }
    } catch (error) {
      console.error(
        "An error occurred while requesting follow-up:",
        error.response.data.message
      );
    }
  };

  const handleCancel = async (appointment) => {
    try {
      const response = await axios.patch(
        `/patients/cancelAppointment/${appointment._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        // Assuming you want to update the UI after successful cancellation
        const updatedAppointments = allAppointments.map((app) => {
          if (app._id === appointment._id) {
            return { ...app, status: "cancelled" };
          }
          return app;
        });
        setAllAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error(
        "An error occurred while cancelling:",
        error.response.data.message
      );
    }
  };
  const cancelHealthPackage = async () => {
    try {
      const response = await axios.patch(
        `/patients/cancelHealthPackage/${familyMember._id}/`,
        null,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
        setFamilyMember(response.data.patient);
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

  return (
    <>
      <Container className="mt-5" fluid>
        <div className="d-flex justify-content-center">
          <Card
            className="card-profile shadow"
            style={{ backgroundColor: "#EEF5FF", width: "30%" }}
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
                        height: "70px",
                        width: "70px",
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
              <div className="text-center">
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {relationship}
                </div>
                <h3>
                  {familyMember?.fName} {familyMember?.lName}
                  <span className="font-weight-light">
                    , {familyMember && calculateAge(familyMember.dateOfBirth)}
                  </span>
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  Linked: Yes
                </div>
              </div>{" "}
            </CardBody>
          </Card>
        </div>
        <div className="mt-5">
          <Row>
            <Col xl="3">
              <Card
                className=" ml-1 "
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
                    {familyMember?.subscribedPackage && (
                      <CardTitle tag="h5" style={{ color: "#ffffff" }}>
                        {familyMember.subscribedPackage.packageName} Package
                      </CardTitle>
                    )}{" "}
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
                          {familyMember?.subscribedPackage &&
                            familyMember.subscribedPackage.subscriptionStatus}
                          <br />
                          Renewal Date:{" "}
                          {familyMember?.subscribedPackage &&
                            (familyMember.subscribedPackage.renewalDate === null
                              ? "Not determined"
                              : new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).format(
                                  new Date(
                                    familyMember.subscribedPackage.renewalDate
                                  )
                                ))}
                          <br />
                          Cancellation Date:{" "}
                          {familyMember?.subscribedPackage &&
                            (familyMember.subscribedPackage.cancellationDate ===
                            null
                              ? "Not determined"
                              : new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).format(
                                  new Date(
                                    familyMember.subscribedPackage.cancellationDate
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
                        (familyMember?.subscribedPackage &&
                          familyMember.subscribedPackage.cancellationDate !==
                            null) ||
                        familyMember?.subscribedPackage === null
                      }
                      onClick={cancelHealthPackage}
                    >
                      Cancel
                    </Button>
                  </CardText>
                  <Alert color={alertColor} isOpen={visible} toggle={onDismiss}>
                    {alertMessage}
                  </Alert>
                </CardBody>
              </Card>
            </Col>
            <Col xl="9">
              <div className="d-flex justify-content-center mt-3">
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
                      {familyMember?.fName + "'s"} Appointments
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
                      {allAppointments.map((appointment, index) => (
                        <tr key={index} style={{ color: "#f7fafc" }}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <Media>
                                <span className="mb-0 text-sm">
                                  Dr. {appointment.doctor.fName}{" "}
                                  {appointment.doctor.lName}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{appointment.price} EGP </td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i
                                className={`${
                                  appointment.status === "completed"
                                    ? "bg-success"
                                    : appointment.status === "upcoming"
                                    ? "bg-warning"
                                    : appointment.status === "rescheduled"
                                    ? "bg-info"
                                    : appointment.status === "cancelled"
                                    ? "bg-danger"
                                    : ""
                                }`}
                              />
                              {appointment.status}
                            </Badge>
                          </td>
                          <td>
                            {" "}
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            {new Date(appointment.date).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{appointment.type}</span>
                            </div>
                          </td>
                          <td>
                            <Button
                              color="secondary"
                              size="sm"
                              onClick={() => toggleAppointmentModal(index)}
                              disabled={
                                appointment.status === "completed" ||
                                appointment.status === "cancelled"
                              }
                            >
                              Reschedule
                            </Button>
                            <Modal
                              isOpen={modalStates[index]}
                              toggle={() => toggleAppointmentModal(index)}
                            >
                              <ModalHeader>Reschedule appointment</ModalHeader>
                              <ModalBody>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Reschedule to Date:
                                      </label>
                                      <br />
                                      <Select
                                        options={availableAppointmentsDates}
                                        isSearchable={true}
                                        placeholder="Select Date"
                                        value={rescheduleAppointment}
                                        onChange={(selectedOption) =>
                                          setRescheduleAppointment(
                                            selectedOption
                                          )
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="default"
                                  onClick={() => handleReschedule(appointment)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  color="secondary"
                                  onClick={() => toggleAppointmentModal(index)}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                          <td>
                            <Button
                              color="secondary"
                              size="sm"
                              onClick={() => toggleAppointmentModal2(index)}
                              disabled={appointment.status !== "completed"}
                            >
                              Request Follow-up
                            </Button>
                            <Modal
                              isOpen={modalStates2[index]}
                              toggle={() => toggleAppointmentModal2(index)}
                            >
                              <ModalHeader>
                                Request a Follow-up Appointment
                              </ModalHeader>
                              <ModalBody>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Follow-up Date:
                                      </label>
                                      <br />
                                      <Select
                                        options={availableAppointmentsDates}
                                        isSearchable={true}
                                        placeholder="Select Date"
                                        value={followUpAppointment}
                                        onChange={(selectedOption) =>
                                          setFollowUpAppointment(selectedOption)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="default"
                                  onClick={handleFollowUp}
                                >
                                  Confirm Request
                                </Button>
                                <Button
                                  color="secondary"
                                  onClick={() => toggleAppointmentModal2(index)}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                          <td>
                            <Button
                              color="secondary"
                              size="sm"
                              onClick={() => handleCancel(appointment)}
                              disabled={
                                appointment.status === "cancelled" ||
                                appointment.status === "completed"
                              }
                            >
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default FamilyMemberDetails;
