import { useEffect, useState } from "react";
import axois from "axios";
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

import { useAuthContext } from "../../hooks/useAuthContext";

const AppointmentRequests = () => {
  const { user } = useAuthContext();
  const [allAppointments, setAllAppointments] = useState([]);

  useEffect(() => {
    const fetchPendingAppointment = async () => {
      try {
        const response = await fetch(
          `/doctors/pendingRequests/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json(); // Parse response as JSON

        setAllAppointments(json.appointments); // Set appointments in state
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchPendingAppointment();
  }, [user]);

  const handleAccept = async (appointmentId) => {
    try {
      const response = await axois.patch(
        `/doctors/accept/${user.user._id}/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAllAppointments(response.data.pendingappointments);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      const response = await axois.patch(
        `/doctors/reject/${user.user._id}/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setAllAppointments(response.data.pendingappointments);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

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
                              <td>
                                {appointment.patient.fName}{" "}
                                {appointment.patient.lName}
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
                                <Button
                                  className="mt-3"
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleReject(appointment._id)}
                                >
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
