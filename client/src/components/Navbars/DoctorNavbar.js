import React, { useState } from "react";
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
import { useAuthContext } from "../../hooks/useAuthContext.js";

const DoctorNavBar = () => {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setOldPassword("");
    setNewPassword("");
    setUsername("");
  };

  const { user, dispatch } = useAuthContext();

  const handleLogOut = async (e) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });

    window.location.href = "http://localhost:3000/auth/login";
  };

  const handleChangePassword = () => {
    toggleModal(); // Open the modal
  };

  const handlePasswordChangeSubmit = async () => {
    try {
      if (!username || !oldPassword || !newPassword) {
        setAlertMessage("Please fill in all the fields");
        setAlertColor("danger");
        setVisible(true);
        return;
      }

      const response = await axios.post(
        `/doctors/changeDoctorPassword`,
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
              <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-hospital"></i>
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doctor/home" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-house"></i>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doctor/myPatients" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-user-doctor"></i>
                  My Patients
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/doctor/myAppointments"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  My Appointments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/doctor/appointmentRequests"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-person-circle-question"></i>
                  Appointments Requests
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
          <Nav className="ml-auto" style={{ marginRight: "5px" }} navbar>
            <NavItem className="ml-auto">
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <span className="nav-link-icon d-block text-white">
                    <i className="ni ni-chat-round" />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="/doctor/chatWithPatient">
                    <i className="ni ni-user-run" />
                    <span>Chat with Patients </span>
                  </DropdownItem>
                  <DropdownItem href="#pablo">
                    <i className="ni ni-key-25" />
                    <span>Chat with Pharmacists</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <NavItem>
              <NavLink className="rounded-circle">
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
    </>
  );
};

export default DoctorNavBar;
