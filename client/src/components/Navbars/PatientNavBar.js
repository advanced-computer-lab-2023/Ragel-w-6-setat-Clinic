import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { Badge } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { Link } from "react-router-dom";
import { useNotificationContext } from "contexts/NotificationContext.js";

const PatientNavBar = () => {
  const { hasNewNotifications } = useNotificationContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Add state for selected patient

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setOldPassword("");
    setNewPassword("");
    setUsername("");
  };

  const { user, dispatch } = useAuthContext();

  const handleLogOut = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    window.location.href = "http://localhost:3000/auth/login";
  };

  const handleChangePassword = () => {
    toggleModal(); // Open the modal
  };

  const handlePasswordChangeSubmit = async () => {
    try {
      // use axios for the response

      if (!username || !oldPassword || !newPassword) {
        setAlertMessage("Please fill in all the fields");
        setAlertColor("danger");
        setVisible(true);
        return;
      }

      const response = await axios.post(
        `/patients/changePatientPassword`,
        {
          username,
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
        setUsername("");
        setOldPassword("");
        setNewPassword("");
        setTimeout(() => {
          toggleModal();
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      setUsername("");
      setOldPassword("");
      setNewPassword("");
      console.error(error.response.data.message);
    }
  };

  const handleVideoCall = async () => {
    setIsVideoModalOpen(true); // Open the video modal
  };

  const handlecreateNotif = async () => {
    try {
      // Make the axios GET request when the video link is clicked
      await axios.get(
        `/patients/createVideoNotifications/${selectedDoctor._id}/${user.user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (error) {
      console.error("Error making axios GET request:", error);
      // Handle error if needed
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`/patients/viewDoctors/${user.user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();
      if (response.ok) {
        setDoctors(json.doctors);
        //setUniqueSpecialties(json.uniqueSpecialties);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
    }
  };

  useEffect(() => {
    const loadDoctors = async () => {
      const patients = await fetchDoctors();
      // Set the patients in the state or perform any other actions
    };

    loadDoctors();
  }, [user.id, user.token]);

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark"
        style={{
          backgroundColor: "#0C356A",
          display: "flex",
          justifyContent: "space-between",
        }}
        dark
        expand="md"
      >
        <NavbarBrand>
          <img
            alt="logo"
            src={require("../../assets/img/brand/healthspace-removebg-preview.png")}
            style={{
              height: 130,
              width: 350,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Container fluid>
            <Nav navbar>
              {/* <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-hospital"></i>
                  About Us
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="/patient/home" className="mb-sm-1 mb-md-0">
                  {hasNewNotifications ? (
                    <Badge color="error" variant="dot">
                      <i className="fa-solid fa-house"></i> Home
                    </Badge>
                  ) : (
                    <span>
                      <i className="fa-solid fa-house"></i> Home
                    </span>
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="/patient/allDoctors">
                  <NavLink className="mb-sm-1 mb-md-0">
                    <i className="fa-solid fa-user-doctor"></i>
                    Doctors
                  </NavLink>
                </Link>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-calendar-check"></i>
                  Available Appointments
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  href="/patient/healthPackages"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-box-archive"></i>
                  Health Packages
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
          <Nav className="ml-auto" style={{ marginRight: "5px" }} navbar>
            <NavItem className="ml-auto">
              <NavLink
                href="/patient/chatWithDoctor"
                className="rounded-circle"
              >
                <span className="nav-link-icon d-block">
                  <i className="ni ni-chat-round" />
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="rounded-circle" onClick={handleVideoCall}>
                <span className="nav-link-icon d-block">
                  <i className="fa-solid fa-video"></i>
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <span className="nav-link-icon d-block text-white">
                    <i className="ni ni-button-power" />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="#pablo" onClick={handleLogOut}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={handleChangePassword}>
                    <i className="ni ni-key-25" />
                    <span>Change Password</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      {/* Change Password Modal */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Change Password</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <Alert color={alertColor} isOpen={visible} toggle={onDismiss}>
            {alertMessage}
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handlePasswordChangeSubmit}>
            Change Password
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        toggle={() => setIsVideoModalOpen(!isVideoModalOpen)}
      >
        <ModalHeader>Have a video chat with your patient now</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="patientDropdown">Pick your patient</Label>
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {selectedDoctor?.name || "Select Doctor"}
              </DropdownToggle>
              <DropdownMenu>
                {doctors.map((doctor) => (
                  <DropdownItem
                    key={doctor._id}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    {doctor.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              // Handle the video call and patient selection logic here

              // Open the second modal
              handlecreateNotif();
              setIsSecondModalOpen(true);
            }}
          >
            Next
          </Button>{" "}
          <Button color="secondary" onClick={() => setIsVideoModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isSecondModalOpen}
        toggle={() => setIsSecondModalOpen(!isSecondModalOpen)}
      >
        <ModalHeader>Go to your notifications to join the meeting!</ModalHeader>
        <ModalBody>
          {/* Add the link or any other content for joining the meeting */}
          <p>
            You can now join the video call with your doctor by clicking on the
            notification that has been sent to you!
          </p>
        </ModalBody>
        <ModalFooter>
          {/* You can add additional buttons or actions here if needed */}
          <Button color="secondary" onClick={() => setIsSecondModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PatientNavBar;
