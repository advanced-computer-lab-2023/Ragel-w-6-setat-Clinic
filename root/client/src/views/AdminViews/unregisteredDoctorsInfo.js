import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const UnregisteredDoctors = () => {
  const [doctorUsername, setDoctorUsername] = useState("");
  const [educationalBackground, setEducationalBackground] = useState([]);
  const [unregisteredDoctors, setUnregisteredDoctors] = useState([]);
  const { user } = useContext(UserContext);

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const fetchUnregisteredDoctors = async () => {
    try {
      const response = await axios.get(
        `/admins/viewUnregisteredDoctors/${user._id}`
      );
      setUnregisteredDoctors(response.data);
    } catch (error) {
      console.error("Error fetching unregistered doctors:", error);
    }
  };

  useEffect(() => {
    fetchUnregisteredDoctors();
  }, []);

  const handleAccept = async (username) => {
    try {
      await axios.patch(
        `/admins/setToRegistered/${user._id}?username=${username}`
      );
      fetchUnregisteredDoctors();
      console.log(`Doctor ${username} accepted successfully`);
    } catch (error) {
      console.error("Error accepting doctor:", error);
      // Handle error, show a message, etc.
    }
  };

  const handleReject = async (username) => {
    try {
      await axios.delete(
        `/admins/rejectDoctor/${user._id}?username=${username}`
      );
      console.log(`Doctor ${username} rejected and deleted successfully`);
      fetchUnregisteredDoctors();
    } catch (error) {
      console.error("Error rejecting and deleting doctor:", error);
      // Handle error, show a message, etc.
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
        <span className="mask bg-gradient-default opacity-8" />
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Unregistered Doctors
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      {/* You can add additional buttons or actions here */}
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Table */}
                <Row>
                  <Col>
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Doctor Details</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Educational Background</th>
                            <th scope="col">Hourly Rate</th>
                            <th scope="col">Affiliation</th>
                            <th scope="col">Specialty</th>
                            <th scope="col">ID</th>
                            <th scope="col">Medical Licenses</th>
                            <th scope="col">Degree</th>
                            <th scope="col">Accept</th>
                            <th scope="col">Reject</th>
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
                                  color="primary"
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
                                  color="primary"
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
                                  color="primary"
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
                                  onClick={() => handleAccept(doctor.username)}
                                  size="sm"
                                >
                                  Accept
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="mt-3"
                                  color="danger"
                                  onClick={() => handleReject(doctor.username)}
                                  size="sm"
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
