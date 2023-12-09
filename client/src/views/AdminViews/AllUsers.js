import { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Media,
  Table,
  Form,
  FormGroup,
  Input,
  Alert,
} from "reactstrap";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

const AllUsers = () => {
  const [patientUsers, setPatientUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [doctorUsers, setDoctortUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  useEffect(() => {
    const fetchPatientUsers = async () => {
      try {
        const response = await fetch(`/admins/allPatients/${user.user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setPatientUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchPatientUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch(`/admins/allAdmins/${user.user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setAdminUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchAdminUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchDoctorUsers = async () => {
      try {
        const response = await fetch(`/admins/allDoctors/${user.user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setDoctortUsers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchDoctorUsers();
    // eslint-disable-next-line
  }, []);

  const removePatient = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deletePatient/${user.user._id}/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setPatientUsers((prevPatients) =>
          prevPatients.filter((patient) => patient.username !== userName)
        );
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const removeDoctor = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deleteDoctor/${user.user._id}/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setDoctortUsers((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.username !== userName)
        );
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const removeAdmin = async (userName) => {
    try {
      const response = await axios.delete(
        `/admins/deleteAdmin/${user.user._id}/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setAdminUsers((prevAdmins) =>
          prevAdmins.filter((admin) => admin.username !== userName)
        );
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const addAdmin = async () => {
    try {
      const response = await axios.post(
        `/admins/addAdmin/${user.user._id}`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setAdminUsers((prevAdmins) => [...prevAdmins, response.data.admin]);
        setVisible(true);
        setAlertColor("success");
        setAlertMessage(response.data.message);
      }
      setPassword("");
      setUsername("");
    } catch (error) {
      console.error(error.response.data.message);
      setVisible(true);
      setAlertColor("danger");
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4" className="mx-auto">
            <Form
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <h6 className="heading-small text-muted mb-4 text-center pt-3">
                Add Admin
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="10">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Username
                      </label>
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
                  <Col lg="10">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Password
                      </label>
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
                    <Button color="secondary" onClick={addAdmin} size="sm">
                      Add Admin
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Alert
                    className="mt-3 mx-auto"
                    color={alertColor}
                    isOpen={visible}
                    toggle={onDismiss}
                  >
                    {alertMessage}
                  </Alert>
                </Row>
              </div>
              <hr className="my-4" />
            </Form>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                className="border-0"
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    color: "#f7fafc",
                  }}
                >
                  Patient Users
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over patientUsers */}
                  {patientUsers.map((patient) => (
                    <tr key={patient._id}>
                      <th
                        scope="row"
                        style={{
                          color: "#f7fafc",
                        }}
                      >
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {patient.username}
                            </span>
                          </Media>
                        </Media>
                      </th>

                      <td>
                        <Button
                          color="secondary"
                          onClick={() => removePatient(patient.username)}
                          size="sm"
                        >
                          Remove User
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                className="border-0"
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    color: "#f7fafc",
                  }}
                >
                  Admin Users
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over adminUsers */}
                  {adminUsers.map((admin) => (
                    <tr key={admin._id}>
                      <th
                        scope="row"
                        style={{
                          color: "#f7fafc",
                        }}
                      >
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {admin.username}
                            </span>
                          </Media>
                        </Media>
                      </th>

                      <td>
                        <Button
                          color="secondary"
                          onClick={() => removeAdmin(admin.username)}
                          size="sm"
                        >
                          Remove User
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardHeader
                className="border-0"
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    color: "#f7fafc",
                  }}
                >
                  Doctor Users
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over doctorUsers */}
                  {doctorUsers.map((doctor) => (
                    <tr key={doctor._id}>
                      <th
                        scope="row"
                        style={{
                          color: "#f7fafc",
                        }}
                      >
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {doctor.username}
                            </span>
                          </Media>
                        </Media>
                      </th>

                      <td>
                        <Button
                          color="secondary"
                          onClick={() => removeDoctor(doctor.username)}
                          size="sm"
                        >
                          Remove User
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AllUsers;
