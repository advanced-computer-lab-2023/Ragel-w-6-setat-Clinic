//components

import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useContext } from "react";
import ReactDatetime from "react-datetime";
import React, { useState } from "react";
import axios from "axios";
import { UserContext } from "contexts/UserContext";


const AllDoctors = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [date, setDate] = useState("");
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/patients/viewDoctors/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setDoctors(json.doctors);
          setUniqueSpecialties(json.uniqueSpecialties);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert(error.response.data.message);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/patients/searchForDoctors/${user._id}`,
        {
          params: {
            fName: firstName,
            lName: lastName,
            specialty: specialtySearch,
          },
        }
      );

      if (response.data.doctors) {
        setDoctors(response.data.doctors);
      }
      setFirstName("");
      setLastName("");
      setSpecialtySearch("");
    } catch (err) {
      alert("Internal Server Error: " + err.response.data.message);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get(`/patients/filterDoctors/${user._id}`, {
        params: {
          specialty: specialtyFilter,
          date: date,
        },
      });
      if (response.data.doctors) {
        setDoctors(response.data.doctors);
      }
      setSpecialtyFilter("");
      setDate("");
    } catch (err) {
      alert("Internal Server Error: " + err.response.data.message);
    }
  };


  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Container
            className="mb-5"
            fluid
            style={{ backgroundColor: "#0C356A" }}
          >
            <Form>
              <h6 className="heading-small text-muted mt-2 mb-4">
                Filter/Search for Doctors
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Specialty:
                      </label>
                      <br />
                      <Input name="select" type="select" id="dropdown"
                            className="form-control-alternative"
                            value={specialtyFilter}
                            onChange={(e) => setSpecialtyFilter(e.target.value)}>
                      <option value="">Select Specialty</option>
                      {uniqueSpecialties
                              ? uniqueSpecialties.map((uniqueSpecialty) => (
                                  <option
                                    key={uniqueSpecialty}
                                    value={uniqueSpecialty}
                                  >
                                    {uniqueSpecialty}
                                  </option>
                                ))
                              : ""}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        First Name of Doctor
                      </label>
                      <Input
                            className="form-control-alternative"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />        
                   </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Available on Date:
                      </label>
                      <br />
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "From Date",
                          }}
                          timeFormat={true}
                          value={date}
                          onChange={(value) => setDate(value)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Last Name of Doctor
                      </label>
                      <Input
                            className="form-control-alternative"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          /></FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Button color="secondary" size="sm" onClick={handleFilter}>
                      Filter Doctors
                    </Button>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Specialty of Doctor
                      </label>
                      <Input className="form-control-alternative" type="text"  value={specialtySearch}
                            onChange={(e) => setSpecialtySearch(e.target.value)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6"></Col>
                  <Col lg="6">
                    <Button color="secondary" size="sm" onClick={handleSearch}>
                      Search Doctors
                    </Button>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
            </Form>
          </Container>
        </Row>
        <Row>
      {doctors.map((doctor, index) => (
        <Col key={index} className="order-xl-6 mb-4" xl="4">
          <Card className="card-profile shadow" style={{ backgroundColor: "#EEF5FF" }}>
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      id={`tooltip${index + 1}`}
                      alt="..."
                      className="rounded-circle"
                      src={require("../../assets/img/brand/patienticonm.png")}
                      style={{
                        height: "70px",
                        width: "70px",
                        background: "#EEF5FF",
                      }}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    placement="right"
                    target={`tooltip${index + 1}`}
                    style={{ backgroundColor: "#0C356A" }}
                  >
                    Click to view profile
                  </UncontrolledTooltip>
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4" style={{ backgroundColor: "#EEF5FF" }}></CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <div className="text-center">
                <h3>
                  {doctor.name}
                  <span className="font-weight-light">, {doctor.specialty}</span>
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  Session Price: {doctor.sessionPrice}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
    </>
  );
};

export default AllDoctors;
