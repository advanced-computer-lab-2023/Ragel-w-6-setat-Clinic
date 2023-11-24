import React, { useState, useContext, useEffect } from "react";
import ReactDatetime from "react-datetime";
import axios from "axios";
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
  Media,
  Table,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { chartOptions, parseOptions } from "variables/charts.js";
import { UserContext } from "../../contexts/UserContext";

const FilterAppointments = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user } = useContext(UserContext);

  const [allAppointments, setAllAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(`/patients/viewAppointments/${user._id}`);
        const json = await response.json();

        if (response.ok) {
          console.log(json.appointments);
          setAllAppointments(json.appointments);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchAllAppointments();
  }, []);

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/viewUpcomingAppointments/${user._id}`
      );

      if (response.data) {
        setAllAppointments(response.data);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchPastAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/viewPastAppointments/${user._id}`
      );

      if (response.data) {
        setAllAppointments(response.data);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleFilterAppointments = async () => {
    try {
      const response = await axios.get(
        `/patients/filterMyAppointments/${user._id}?status=${statusFilter}&date=${fromDate}`
      );

      if (response.data) {
        setAllAppointments(response.data);
      }
      setStatusFilter("");
      setFromDate("");
    } catch (error) {
      console.error("An error occurred:", error);
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
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Date and/or Status
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Status:</label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            From Date:
                          </label>
                          <br />
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              key={fromDate}
                              timeFormat={false}
                              value={fromDate}
                              onChange={(date) => setFromDate(date)}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleFilterAppointments}
                          size="sm"
                        >
                          Filter Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          onClick={fetchUpcomingAppointments}
                          size="sm"
                        >
                          Show Upcoming Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={fetchPastAppointments}
                          size="sm"
                        >
                          Show Past Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Appointments</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allAppointments.map((appointment, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {appointment.doctor.fName}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{appointment.price}</td>
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  {appointment.status === "completed" ? (
                                    <i className="bg-success" />
                                  ) : (
                                    <i className="bg-warning" />
                                  )}
                                  {appointment.status}
                                </Badge>
                              </td>
                              <td>{appointment.date}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="mr-2">
                                    {appointment.type}
                                  </span>
                                </div>
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

export default FilterAppointments;
