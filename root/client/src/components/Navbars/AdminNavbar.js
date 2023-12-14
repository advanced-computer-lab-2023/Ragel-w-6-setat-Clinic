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
                <NavLink href="/admin/home" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-house"></i>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/allUsers" className="mb-sm-1 mb-md-0">
                  <i className="fa-solid fa-user"></i>
                  System Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/admin/unregisteredDoctors"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-user-doctor"></i>
                  Unregistered Doctors
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/patient/healthPackages"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-box-archive"></i>
                  Health Packages Management
                </NavLink>
              </NavItem>
            </Nav>{" "}
          </Container>
        </Collapse>
      </Navbar>
    </>
  );
};

export default PatientNavBar;
