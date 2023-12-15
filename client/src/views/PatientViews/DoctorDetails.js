import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
  Input,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const { doctorid } = useParams();
  const { user } = useAuthContext();

  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    password: "",
    email: "",
    fName: "",
    lName: "",
    dateOfBirth: null,
    educationalBackground: "",
    hourlyRate: 0,
    sessionPrice: 0,
    affiliation: "",
    specialty: "",
    isRegistered: false,
    wallet: 0,
  });
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `/patients/doctorDetails/${user.user._id}/${doctorid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setDoctorDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchDoctorDetails();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      try {
        const response = await fetch(
          `/patients/doctorDetails/availableAppointment/${user.user._id}/${doctorid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setAvailableAppointments(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchAvailableAppointments();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container className="mt-5" fluid>
        <div className="d-flex justify-content-center">
          <Card
            className="card-profile shadow"
            style={{ backgroundColor: "#EEF5FF", width: "30%" }}
          >
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("../../assets/img/brand/patienticonf.png")}
                      style={{
                        height: "100px",
                        width: "100px",
                        background: "#EEF5FF",
                      }}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader
              className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
              style={{ backgroundColor: "#EEF5FF" }}
            ></CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <div className="card-profile-stats d-flex justify-content-center mt-md-4"></div>
              <div className="text-center">
                <h3>
                  Dr. {doctorDetails.fName} {doctorDetails.lName}
                  <span className="font-weight-light">
                    , {doctorDetails.specialty}
                  </span>
                </h3>
                <div className="h5 mt-2">
                  <i className="ni business_briefcase-24 mr-2" />
                  From {doctorDetails.educationalBackground}
                </div>
                <div>
                  <i className="ni education_hat mr-2" />
                  Doctor at {doctorDetails.affiliation}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
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
                Doctor's Available Appointments
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
                {availableAppointments.map((appointment) => (
                  <tr key={appointment._id} style={{ color: "#f7fafc" }}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            Dr. {doctorDetails.fName} {doctorDetails.lName}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{doctorDetails.sessionPrice} EGP </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        {appointment.status}
                      </Badge>
                    </td>
                    <td> {appointment.date} </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{appointment.type}</span>
                      </div>
                    </td>
                    <td>
                      <Button color="secondary" size="sm">
                        Schedule With Wallet
                      </Button>
                    </td>
                    <td>
                      <Button color="secondary" size="sm">
                        Schedule With Credit Card
                      </Button>
                    </td>
                    <td>
                      <Button color="secondary" size="sm" onClick={toggleModal}>
                        Schedule For Family
                      </Button>
                      <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                          Schedule For Family Member
                        </ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label className="form-control-label">
                                  Email of Family Member
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  type="email"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="default">Pay With Wallet</Button>
                          <Button color="default">Pay With Credit Card</Button>
                          <Button color="secondary" onClick={toggleModal}>
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
      </Container>
    </>
  );
};

export default DoctorDetails;
