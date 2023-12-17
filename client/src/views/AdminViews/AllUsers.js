import React, { useState, useEffect } from "react";
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

const UserTypeTable = ({ users, removeUser, userType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // pagination functions
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  return (
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
          {userType} Users ({users.length})
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
          {/* Map over users */}
          {records.map((user) => (
            <tr key={user._id}>
              <th
                scope="row"
                style={{
                  color: "#f7fafc",
                }}
              >
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">{user.username}</span>
                  </Media>
                </Media>
              </th>

              <td>
                <Button
                  color="secondary"
                  onClick={() => removeUser(user.username)}
                  size="sm"
                >
                  Remove User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        className="pagination justify-content-center mt-2"
        listClassName="justify-content-center"
      >
        <PaginationItem>
          <PaginationLink onClick={prevPage}>
            <i className="fa fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {numbers.map((n, i) => (
          <PaginationItem
            key={i}
            className={`${currentPage === n ? "active" : ""}`}
          >
            <PaginationLink
              style={{
                backgroundColor: currentPage === n ? "#0C356A" : "", // Apply custom color when active
                color: currentPage === n ? "#ffffff" : "", // Text color when active
              }}
              onClick={() => changeCurrentPage(n)}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink onClick={nextPage}>
            <i className="fa fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Card>
  );
};

const AllUsers = () => {
  const [patientUsers, setPatientUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [doctorUsers, setDoctorUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  useEffect(() => {
    const fetchUsers = async (url, setUserFunc) => {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setUserFunc(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchUsers(`/admins/allPatients/${user.user._id}`, setPatientUsers);
    fetchUsers(`/admins/allAdmins/${user.user._id}`, setAdminUsers);
    fetchUsers(`/admins/allDoctors/${user.user._id}`, setDoctorUsers);
    // eslint-disable-next-line
  }, []);

  const removeUser = async (userName, userType, setUserFunc) => {
    try {
      const response = await axios.delete(
        `/admins/delete${userType}/${user.user._id}/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserFunc((prevUsers) =>
          prevUsers.filter((user) => user.username !== userName)
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
        setAdminUsers((prevUsers) => [...prevUsers, response.data.admin]);
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
            <UserTypeTable
              users={patientUsers}
              removeUser={(userName) =>
                removeUser(userName, "Patient", setPatientUsers)
              }
              userType="Patient"
            />
          </Col>
          <Col xl="4">
            <UserTypeTable
              users={adminUsers}
              removeUser={(userName) =>
                removeUser(userName, "Admin", setAdminUsers)
              }
              userType="Admin"
            />
          </Col>
          <Col xl="4">
            <UserTypeTable
              users={doctorUsers}
              removeUser={(userName) =>
                removeUser(userName, "Doctor", setDoctorUsers)
              }
              userType="Doctor"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllUsers;
