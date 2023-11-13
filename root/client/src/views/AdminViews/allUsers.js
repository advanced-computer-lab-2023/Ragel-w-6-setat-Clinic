// reactstrap components
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
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
  Input,
  Row,
  Col,
  Badge,
  Media,
  Table,
} from "reactstrap";
// core components

import { UserContext } from "../../contexts/UserContext";

const AllUsers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [patientUsers, setPatientUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [doctorUsers, setDoctortUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPatientUsers = async () => {
      try {
        const response = await fetch(`/admins/allPatients/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setPatientUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPatientUsers();
  }, []);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch(`/admins/allAdmins/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setAdminUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAdminUsers();
  }, []);

  useEffect(() => {
    const fetchDoctorUsers = async () => {
      try {
        const response = await fetch(`/admins/allDoctors/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setDoctortUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorUsers();
  }, []);

  const addAdmin = async () => {
    try {
      const response = await axios.post(`/admins/addAdmin/${user._id}`, {
        username: username,
        password: password,
      });
      alert(response.data.message);
      setPassword("");
      setUsername("");
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert("Please make sure to fill in the blanks");
    }
  };

  const removeAdmin = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deleteAdmin/${user._id}/${userName}`
      );
      alert(response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const removePatient = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deletePatient/${user._id}/${userName}`
      );
      alert(response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const removeDoctor = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deleteDoctor/${user._id}/${userName}`
      );
      alert(response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert(error.response.data.message);
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
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">Add Admin</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">UserName</label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Password</label>
                          <Input
                            className="form-control-alternative"
                            type="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={addAdmin}
                          size="sm"
                        >
                          Add Admin
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
                        <h3 className="mb-0">Users</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Type of User</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Map over patientUsers */}
                          {patientUsers.map((user) => (
                            <tr key={user._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {user.username}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>patient</td>
                              <td>
                                <Button
                                  color="primary"
                                  href="#pablo"
                                  onClick={() => removePatient(user.username)}
                                  size="sm"
                                >
                                  Remove User
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {/* Map over adminUsers */}
                          {adminUsers.map((user) => (
                            <tr key={user._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {user.username}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>admin</td>
                              <td>
                                <Button
                                  color="primary"
                                  href="#pablo"
                                  onClick={() => removeAdmin(user.username)}
                                  size="sm"
                                >
                                  Remove User
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {/* Map over doctorUsers */}
                          {doctorUsers.map((user) => (
                            <tr key={user._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {user.username}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>doctor</td>
                              <td>
                                <Button
                                  color="primary"
                                  href="#pablo"
                                  size="sm"
                                  onClick={() => removeDoctor(user.username)}
                                >
                                  Remove User
                                </Button>
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

export default AllUsers;
