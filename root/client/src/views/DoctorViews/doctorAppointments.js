import React, { useState, useContext, useEffect } from "react";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Media,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import { chartOptions, parseOptions } from "variables/charts.js";
import { UserContext } from "../../contexts/UserContext";

const DoctorAppointments = () => {
  const [modal, setModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentPrice, setAppointmentPrice] = useState("");
  const [upcomingAppointments, setupcomingAppointments] = useState(null);
  const [pastAppointments, setpastAppointments] = useState(null);
  const [allAppointments, setallAppointments] = useState(null);
  const [selectedOption, setSelectedOption] = useState("all");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");


  const toggleModal = () => setModal(!modal);
  const { user } = useContext(UserContext);

  const fetchAllAppointments = async () => {
    try {
      const response = await fetch(`/doctors/viewAppointments/${user._id}`);
      const json = await response.json();
  
      if (response.ok) {
        console.log(json.appointments);
        setallAppointments(json.appointments);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  useEffect(() => {
    fetchAllAppointments();
  }, [user._id, selectedOption]);

  useEffect(() => {
    const fetchAppointmentDetailsUp = async () => {
      try {
        const response = await fetch(
          `/doctors/viewUpcomingAppointments/${user._id}`
        );
        const json = await response.json();

        if (response.ok) {
          setupcomingAppointments(json.appointments);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const fetchAppointmentDetailsPast = async () => {
      try {
        const response = await fetch(
          `/doctors/viewPastAppointments/${user._id}`
        );
        const json = await response.json();

        if (response.ok) {
          setpastAppointments(json.appointments);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (selectedOption === "all") {
      fetchAllAppointments();
    } else if (selectedOption === "upcoming") {
      fetchAppointmentDetailsUp();
    } else if (selectedOption === "past") {
      fetchAppointmentDetailsPast();
    }
  }, [user._id, selectedOption]);

  const handleFilterAppointments = async () => {
    try {
      const response = await fetch(
        `/doctors/filterAppointments/${user._id}?status=${statusFilter}&date=${fromDate}`
      );
      const json = await response.json();
      console.log("BOSI HNA BTA3 FILTER " + json.appointments);

      if (response.ok) {
        if (selectedOption === "upcoming") {
          setupcomingAppointments(json.appointments);
        } else if (selectedOption === "past") {
          setpastAppointments(json.appointments);
        } else if (selectedOption === "all") {
          setallAppointments(json.appointments);
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const handleAddAppointment = async () => {
    try {
      const response = await fetch(
        `/doctors/addAvailableAppointments/${user._id}?date=${appointmentDate}&price=${appointmentPrice}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Handle successful response, e.g., show a success message
        console.log("Appointment added successfully");
        toggleModal(); // Close the modal after adding the appointment
        fetchAllAppointments(); // Refetch all appointments after adding a new appointment
      } else {
        // Handle error response, e.g., show an error message
        console.error("Failed to add appointment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Date and/or Status
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Status:</label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
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
                              timeFormat={false}
                              onChange={(date) =>
                                setFromDate(date.format("YYYY-MM-DD"))
                              }
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleFilterAppointments}
                          size="sm"
                        >
                          Filter Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={() => setSelectedOption("all")}
                          size="sm"
                        >
                          Show All Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={() => setSelectedOption("upcoming")}
                          size="sm"
                        >
                          Show Upcoming Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={() => setSelectedOption("past")}
                          size="sm"
                        >
                          Show Past Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                {/* Table */}
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row>
                          <Col lg="6">
                            <h3 className="mb-0">Appointments</h3>
                          </Col>
                          <Col lg="6">
                            <Button
                              color="primary"
                              size="sm"
                              onClick={toggleModal}
                            >
                              Add Available Appointment
                            </Button>
                            <Modal isOpen={modal} toggle={toggleModal}>
                              <ModalHeader toggle={toggleModal}>
                                Add an extra available time-slot for an
                                appointment
                              </ModalHeader>
                              <ModalBody>
                                <Row>
                                  <Col lg="6">
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
                                            placeholder: "From Date",
                                          }}
                                          timeFormat={true}
                                          onChange={(date) =>
                                            setAppointmentDate(
                                              date.format("YYYY-MM-DD HH:mm")
                                            )
                                          }
                                        />
                                      </InputGroup>
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Price of Appointment
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        type="number"
                                        onChange={(e) =>
                                          setAppointmentPrice(e.target.value)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  onClick={handleAddAppointment}
                                >
                                  Add Appointment
                                </Button>{" "}
                                <Button
                                  color="secondary"
                                  onClick={toggleModal}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </Col>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Patient</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                        {selectedOption === "upcoming" &&
                            Array.isArray(upcomingAppointments) &&
                            upcomingAppointments.length > 0 ? (
                              upcomingAppointments.map((appointment, index) => (
                                <tr key={index}>
                                  <th scope="row">
                                    <Media className="align-items-center">
                                      <Media>
                                      <span className="mb-0 text-sm">
  {appointment.patient?.fName || 'No Patient'}
</span>
                                      </Media>
                                    </Media>
                                  </th>
                                  <td>{appointment.price}</td>
                                  <td>
                                    <Badge color="" className="badge-dot mr-4">
                                      <i className="bg-warning" />
                                      {appointment.status}
                                    </Badge>
                                  </td>
                                  <td>{appointment.date}</td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <span className="mr-2">
                                        {appointment.type}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : selectedOption === "past" &&
                              Array.isArray(pastAppointments) &&
                              pastAppointments.length > 0 ? (
                                pastAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                        <span className="mb-0 text-sm">
  {appointment.patient?.fName || 'No Patient'}
</span>
                                        </Media>
                                      </Media>
                                    </th>
                                    <td>{appointment.price}</td>
                                    <td>
                                      <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-success" />
                                        {appointment.status}
                                      </Badge>
                                    </td>
                                    <td>{appointment.date}</td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <span className="mr-2">
                                          {appointment.type}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : selectedOption === "all" &&
                              Array.isArray(allAppointments) &&
                              allAppointments.length > 0 ? (
                                allAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                        <span className="mb-0 text-sm">
    {appointment.patient?.fName || 'No Patient'}
  </span>
                                        </Media>
                                      </Media>
                                    </th>
                                    <td>{appointment.price}</td>
                                    <td>
                                      <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-warning" />
                                        {appointment.status}
                                      </Badge>
                                    </td>
                                    <td>{appointment.date}</td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <span className="mr-2">
                                          {appointment.type}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              
                              
                              
                              ): (
                                <tr>
                                  <td colSpan="5">
                                    No appointments available.
                                  </td>
                                </tr>
                              )}
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorAppointments;
