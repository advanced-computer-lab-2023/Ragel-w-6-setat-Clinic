import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Media,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  CardBody,
  Input,
  Label,
} from "reactstrap";
import ReactDatetime from "react-datetime";

import { useAuthContext } from "../../hooks/useAuthContext";

const PatientAppointments = () => {
  const { user } = useAuthContext();

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

  const [allAppointments, setAllAppointments] = useState([]);
  const [doctorsAvailableAppointments, setDoctorsAvailableAppointments] =
    useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [rescheduleAppointment, setRescheduleAppointment] = useState("");
  const [followUpAppointment, setFollowUpAppointment] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(
          `/patients/viewAppointments/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        setAllAppointments(json.appointments);
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };
    fetchAllAppointments();
  }, [user]);

  useEffect(() => {
    const initialModalStates = allAppointments.map(() => false);
    setModalStates(initialModalStates);
    setModalStates2(initialModalStates);
  }, [allAppointments]);

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

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/viewUpcomingAppointments/${user.user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAllAppointments(response.data.appointments);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchPastAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/viewPastAppointments/${user.user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAllAppointments(response.data.appointments);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleFilterAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/filterMyAppointments/${user.user._id}?status=${statusFilter}&date=${fromDate}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAllAppointments(response.data.appointments);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const handleReschedule = async (appointment) => {
    try {
      const response = await axios.patch(
        `/patients/rescheduleAppointmentforPatient/${user.user._id}/${appointment._id}`,
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
        `/patients/requestFollowUp/${user.user._id}`,
        {
          followUpAppointment: followUpAppointment,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setAllAppointments(response.data.patientAppointments);
        toggleAppointmentModal2(allAppointments.indexOf(appointment));
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

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="3">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Date and/or Status
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Status:
                          </label>
                          <br />
                          <Input
                            name="select"
                            type="select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
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
                            From Date:
                          </label>
                          <br />
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              inputProps={{
                                placeholder: "From Date",
                              }}
                              key={fromDate}
                              timeFormat={false}
                              value={fromDate}
                              onChange={(date) => setFromDate(date)}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={handleFilterAppointments}
                        >
                          Filter Appointments
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="6">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={fetchUpcomingAppointments}
                        >
                          Upcoming Appointments
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={fetchPastAppointments}
                        >
                          Past Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="9">
            <div className="d-flex justify-content-center ">
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
                    My Appointments
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
                                    <Label className="form-control-label">
                                      Reschedule to Date:
                                    </Label>
                                    <br />
                                    <Select
                                      options={availableAppointmentsDates}
                                      isSearchable={true}
                                      placeholder="Select Date"
                                      value={rescheduleAppointment}
                                      onChange={(selectedOption) =>
                                        setRescheduleAppointment(selectedOption)
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
                                onClick={() => handleFollowUp(appointment)}
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
                            disabled={
                              appointment.status === "cancelled" ||
                              appointment.status === "completed"
                            }
                            onClick={() => handleCancel(appointment)}
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
      </Container>
    </>
  );
};

export default PatientAppointments;
