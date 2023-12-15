import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import axois from "axios";  
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext"; 
import ReactDatetime from "react-datetime";
const AppointmentRequests = () => {

const { user } = useContext(UserContext); 
const [allAppointments, setAllAppointments] = useState([]);
  useEffect(() => {
    const fetchPendingAppointment = async () => {
      try {
        const response = await fetch(`/doctors/pendingRequests/${user._id}`);
        const appointments = await response.json(); // Parse response as JSON

        setAllAppointments(appointments); // Set appointments in state
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchPendingAppointment();
  }, [user._id]); // Ensure useEffect re-runs when user ID changes


  const handleAccept = async (appointmentId) => { 
    try {
      const response = await axios.patch(`/doctors/accept/${appointmentId}/${user._id}`);
      const updatedAppointments = allAppointments.filter(appointment => appointment._id !== appointmentId);
      setAllAppointments(updatedAppointments); // Se // Set appointments in state
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleReject = async (appointmentId) => { 
    try{
    const response = await axios.patch(`/doctors/reject/${appointmentId}/${user._id}`);
    const updatedAppointments = allAppointments.filter(appointment => appointment._id !== appointmentId); 
    setAllAppointments(updatedAppointments); // Set appointments in state 
  }
  catch (error) {
    console.error("An error occurred:", error);

  }
  }
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="order-xl-1 mt-5" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h6 className="heading-small mb-4" style={{ color: "#f7fafc" }}>
                  Appointment Requests
                </h6>

                <hr className="my-4" style={{ backgroundColor: "#f7fafc" }} />

                <Row>
                  <Col>
                    <Card
                      className="shadow"
                      style={{
                        backgroundColor: "#eef5ff",
                      }}
                    >
                      <CardHeader
                        className="border-0"
                        style={{
                          backgroundColor: "#eef5ff",
                        }}
                      >
                        <h3 className="mb-0">Appointment Details</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Patient
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Accept
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Reject
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {allAppointments.map((appointment, index) => (
                          <tr key={index}>
                            <td>{appointment.patient.name}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.type}</td>
                            <td>
                              <Button
                                className="mt-3"
                                color="success"
                                size="sm"
                                onClick={() => handleAccept(appointment._id)}
                              >
                                Accept
                              </Button>
                            </td>
                            <td>
                              <Button className="mt-3" color="danger" size="sm"
                                onClick={() => handleReject(appointment._id)}>
                                Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AppointmentRequests;
