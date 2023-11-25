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
} from "reactstrap";

const PatientNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-house"></i>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-user-doctor"></i>
                  Doctors
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-calendar-check"></i>
                  Available Appointments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-box-archive"></i>
                  Health Packages
                </NavLink>
              </NavItem>
            </Nav>{" "}
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
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default PatientNavBar;
