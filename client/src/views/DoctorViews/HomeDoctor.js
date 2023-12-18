import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
//components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { Modal } from "react-bootstrap";

// contexts
import { useAuthContext } from "../../hooks/useAuthContext";

const HomeDoctor = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5); // Adjust the number of notifications per page as needed

  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    educationalBackground: "",
    hourlyRate: "",
    affiliation: "",
    specialty: "",
    wallet: "",
    employmentContractAccepted: "",
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `/doctors/doctorProfile/${user.user._id.toString()}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setDoctorDetails(json);
          if (!json.employmentContractAccepted) {
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorDetails();
    // eslint-disable-next-line
  }, []);

  const handleAccept = async () => {
    try {
      const response = await fetch(
        `/doctors/setEmploymentContract/${user.user._id.toString()}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      } else {
        const data = await response.json();
        console.log("Employment contract response:", data);
      }
      handleClosePopup();
      setDoctorDetails((prevDetails) => ({
        ...prevDetails,
        employmentContractAccepted: true,
      }));
    } catch (error) {
      console.error(
        "An error occurred during employment contract acceptance:",
        error
      );
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    affiliation: "",
    hourlyRate: "",
    email: "",
  });

  const handleEditProfile = () => {
    setEditMode(true);
    setEditedValues({
      affiliation: doctorDetails.affiliation,
      hourlyRate: doctorDetails.hourlyRate,
      email: doctorDetails.email,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(
        `/doctors/updateProfile/${user.user._id}`,
        editedValues,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setEditMode(false);
      setDoctorDetails((prevDetails) => ({
        ...prevDetails,
        affiliation: editedValues.affiliation,
        hourlyRate: editedValues.hourlyRate,
        email: editedValues.email,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `/doctors/getDoctorNotifications/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        if (response.data.status === "success") {
          setNotifications(response.data.notifications);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("An error occurred while fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user.user._id, user.token]);

  useEffect(() => {
    const changeNotificationsToRead = async () => {
      await axios.patch(
        `/doctors/markNotificationsAsRead/${user.user._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    };
    changeNotificationsToRead();
  }, [location.pathname]);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pdfLink =
    "https://napr.memberclicks.net/assets/docs/OldSite/PhysicianHospitalContract3.pdf";

  if (!doctorDetails.employmentContractAccepted) {
    return (
      <>
        <Modal show={showPopup} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Important Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display a link to open the PDF in a new window */}
            <p>
              To view the PDF, click{" "}
              <a href={pdfLink} target="_blank" rel="noopener noreferrer">
                here
              </a>{" "}
              to open it in a new window.
            </p>
            <p>
              By accepting, you agree to the terms and conditions in the
              document.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleAccept}>
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div
        className="header pb-6 pt-5 pt-lg-2 d-flex align-items-center"
        style={{
          backgroundColor: "#0C356A",
          display: "flex",
        }}
      ></div>
      <Container className="mt--5 ml-6" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card
              className="card-profile shadow"
              style={{ backgroundColor: "#EEF5FF" }}
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
                    Hello, Dr. {doctorDetails.fName} {doctorDetails.lName}!
                  </h3>
                  <Row className="justify-content-center">
                    <Col>
                      {editMode ? (
                        <>
                          <Button
                            style={{
                              backgroundColor: "#0C356A",
                              color: "#f8f9fe",
                            }}
                            onClick={handleSaveChanges}
                            className="ml-2"
                          >
                            Done
                          </Button>
                          <Button
                            color="secondary"
                            onClick={handleCancelEdit}
                            className="ml-2 mt-2"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          style={{
                            backgroundColor: "#0C356A",
                            color: "#f8f9fe",
                          }}
                          onClick={handleEditProfile}
                          className="ml-2"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <div className="h5 mt-4">
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        User information
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
                                id="input-username"
                                type="text"
                                defaultValue={doctorDetails.username}
                                readOnly={true}
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
                                name="email"
                                value={
                                  editMode
                                    ? editedValues.email
                                    : doctorDetails.email
                                }
                                readOnly={!editMode} // Updated this line
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                defaultValue={doctorDetails.fName}
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Last name
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                defaultValue={doctorDetails.lName}
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Educational Background
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                defaultValue={
                                  doctorDetails.educationalBackground
                                }
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Hourly Rate
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                name="hourlyRate"
                                value={
                                  editMode
                                    ? editedValues.hourlyRate
                                    : doctorDetails.hourlyRate
                                }
                                readOnly={!editMode}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Specialty
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                defaultValue={doctorDetails.specialty}
                                readOnly={true}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Affiliation
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                name="affiliation"
                                value={
                                  editMode
                                    ? editedValues.affiliation
                                    : doctorDetails.affiliation
                                }
                                readOnly={!editMode}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-2 mt-5" style={{ paddingTop: 9 }} xl="4">
            <Card
              style={{
                width: "30rem",
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#0C356A",
                  color: "#ffffff",
                }}
              >
                <i className="fa-solid fa-bell mr-2"></i>
                Notifications
                <Badge
                  className="ml-2"
                  pill
                  style={{ backgroundColor: "#BE3144" }}
                >
                  New
                </Badge>
              </CardHeader>
              <ListGroup
                flush
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                {currentNotifications.length === 0 ? (
                  <ListGroupItem
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#ffffff",
                    }}
                  >
                    No notifications available.
                  </ListGroupItem>
                ) : (
                  currentNotifications.map((notification) => (
                    <ListGroupItem
                      key={notification.id}
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#ffffff",
                      }}
                    >
                      {notification.read ? (
                        <i
                          class="fa-solid fa-circle"
                          style={{ color: "#e2e6ee" }}
                        ></i>
                      ) : (
                        <i
                          class="fa-solid fa-circle"
                          style={{ color: "#BE3144" }}
                        ></i>
                      )}
                      {notification.message}
                    </ListGroupItem>
                  ))
                )}
              </ListGroup>

              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  className="pagination pagination-lg"
                  listClassName="pagination-lg"
                >
                  {Array.from({
                    length: Math.ceil(
                      notifications.length / notificationsPerPage
                    ),
                  }).map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={index + 1 === currentPage}
                    >
                      <PaginationLink
                        href="#pablo"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </Pagination>
              </div>
            </Card>
          </Col>
          <Col className="order-xl-2 mt-5" xl="2">
            <Card
              className="card-stats my-2 ml-1"
              style={{
                width: "19rem",
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase  mb-0"
                      style={{ color: "#ffffff" }}
                    >
                      Wallet Amount
                    </CardTitle>
                    <span
                      className="h2 font-weight-bold mb-0"
                      style={{ color: "#ffffff" }}
                    >
                      {doctorDetails.wallet} EGP
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-white text-default rounded-circle shadow">
                      <i className="fas fa-percent" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal for the pop-up */}
    </>
  );
};

export default HomeDoctor;
