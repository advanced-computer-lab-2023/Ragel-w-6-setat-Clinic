import React, { useState, useEffect, useContext } from "react";

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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext"; 
import ReactDatetime from "react-datetime";

const FamilyMemberDetails = () => {
  const [modalStates, setModalStates] = useState([]);
  const toggleAppointmentModal = (index) => { 
    const updatedModalStates = [...modalStates]; 
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
  };
  const [modalStates2, setModalStates2] = useState([]);
  const toggleAppointmentModal2 = (index) => {
    const updatedModalStates= [...modalStates2];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates2(updatedModalStates);
  };

const [familyMembers, setFamilyMembers] = useState([]);
const [appointments, setAppointments] = useState([]);
const { user } = useContext(UserContext);
const [fromDateReschedule, setFromDateReschedule] = useState(""); // Define useState here // State for previous appointment ID
const [followUpDate, setFollowUpDate] = useState(""); // State for follow-up date



 useEffect(() => {
  linkedFamilyMembers();
}, []); // Run only on component mount

const linkedFamilyMembers = async () => {
  try {
    const response = await axios.get(`/patients/linkedFamilyMembers/${user._id}`);
    const data = response.data; // Assuming data is an array of family members
    setFamilyMembers(data);
    console.log(data);
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

useEffect(() => {
const fetchLinkedFamilyMemberAppointments = async () => {
  try {
    const response = await axios.get(`/patients/linkedFamilyMemberAppointment/${user._id}`);
    const appointments = response.data; // Using response.data directly
    setAppointments(appointments);
    console.log("herereeeeee"+response.data.doctor);
  } catch (error) {
    console.error("An error occurred:", error);
  }

};
fetchLinkedFamilyMemberAppointments();
}, [user._id]);

useEffect(() => {
  const initialModalStates = appointments.map(() => false);
  setModalStates(initialModalStates);
}, [appointments]);




const handleReschedule = async (appointment) => {
  try {
    const response = await axios.patch(`/patients/rescheduleAppointmentforPatient${appointment._id}`, {
      date: fromDateReschedule,
    });
  
    if (response.status === 200) {
      console.log("Appointment rescheduled successfully!");
      toggleAppointmentModal(appointments.indexOf(appointment));
     
    } else {
      console.error("Request failed with status:", response.status);
     
    }
  } catch (error) {
    console.error("An error occurred while rescheduling:", error);
    
  }
  };
   
   
  const handleFollowUp = async (appointment) => {
    try {
      const response = await axios.post(`/patients/followUp/${appointment._id}`, {
        followUpDate: followUpDate,
      });
  
      if (response.data.status === 200) {
        console.log("Follow-up appointment requested successfully!");
        toggleAppointmentModal2(appointments.indexOf(appointment));
  
        // Update the appointment type in the UI
        const updatedAppointments = appointments.map((app) => {
          if (app._id === appointment._id) {
            return { ...app, type: "Follow-up" };
          }
          return app;
        });
        setAppointments(updatedAppointments);
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
        const updatedAppointments = appointments.map((app) => {
          if (app._id === appointment._id) {
            return { ...app, status: "cancelled" };
          }
          return app;
        });
        setAppointments(updatedAppointments);
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
      {familyMembers.map((member, index) => (
      <div key={index} className="d-flex justify-content-center mt-3">
        <Card className="card-profile shadow" style={{ backgroundColor: "#EEF5FF", width: "30%" }}>
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("../../assets/img/brand/patienticonf.png")}
                    style={{ height: "70px", width: "70px", background: "#EEF5FF" }}
                  />
                </a>
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4" style={{ backgroundColor: "#EEF5FF" }}></CardHeader>
          <CardBody className="pt-0 pt-md-4">
            <div className="text-center">
              Relationship: {member.relationship}
            </div>
            <div className="text-center">
              <h3>
                {member.fName} {member.lName}
                <span className="font-weight-light">, {calculateAge(member.dateOfBirth)}</span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Linked: {member.linked ? 'Yes' : 'No'}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    ))}
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
                    Gold Package
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
                          Status: Canceled
                          <br />
                          Renewal Date: Not determined
                          <br />
                          Cancellation Date: 24-12-2023
                        </div>
                      </span>
                    </p>
                    <Button
                      style={{ backgroundColor: "#F8F6F4" }}
                      className="mt-2"
                      type="button"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </CardText>
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
                   {familyMembers.map((member, index) => (
                  <CardHeader
                    className="border-0"
                    style={{
                      backgroundColor: "#0C356A",
                    }}
                  >
                    <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                      {member.fName} {member.lName}'s appointments
                    </h3>
                  </CardHeader>
                    ))}
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
                    {appointments.map((appointment, index) => (
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
                        <td>{appointment.price} </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            {appointment.status}
                          </Badge>
                        </td>
                        <td>{appointment.date}</td>
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
                          disabled={appointment.status === 'completed'}
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
      </div>
      </Container>
    </>
  );
}
export default FamilyMemberDetails;
