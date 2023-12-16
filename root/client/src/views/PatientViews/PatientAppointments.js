import React, { useState, useContext, useEffect } from "react";
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

import { UserContext } from "../../contexts/UserContext";


const PatientAppointments = () => {

    // Define modal visibility state for each appointment
    const [modalStates, setModalStates] = useState([]);

    // Function to toggle a specific modal based on index
    const toggleAppointmentModal = (index) => { 
      const updatedModalStates = [...modalStates]; 
      updatedModalStates[index] = !updatedModalStates[index];
      setModalStates(updatedModalStates);
    };
    
    const [modalStates2, setModalStates2] = useState([]);

    // Function to toggle a specific modal based on index
    const toggleAppointmentModal2 = (index) => {
      const updatedModalStates= [...modalStates2];
      updatedModalStates[index] = !updatedModalStates[index];
      setModalStates2(updatedModalStates);
    };



  const { user } = useContext(UserContext);
  const [allAppointments, setAllAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromDateReschedule, setFromDateReschedule] = useState(""); // Define useState here // State for previous appointment ID
  const [followUpDate, setFollowUpDate] = useState(""); // State for follow-up date
  

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(`/patients/viewAppointments/${user._id}`);
        console.log(response);
        const appointments = await response.json(); // Parse response as JSON
        console.log(appointments);  

        setAllAppointments(appointments); // Set appointments in state
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchAllAppointments();
  }, [user._id]); // Ensure useEffect re-runs when user ID changes


        // Initialize modalStates on allAppointments update
        useEffect(() => {
          const initialModalStates = allAppointments.map(() => false);
          setModalStates(initialModalStates);
        }, [allAppointments]);
  const fetchUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/viewUpcomingAppointments/${user._id}`
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
        `/patients/viewPastAppointments/${user._id}`
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
        `/patients/filterMyAppointments/${user._id}?status=${statusFilter}&date=${fromDate}`
      );

      if (response.data) {      
        setAllAppointments(response.data);
        console.log(response.data);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const handleReschedule = async (appointment) => {
try {
  const response = await axios.patch(`/patients/rescheduleAppointmentforPatient/${appointment._id}`, {
    date: fromDateReschedule,
  });

  if (response.status === 200) {
    console.log("Appointment rescheduled successfully!");
    toggleAppointmentModal(allAppointments.indexOf(appointment));
   
  } else {
    console.error("Request failed with status:", response.status);
   
  }
} catch (error) {
  console.error("An error occurred while rescheduling:", error);
  
}
};
 
 
const handleFollowUp = async (appointment) => {
  try {
    const response = await axios.post(`/patients/followUp/${user._id}/${appointment._id}`, {
      followUpDate: followUpDate,
    });

    if (response.data.status === 200) {
      console.log("Follow-up appointment requested successfully!");
      toggleAppointmentModal2(allAppointments.indexOf(appointment));
    } else {
      console.error("Follow-up request failed:", response.data.message);
     
    }
  } catch (error) {
    console.error("An error occurred while requesting follow-up:", error);
  }
 
};

const handleCancel = async (appointment) => {
  try {
    console.log("hereeee");
    console.log(appointment._id);
    const response = await axios.patch(`/patients/cancelAppointmentForSelf/${appointment._id}`);
    console.log(appointment._id);
    if (response.status === 200) {
      console.log("Appointment cancelled successfully!");
      // Assuming you want to update the UI after successful cancellation
      const updatedAppointments = allAppointments.map((app) => {
        if (app._id === appointment._id) {
          return { ...app, status: "cancelled" };
        }
        return app;
      });
      setAllAppointments(updatedAppointments);
    } else {
      console.error("Request failed with status:", response.status);
     
    }
  } catch (error) {
    console.error("An error occurred while cancelling:", error);
    
    
  }
}


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
                        <Button color="secondary" size="sm"
                          onClick={handleFilterAppointments}
                          >
                          Filter Appointments
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="6">
                        <Button color="secondary" size="sm"
                          onClick={fetchUpcomingAppointments}
                          >
                          Upcoming Appointments
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button color="secondary" size="sm"
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
                                {appointment.doctor.fName}
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
                        <td> {appointment.date}</td>
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
                          disabled={appointment.status === 'completed' || appointment.status === 'cancelled'}
                        >
                          Reschedule
                        </Button>
                        <Modal isOpen={modalStates[index]} toggle={() => toggleAppointmentModal(index)}>
                          <ModalHeader>
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
                                      value={fromDateReschedule}
                                      onChange={(date) =>
                                        setFromDateReschedule(date)
                                      }
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="default"  onClick={() => handleReschedule(appointment)} >Reschedule</Button>
                            <Button color="secondary" onClick={() => toggleAppointmentModal(index)}>
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
                            disabled={appointment.status !== 'completed'}
                          >
                            Request Follow-up
                        </Button>
                        <Modal isOpen={modalStates2[index]} toggle={() => toggleAppointmentModal2(index)}>
                          <ModalHeader >
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
                                  <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-calendar-grid-58" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetime
                                       inputProps={{ placeholder: "Follow-up Date" }}
                                       value={followUpDate}
                                       onChange={(date) => setFollowUpDate(date)}
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="default" onClick={() => handleFollowUp(appointment)}>Confirm Request</Button>
                            <Button color="secondary" onClick={() => toggleAppointmentModal2(index)} >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </td>
                      <td>
                      <Button
                  color="secondary"
                   onClick={() => handleCancel(appointment)}
                    size="sm"
                    disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}>
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
)};
export default PatientAppointments;