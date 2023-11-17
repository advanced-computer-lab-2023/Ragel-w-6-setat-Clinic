/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Media,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";

const DoctorDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const { user } = useContext(UserContext);
  const { doctorid } = useParams();
  // State to store doctor details
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

  const [familyEmail, setFamilyEmail] = useState("");

  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `/patients/doctorDetails/${user._id}/${doctorid}`
        );
        const json = await response.json();
        // Update the state with the fetched doctor details
        if (response.ok) {
          setDoctorDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      try {
        const response = await fetch(
          `/patients/doctorDetails/availableAppointment/${user._id}/${doctorid}`
        );
        const json = await response.json();
        // Update the state with the fetched doctor details
        if (response.ok) {
          setAvailableAppointments(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAvailableAppointments();
  }, []);

  const scheduleAppointmentMyselfCreditCard = async (appointmentId) => {
    try {
      // extracting relevant information

      const { username, sessionPrice } = doctorDetails;

      const items = [
        {
          name: username,
          price: sessionPrice,
          quantity: 1,
          forAppointments: true,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: true,
      };

      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentPatient/${user._id}/${appointmentId}`
      );
      // alert("Scheduling Appointment successful: " + response2.data.message);

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      } else {
        const error = await response.json();
        console.log(error);
        alert("Error processing payment: " + error.message);
      }
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error Scheduling Appointment: " + error.response.data.message);
    }
  };

  const scheduleAppointmentWallet = async (appointmentId) => {
    try {
      // extracting relevant information

      const { username, sessionPrice } = doctorDetails;

      const items = {
        name: username,
        price: sessionPrice,
        quantity: 1,
        forAppointments: true,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: true,
      };

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );
      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentPatient/${user._id}/${appointmentId}`
      );
      alert("Scheduling Appointment successful: " + response2.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error Scheduling Appointment: " + error.response.data.message);
    }
  };

  const scheduleAppointmentFamilyWallet = async (appointmentId) => {
    try {
      const { username, sessionPrice } = doctorDetails;
      const items = {
        name: username,
        price: sessionPrice,
        quantity: 1,
        forAppointments: true,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: familyEmail,
        forAppointments: true,
      };

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );
      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentFamilyMember/${user._id}/${appointmentId}`,
        {
          familymemberEmail: familyEmail,
        }
      );

      console.log("Subscription successful:", response2.data.message);
      alert("Subscription successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.

      alert("Error Scheduling Appointment: " + error.response.data.message);
    }
  };

  const scheduleAppointmentFamilyCreditCard = async (appointmentId) => {
    try {
      const { username, sessionPrice } = doctorDetails;
      const items = [
        {
          name: username,
          price: sessionPrice,
          quantity: 1,
          forAppointments: true,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: familyEmail,
        forAppointments: true,
      };

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );

      console.log("hereee");

      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentFamilyMember/${user._id}/${appointmentId}`,
        {
          familymemberEmail: familyEmail,
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      } else {
        const error = await response.json();
        console.log(error);
        alert("Error processing payment: " + error.message);
      }
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert(
        "Error registering for an appointment: " + error.response.data.message
      );
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
                    Doctor Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.username}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            readOnly
                            defaultValue={doctorDetails.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.fName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.lName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Educational Background
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.educationalBackground}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Affiliation
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.affiliation}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Specialty
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={doctorDetails.specialty}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Available Appointments of Doctor */}
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">
                          Doctor's Available Appointments
                        </h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableAppointments.map((appointment) => (
                            <tr key={appointment._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      Dr. {doctorDetails.fName}{" "}
                                      {doctorDetails.lName}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{doctorDetails.sessionPrice} EGP </td>
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-warning" />
                                  {appointment.status}
                                </Badge>
                              </td>
                              <td> {appointment.date}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="mr-2">
                                    {appointment.type}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() =>
                                    scheduleAppointmentWallet(appointment._id)
                                  }
                                >
                                  Schedule With Wallet
                                </Button>
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() =>
                                    scheduleAppointmentMyselfCreditCard(
                                      appointment._id
                                    )
                                  }
                                >
                                  Schedule With Credit Card
                                </Button>
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={toggleModal}
                                >
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
                                            value={familyEmail}
                                            onChange={(e) =>
                                              setFamilyEmail(e.target.value)
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
                                        scheduleAppointmentFamilyWallet(
                                          appointment._id
                                        )
                                      }
                                    >
                                      Pay With Wallet
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        scheduleAppointmentFamilyCreditCard(
                                          appointment._id
                                        )
                                      }
                                    >
                                      Pay With Credit Card
                                    </Button>
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
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorDetails;
