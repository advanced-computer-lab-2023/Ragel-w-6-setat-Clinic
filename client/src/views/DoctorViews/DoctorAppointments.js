import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "reactstrap";
import ReactDatetime from "react-datetime";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationContext } from "../../contexts/NotificationContext.js";

const DoctorAppointments = () => {
  const { user } = useAuthContext();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [modalStates, setModalStates] = useState([]);
  const toggleAppointmentModal = async (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
  };
  const [modalStates2, setModalStates2] = useState([]);
  const toggleAppointmentModal2 = async (index) => {
    const updatedModalStates = [...modalStates2];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates2(updatedModalStates);
  };

  const [appointmentDate, setAppointmentDate] = useState("");
  const [allAppointments, setAllAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(
          `/doctors/getMyAppointments/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setAllAppointments(json.appointments);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchAllAppointments();
  }, [user]);

  const fetchUpAppointments = async () => {
    try {
      const response = await fetch(
        `/doctors/viewUpcomingAppointments/${user.user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setAllAppointments(json.appointments);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const fetchPastAppointments = async () => {
    try {
      const response = await fetch(
        `/doctors/viewPastAppointments/${user.user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setAllAppointments(json.appointments);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const handleFilterAppointments = async () => {
    try {
      const response = await fetch(
        `/doctors/filterMyAppointments/${user.user._id}?status=${statusFilter}&date=${fromDate}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      setAllAppointments(json.appointments);

      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const scheduleFollowUp = async (patientId, appointment) => {
    try {
      const response = await axios.post(
        `/doctors/scheduleFollowUp/${user.user._id}/${patientId}`,
        {
          date: followupDate,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        toggleAppointmentModal2(allAppointments.indexOf(appointment));
        setAllAppointments(response.data.appointments);
        await axios.get(
          `/doctors/getAppNotifications/${user.user._id}/${response.data.followUpAppointment._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }
      setFollowupDate("");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleReschedule = async (appointment) => {
    try {
      const response = await axios.patch(
        `/doctors/rescheduleAppointment/${user.user._id}/${appointment._id}`,
        {
          date: rescheduleDate,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAllAppointments(response.data.appointments);
        toggleAppointmentModal(allAppointments.indexOf(appointment));

        await axios.get(
          `/doctors/getAppNotifications/${user.user._id}/${appointment._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while rescheduling:",
        error.response.data.message
      );
    }
  };

  const handleCancel = async (appointment) => {
    try {
      const response = await axios.patch(
        `/doctors/cancelAppointment/${user.user._id}/${appointment._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setAllAppointments(response.data.appointments);
        await axios.get(
          `/doctors/getAppNotifications/${user.user._id}/${appointment._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while cancelling:",
        error.response.data.message
      );
    }
  };

  const handleAddAppointment = async () => {
    try {
      const response = await fetch(
        `/doctors/addAvailableAppointments/${user.user._id}?date=${appointmentDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setAllAppointments(json.appointments);
        toggleModal();
      }
      setAppointmentDate("");
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
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
                            <option value="available">Available</option>
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
                          onClick={fetchUpAppointments}
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
            <div className="d-flex justify-content-center">
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
                        My Appointments
                      </h3>
                    </Col>
                    <Col lg="6">
                      <Button color="secondary" size="sm" onClick={toggleModal}>
                        Add Available Appointment
                      </Button>
                      <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                          Add an extra available time-slot for an appointment
                        </ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col lg="8">
                              <FormGroup>
                                <label className="form-control-label">
                                  Appointment Date:
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
                                      placeholder: "Date",
                                    }}
                                    timeFormat={true}
                                    value={appointmentDate}
                                    onChange={(value) =>
                                      setAppointmentDate(value)
                                    }
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="default"
                            onClick={handleAddAppointment}
                          >
                            Add Appointment
                          </Button>{" "}
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
                        Patient
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
                                {appointment.patient?.fName}{" "}
                                {appointment.patient?.lName}{" "}
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
                                  : appointment.status === "available"
                                  ? "bg-secondary"
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
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Reschedule to Date:
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
                                          placeholder: "Date",
                                        }}
                                        timeFormat={true}
                                        value={rescheduleDate}
                                        onChange={(value) =>
                                          setRescheduleDate(value)
                                        }
                                      />
                                    </InputGroup>
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
                            Schedule Follow-up
                          </Button>
                          <Modal
                            isOpen={modalStates2[index]}
                            toggle={() => toggleAppointmentModal2(index)}
                          >
                            <ModalHeader>
                              Schedule a Follow-up Appointment
                            </ModalHeader>
                            <ModalBody>
                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Follow-up Date:
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
                                          placeholder: "Date",
                                        }}
                                        timeFormat={true}
                                        value={followupDate}
                                        onChange={(value) =>
                                          setFollowupDate(value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="default"
                                onClick={() =>
                                  scheduleFollowUp(
                                    appointment.patient._id,
                                    appointment
                                  )
                                }
                              >
                                Confirm Follow-up
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
export default DoctorAppointments;
