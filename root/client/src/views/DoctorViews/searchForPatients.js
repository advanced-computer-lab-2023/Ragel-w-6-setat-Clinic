// reactstrap components
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Input,
  Media,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { UserContext } from "contexts/UserContext";

const SearchForPatients = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const { user } = useContext(UserContext);
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [followupPrice, setFollowupPrice] = useState("");

  useEffect(() => {
    const fetchDoctorsPatients = async () => {
      try {
        const response = await fetch(`/doctors/viewMyPatients/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setPatients(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert(error.response.data.message);
      }
    };

    fetchDoctorsPatients();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/doctors/searchForPatients/${user._id}`,
        {
          params: {
            fName: firstName,
            lName: lastName,
          },
        }
      );
      if (response.data && response.data.length > 0) {
        setPatients(response.data);
      } else {
        setPatients([]);
      }
      setFirstName("");
      setLastName("");
    } catch (err) {
      alert("Internal Server Error: " + err.response.data.message);
    }
  };

  const filterUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/doctors/upcomingAppointments/${user._id}`
      );
      if (response.data && response.data.length > 0) {
        setPatients(response.data);
      } else {
        setPatients([]);
      }
      setFirstName("");
      setLastName("");
    } catch (err) {
      alert("Internal Server Error: " + err.response.data.message);
    }
  };

  const scheduleFollowUp = async (patientId) => {
    try {
      const response = await axios.post(
        `/doctors/scheduleFollowUp/${user._id}/${patientId}`,
        {
          date: followupDate,
          price: followupPrice,
        }
      );
      alert(response.data.message);
      setFollowupDate("");
      setFollowupPrice("");
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert(error.response.data.message);
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
                    Filter/Search for Patients
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            First Name of Patient
                          </label>
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
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Last Name of Patient
                          </label>
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
                      <Col lg="6">
                        <Button
                          color="primary"
                          onClick={handleSearch}
                          size="sm"
                        >
                          Search Patients
                        </Button>
                      </Col>
                      <Col lg="6">
                        <Button
                          color="primary"
                          onClick={filterUpcomingAppointments}
                          size="sm"
                        >
                          Get Patients with Upcoming Appointments
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
                        <h3 className="mb-0">Patients</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Patient</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {patients.map((patient) => (
                            <tr key={patient._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <Link
                                      to={`/doctor/patientDetails/${patient._id}`}
                                    >
                                      <span className="mb-0 text-sm">
                                        {`${patient.fName} ${patient.lName}`}
                                      </span>
                                    </Link>
                                  </Media>
                                </Media>
                              </th>
                              <td>{patient.gender}</td>
                              <td>{patient.phoneNum}</td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={toggleModal}
                                >
                                  Schedule Follow Up
                                </Button>
                                <Modal isOpen={modal} toggle={toggleModal}>
                                  <ModalHeader toggle={toggleModal}>
                                    Schedule follow-up appointment for Hana
                                  </ModalHeader>
                                  <ModalBody>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup>
                                          <label className="form-control-label">
                                            Follow-up Appointment Date:
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
                                              value={followupDate}
                                              onChange={(value) =>
                                                setFollowupDate(value)
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
                                            value={followupPrice}
                                            onChange={(e) =>
                                              setFollowupPrice(e.target.value)
                                            }
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        scheduleFollowUp(patient._id)
                                      }
                                    >
                                      Schedule
                                    </Button>{" "}
                                    <Button
                                      color="secondary"
                                      onClick={toggleModal}
                                    >
                                      Cancel
                                    </Button>
                                  </ModalFooter>
                                </Modal>
                              </td>
                            </tr>
                          ))}
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

export default SearchForPatients;
