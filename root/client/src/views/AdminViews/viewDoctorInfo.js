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

const DoctorInfo = () => {
  const [doctorUsername, setDoctorUsername] = useState("");
  const [educationalBackground, setEducationalBackground] = useState([]);
  const [unregisteredDoctors, setUnregisteredDoctors] = useState([]);
  const { user } = useContext(UserContext);

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const fetchEducationalBackground = async (username) => {
    try {
      const response = await fetch(`/admins/getEducationalBackground/${user._id}?username=${username}`);
      const json = await response.json();
      if (response.ok) {
        setEducationalBackground(json);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Server Error");
    }
  };

  const fetchUnregisteredDoctors = async () => {
    try {
      const response = await axios.get(`/admins/viewUnregisteredDoctors/${user._id}`);
      setUnregisteredDoctors(response.data);

      // Set the doctorUsername for the first doctor when component mounts
      if (response.data.length > 0) {
        setDoctorUsername(response.data[0].username);
      }
     
    } catch (error) {
      console.error("Error fetching unregistered doctors:", error);
    }
  };

  useEffect(() => {
    fetchUnregisteredDoctors();
  }, [user._id]);

  useEffect(() => {
    fetchEducationalBackground(doctorUsername);
  }, [doctorUsername, user._id]);

  const handleLoadDocuments = async (username) => {
    setDoctorUsername(username);
    await fetchEducationalBackground(username);
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
                <h6 className="heading-small text-muted mb-4">Unregistered Doctors</h6>
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
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Educational Background</th>
                            <th scope="col">Hourly Rate</th>
                            <th scope="col">Affiliation</th>
                            <th scope="col">Specialty</th>
                            <th scope="col">Registered</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unregisteredDoctors.map((doctor) => (
                            <tr key={doctor._id}>
                              <td>{doctor.username}</td>
                              <td>{doctor.email}</td>
                              <td>{doctor.fName}</td>
                              <td>{doctor.lName}</td>
                              <td>{new Date(doctor.dateOfBirth).toLocaleDateString()}</td>
                              <td>
                              {educationalBackground.length > 0 ? (
                educationalBackground.map((history, index) => (
                  <React.Fragment key={index}>
                    <div className="col-lg-6 col-xl-3">
                      <Card className="card-stats mb-4 mb-xl-0 mt-3">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Document {index + 1}
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                <Button
                                  className="mt-3"
                                  color="primary"
                                  onClick={() => handleLoadDocuments(doctor.username)}
                                  size="sm"
                                >
                                  Load Doctor Documents
                                </Button>
                                <Button
                                  className="mt-3"
                                  color="primary"
                                  onClick={() => showDocument(history)}
                                  size="sm"
                                >
                                  View Document
                                </Button>
                              </span>
                            </div>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <span>No educational background available</span>
              )}
                              </td>
                              <td>{doctor.hourlyRate}</td>
                              <td>{doctor.affiliation}</td>
                              <td>{doctor.specialty}</td>
                              <td>
                                {doctor.isRegistered ? "Yes" : "No"}
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

export default DoctorInfo;
