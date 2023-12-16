import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
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
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorDetails = () => {
  const [modalStates, setModalStates] = useState([]);
  const toggleAppointmentModal = async (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
  };

  const { doctorid } = useParams();
  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

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
  const [familyMembers, setFamilyMembers] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [subscribedPackage, setSubscribedPackage] = useState("");

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(
          `/patients/familyMembers/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          const familyMembersWithEmail = json.patientFamily.filter(
            (familyMember) => familyMember.email
          );
          setFamilyMembers(familyMembersWithEmail);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchFamilyMembers();
    // eslint-disable-next-line
  }, []);

  const registeredFamilyMembers = familyMembers.map((member) => ({
    value: member.email,
    label: member.fName + " " + member.lName,
  }));

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

  useEffect(() => {
    const fetchSubscribedPackage = async () => {
      try {
        const response = await fetch(
          `/patients/subscribedPackage/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setSubscribedPackage(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };
    fetchSubscribedPackage();
    // eslint-disable-next-line
  }, []);

  const scheduleAppointmentMyselfCreditCard = async (appointmentId) => {
    try {
      // extracting relevant information

      const { username, sessionPrice } = doctorDetails;
      let finalPrice = sessionPrice;

      if (subscribedPackage) {
        let sessionDiscount = 0;
        sessionDiscount = subscribedPackage.sessionDiscount || 0;

        const originalSessionPrice = sessionPrice;
        const discountedPrice =
          originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = [
        {
          name: username,
          price: finalPrice,
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
        `/patients/registerForAnAppointmentPatient/${user.user._id}/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const scheduleAppointmentWallet = async (appointmentId) => {
    try {
      // extracting relevant information

      const { username, sessionPrice } = doctorDetails;
      let finalPrice = sessionPrice;

      if (subscribedPackage) {
        let sessionDiscount = 0;
        sessionDiscount = subscribedPackage.sessionDiscount || 0;

        const originalSessionPrice = sessionPrice;
        const discountedPrice =
          originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = {
        name: username,
        price: finalPrice,
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
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentPatient/${user.user._id}/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAvailableAppointments(
          availableAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const scheduleAppointmentFamilyWallet = async (appointment) => {
    try {
      const { username, sessionPrice } = doctorDetails;

      let finalPrice = sessionPrice;

      if (subscribedPackage) {
        let sessionDiscount = 0;
        sessionDiscount = subscribedPackage.sessionDiscount || 0;

        const originalSessionPrice = sessionPrice;
        const discountedPrice =
          originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = {
        name: username,
        price: finalPrice,
        quantity: 1,
        forAppointments: true,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: memberEmail,
        forAppointments: true,
      };

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentFamilyMember/${user.user._id}/${appointment._id}`,
        {
          familyMemberEmail: memberEmail,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAvailableAppointments(
          availableAppointments.filter((app) => app._id !== appointment._id)
        );
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
      }
      toggleAppointmentModal(availableAppointments.indexOf(appointment));
      setMemberEmail("");
    } catch (error) {
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const scheduleAppointmentFamilyCreditCard = async (appointment) => {
    try {
      const { username, sessionPrice } = doctorDetails;
      let finalPrice = sessionPrice;

      if (subscribedPackage) {
        let sessionDiscount = 0;
        sessionDiscount = subscribedPackage.sessionDiscount || 0;

        const originalSessionPrice = sessionPrice;
        const discountedPrice =
          originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = [
        {
          name: username,
          price: finalPrice,
          quantity: 1,
          forAppointments: true,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: memberEmail,
        forAppointments: true,
      };

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response2 = await axios.patch(
        `/patients/registerForAnAppointmentFamilyMember/${user.user._id}/${appointment._id}`,
        {
          familyMemberEmail: memberEmail,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      }
      setMemberEmail("");
    } catch (error) {
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

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
        <div className="d-flex justify-content-center mt-5 mb-5">
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
                display: "flex",
                justifyContent: "space-between", // Align items horizontally
                alignItems: "center", // Align items vertically
              }}
            >
              <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                Doctor's Available Appointments
              </h3>
              <Alert
                color={alertColor}
                isOpen={visible}
                toggle={onDismiss}
                fade={false}
              >
                {alertMessage}
              </Alert>
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
                {availableAppointments.map((appointment, index) => (
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
                    <td>{appointment.price} EGP </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        {appointment.status}
                      </Badge>
                    </td>
                    <td>
                      {" "}
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      {new Date(appointment.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}{" "}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{appointment.type}</span>
                      </div>
                    </td>
                    <td>
                      <Button
                        color="secondary"
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
                        color="secondary"
                        size="sm"
                        onClick={() =>
                          scheduleAppointmentMyselfCreditCard(appointment._id)
                        }
                      >
                        Schedule With Credit Card
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => toggleAppointmentModal(index)}
                      >
                        Schedule For Family
                      </Button>
                      <Modal
                        isOpen={modalStates[index]}
                        toggle={() => toggleAppointmentModal(index)}
                      >
                        <ModalHeader>Schedule For Family Member</ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col lg="8">
                              <FormGroup>
                                <label className="form-control-label">
                                  Email of Family Member
                                </label>
                                <Select
                                  options={registeredFamilyMembers}
                                  isSearchable={true}
                                  placeholder="Select a family member"
                                  value={memberEmail}
                                  onChange={(selectedOption) =>
                                    setMemberEmail(selectedOption)
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="default"
                            onClick={() =>
                              scheduleAppointmentFamilyWallet(appointment)
                            }
                          >
                            Pay With Wallet
                          </Button>
                          <Button
                            color="default"
                            onClick={() =>
                              scheduleAppointmentFamilyCreditCard(appointment)
                            }
                          >
                            Pay With Credit Card
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => toggleAppointmentModal(index)}
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
      </Container>
    </>
  );
};

export default DoctorDetails;
