import React, { useState, useEffect } from "react";
import axios from "axios";
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

// context
import { useAuthContext } from "../../hooks/useAuthContext";

const UnregisteredDoctors = () => {
  const [unregisteredDoctors, setUnregisteredDoctors] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUnregisteredDoctors = async () => {
      try {
        const response = await axios.get(
          `/admins/viewUnregisteredDoctors/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setUnregisteredDoctors(response.data);
      } catch (error) {
        console.error(
          "Error fetching unregistered doctors:",
          error.response.data.message
        );
      }
    };
    fetchUnregisteredDoctors();
  }, [user]);

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const handleAccept = async (username) => {
    try {
      const response = await axios.patch(
        `/admins/setToRegistered/${user.user._id}?username=${username}`,
        null,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setUnregisteredDoctors(
          unregisteredDoctors.filter((doctor) => doctor.username !== username)
        );
      }
    } catch (error) {
      console.error("Error accepting doctor:", error.response.data.message);
    }
  };

  const handleReject = async (username) => {
    try {
      const response = await axios.delete(
        `/admins/rejectDoctor/${user.user._id}?username=${username}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setUnregisteredDoctors(
          unregisteredDoctors.filter((doctor) => doctor.username !== username)
        );
      }
    } catch (error) {
      console.error(
        "Error rejecting and deleting doctor:",
        error.response.data.message
      );
    }
  };

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h6 className="heading-small mb-4" style={{ color: "#f7fafc" }}>
                  Unregistered Doctors
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
                        <h3 className="mb-0">Doctor Details</h3>
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
                              Username
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              First Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Last Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Educational Background
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Hourly Rate
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Affiliation
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Specialty
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Medical Licenses
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Degree
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
                          {unregisteredDoctors.map((doctor) => (
                            <tr key={doctor._id}>
                              <td>{doctor.username}</td>
                              <td>{doctor.fName}</td>
                              <td>{doctor.lName}</td>
                              <td>{doctor.educationalBackground}</td>
                              <td>{doctor.hourlyRate}</td>
                              <td>{doctor.affiliation}</td>
                              <td>{doctor.specialty}</td>
                              <td>
                                <Button
                                  className="mt-3"
                                  style={{
                                    backgroundColor: "#0C356A",
                                    color: "#f7fafc",
                                  }}
                                  onClick={() =>
                                    showDocument(doctor.documentID)
                                  }
                                  size="sm"
                                >
                                  View Document
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="mt-3"
                                  style={{
                                    backgroundColor: "#0C356A",
                                    color: "#f7fafc",
                                  }}
                                  onClick={() =>
                                    showDocument(doctor.medicalLicense)
                                  }
                                  size="sm"
                                >
                                  View Document
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="mt-3"
                                  style={{
                                    backgroundColor: "#0C356A",
                                    color: "#f7fafc",
                                  }}
                                  onClick={() =>
                                    showDocument(doctor.medicalDegree)
                                  }
                                  size="sm"
                                >
                                  View Document
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="mt-3"
                                  color="success"
                                  size="sm"
                                  onClick={() => handleAccept(doctor.username)}
                                >
                                  Accept
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="mt-3"
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleReject(doctor.username)}
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
export default UnregisteredDoctors;
