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

const PatientNavBar = () => {
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
                  href="/admin/healthPackagesManagement"
                  className="mb-sm-1 mb-md-0"
                >
                  <i className="fa-solid fa-box-archive"></i>
                  Health Packages Management
                </NavLink>
              </NavItem>
            </Nav>{" "}
          </Container>
          <Nav className="ml-auto" style={{ marginRight: "5px" }} navbar>
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

export default PatientNavBar;
