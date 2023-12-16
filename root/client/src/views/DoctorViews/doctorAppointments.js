import React, { useState, useEffect} from "react";

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


import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import ReactDatetime from "react-datetime";
import axios from "axios";

const DoctorAppointments = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2);
  const [modal3, setModal3] = useState(false);
  const toggleModal3 = () => setModal3(!modal3);


  const { user } = useContext(UserContext);
  const [allAppointments, setAllAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromDateReschedule, setFromDateReschedule] = useState(""); // Define useState here // State for previous appointment ID
  const [followUpDate, setFollowUpDate] = useState(""); // State for follow-up date

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(`/doctors/getMyAppointments/${user._id}`);
        const appointments = await response.json();
        console.log('Appointments:', appointments);

        setAllAppointments(appointments);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchAllAppointments();
  }, [user._id]);

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/doctors/upcomingAppointments/${user._id}`
      );

      if (response.data) {
        setAllAppointments(response.data);
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
        `/doctors/viewPastAppointments/${user._id}`
      );

      if (response.data) {
        setAllAppointments(response.data);
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
        `/doctors/filterMyAppointments//${user._id}?status=${statusFilter}&date=${fromDate}`
      );

      if (response.data) {      
        setAllAppointments(response.data);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
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
                          <Input name="select" type="select" 
                           value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}>
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
                            <ReactDatetime  key={fromDate}
                              timeFormat={false}
                              value={fromDate}
                              onChange={(date) => setFromDate(date)}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button color="secondary" size="sm"
                         onClick={handleFilterAppointments}>
                          Filter Appointments
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="6">
                        <Button color="secondary" size="sm"
                         onClick={fetchUpcomingAppointments}>
                          Upcoming Appointments
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button color="secondary" size="sm"
                          onClick={fetchPastAppointments}>
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
            <div className="d-flex justify-content-center mt-5">
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
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={toggleModal2}
                      >
                        Add Available Appointment
                      </Button>
                      <Modal isOpen={modal2} toggle={toggleModal2}>
                        <ModalHeader toggle={toggleModal2}>
                          Add an extra available time-slot for an appointment
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
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="default">Add Appointment</Button>{" "}
                          <Button color="secondary" onClick={toggleModal2}>
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
                  {Array.isArray(allAppointments) &&
               allAppointments.map((appointment, index) => (
                
             <tr key= {index} style={{ color: "#f7fafc" }}>
              <th scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {appointment?.patient?.name || "No name"}
              </span>
            </Media>
          </Media>
        </th>
        <td>{appointment?.price || "No price"}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-success" />
            {appointment?.status || "No status"}
          </Badge>
        </td>
        <td>{appointment?.date || "No date"}</td>
                <td>
                <div className="d-flex align-items-center">
                 <span className="mr-2"> {appointment.type}</span>
                        </div>
                      </td>
                      <td>
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={toggleModal}
                        >
                          Reschedule
                        </Button>
                        <Modal isOpen={modal} toggle={toggleModal}>
                          <ModalHeader toggle={toggleModal}>
                            Reschedule appointment
                          </ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col lg="6">
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
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="default">Reschedule</Button>
                            <Button color="secondary" onClick={toggleModal}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </td>
                      <td>
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={toggleModal3}
                        >
                          Schedule Follow-up
                        </Button>
                        <Modal isOpen={modal3} toggle={toggleModal3}>
                          <ModalHeader toggle={toggleModal3}>
                            Schedule a Follow-up Appointment
                          </ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col lg="6">
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
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="default">Confirm Request</Button>
                            <Button color="secondary" onClick={toggleModal3}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </td>
                      <td>
                        <Button color="secondary" size="sm">
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
