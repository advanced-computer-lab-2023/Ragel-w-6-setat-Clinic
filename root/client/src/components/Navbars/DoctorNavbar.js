import React, { useState } from "react";
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
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext.js";

const DoctorNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { dispatch } = useAuthContext();

  const handleLogOut = async (e) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });

    window.location.href = "http://localhost:3000/auth/login";
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
                  <i class="fa-solid fa-person-circle-question"></i>
                  Appointments Requests
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
          <Nav className="ml-auto" style={{ marginRight: "5px" }} navbar>
            <NavItem className="ml-auto">
              <NavLink className="rounded-circle">
                <span className="nav-link-icon d-block">
                  <i className="ni ni-chat-round" />
                </span>
              </NavLink>
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
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default DoctorNavBar;
