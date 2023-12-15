import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CardBody,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorPatients = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchDoctorsPatients = async () => {
      try {
        const response = await fetch(
          `/doctors/viewMyPatients/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setPatients(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchDoctorsPatients();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/doctors/searchForPatients/${user.user._id}`,
        {
          params: {
            fName: firstName,
            lName: lastName,
          },
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setPatients(response.data);

      setFirstName("");
      setLastName("");
    } catch (err) {
      console.error("Internal Server Error: " + err.response.data.message);
    }
  };

  const filterUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/doctors/upcomingAppointments/${user.user._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setPatients(response.data);

      setFirstName("");
      setLastName("");
    } catch (err) {
      alert("Internal Server Error: " + err.response.data.message);
    }
  };

  const handlePatientClick = (patiendID) => {
    navigate(`/doctor/patientDetails/${patiendID}`);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter/Search for Patients
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            First Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
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
                            Last Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={handleSearch}
                        >
                          Search Patients
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="12">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={filterUpcomingAppointments}
                        >
                          Get Patients with Upcoming Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Container fluid>
              <Row>
                {patients.map((patient) => (
                  <Col key={patient._id} className="order-xl-6 mb-4" xl="6">
                    <Card
                      className="card-profile shadow"
                      style={{ backgroundColor: "#EEF5FF" }}
                    >
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <a
                              href="#pablo"
                              onClick={() => handlePatientClick(patient._id)}
                            >
                              <img
                                id="tooltip1"
                                alt="..."
                                className="rounded-circle"
                                src={require("../../assets/img/brand/patienticonf.png")}
                                style={{
                                  height: "70px",
                                  width: "70px",
                                  background: "#EEF5FF",
                                }}
                              />
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              placement="right"
                              target="tooltip1"
                              style={{ backgroundColor: "#0C356A" }}
                            >
                              Click to view profile
                            </UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                      <CardHeader
                        className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                        style={{ backgroundColor: "#EEF5FF" }}
                      ></CardHeader>
                      <CardBody className="pt-0 pt-md-4">
                        <div className="text-center">
                          <div className="h5 font-weight-300">
                            <i className="ni location_pin mr-2" />
                            {patient.gender}
                          </div>
                          <h3>
                            {patient.fName} {patient.lName}
                            <span className="font-weight-light">
                              , {calculateAge(patient.dateOfBirth)}
                            </span>
                          </h3>
                          <div className="h5 font-weight-300">
                            <i className="ni location_pin mr-2" />
                            Phone No.: {patient.phoneNum}
                          </div>
                        </div>{" "}
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorPatients;
