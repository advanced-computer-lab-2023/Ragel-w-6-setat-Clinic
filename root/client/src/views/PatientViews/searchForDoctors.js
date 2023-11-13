// reactstrap components
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Input,
  Media,
  Table,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { UserContext } from "contexts/UserContext";

const SearchForDoctors = () => {
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
                    Filter/Search for Doctors
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Specialty:
                          </label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                            value={specialtyFilter}
                            onChange={(e) => setSpecialtyFilter(e.target.value)}
                          >
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
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
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
                          <label className="form-control-label">
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
                          <label className="form-control-label">
                            Last Name of Doctor
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          onClick={handleFilter}
                          size="sm"
                        >
                          Filter Doctors
                        </Button>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Specialty of Doctor
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={specialtySearch}
                            onChange={(e) => setSpecialtySearch(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6"></Col>
                      <Col lg="6">
                        <Button
                          color="primary"
                          onClick={handleSearch}
                          size="sm"
                        >
                          Search Doctors
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                {/* Table */}
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Doctors</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Session Price</th>
                            <th scope="col">Specialty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctors.map((doctor) => (
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      Dr. {doctor.name}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{doctor.sessionPrice} EGP</td>
                              <td>
                                <i className="bg-warning" />
                                {doctor.specialty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchForDoctors;
