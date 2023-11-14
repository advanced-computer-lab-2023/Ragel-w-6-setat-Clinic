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

  const [upcomingAppointments, setupcomingAppointments] = useState(null);
  const [pastAppointments, setpastAppointments] = useState(null);
  const [allAppointments, setallAppointments] = useState(null);
  const [selectedOption, setSelectedOption] = useState("all");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");



  const fetchAllAppointments = async () => {
    try {
      const response = await fetch(`/patients/viewAppointments/${user._id}`);
      const json = await response.json();

      if (response.ok) {
        setallAppointments(json.appointments);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, [user._id]);

  const handleFilterAppointments = async () => {
    try {
      const response = await fetch(
        `/patients/filterAppointments/${user._id}?status=${statusFilter}&date=${fromDate}`
      );
      const json = await response.json();

      if (response.ok) {
        if (selectedOption === "upcoming") {
          setupcomingAppointments(json.appointments);
        } else if (selectedOption === "past") {
          setpastAppointments(json.appointments);
        } else if (selectedOption === "all") {
          setallAppointments(json.appointments);
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOption === "upcoming") {
          const response = await fetch(`/patients/viewUpcomingAppointments/${user._id}`);
          const json = await response.json();

          if (response.ok) {
            setupcomingAppointments(json.appointments);
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        } else if (selectedOption === "past") {
          const response = await fetch(`/patients/viewPastAppointments/${user._id}`);
          const json = await response.json();

          if (response.ok) {
            setpastAppointments(json.appointments);
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [user._id, selectedOption]);

  

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
                              inputProps={{
                                placeholder: "From Date",
                              }}
                              timeFormat={false}
                              onChange={(date) =>
                                setFromDate(date.format("YYYY-MM-DD"))
                              }
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
                          href="#pablo"
                          onClick={() => setSelectedOption("upcoming")}
                          size="sm"
                        >
                          Show Upcoming Appointments
                        </Button>
                      </Col>
                      <Col lg="3">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={() => setSelectedOption("past")}
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
                          {selectedOption === "upcoming" &&
                            Array.isArray(upcomingAppointments) &&
                            upcomingAppointments.length > 0 ? (
                              upcomingAppointments.map((appointment, index) => (
                                <tr key={index}>
                                  <th scope="row">
                                    <Media className="align-items-center">
                                      <Media>
                                      <span className="mb-0 text-sm">
  {appointment.doctor?.fName || 'No Doctor'}
</span>
                                      </Media>
                                    </Media>
                                  </th>
                                  <td>{appointment.price}</td>
                                  <td>
                                    <Badge color="" className="badge-dot mr-4">
                                      <i className="bg-warning" />
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
                              ))
                            ) : selectedOption === "past" &&
                              Array.isArray(pastAppointments) &&
                              pastAppointments.length > 0 ? (
                                pastAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                        <span className="mb-0 text-sm">
  {appointment.doctor?.fName || 'No Doctor'}
</span>
                                        </Media>
                                      </Media>
                                    </th>
                                    <td>{appointment.price}</td>
                                    <td>
                                      <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-success" />
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
                                ))
                              ) : selectedOption === "all" &&
                              Array.isArray(allAppointments) &&
                              allAppointments.length > 0 ? (
                                allAppointments.map((appointment, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                        <span className="mb-0 text-sm">
    {appointment.doctor?.fName || 'No Doctor'}
  </span>
                                        </Media>
                                      </Media>
                                    </th>
                                    <td>{appointment.price}</td>
                                    <td>
                                      <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-warning" />
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
                                ))
                              
                              
                              
                              ): (
                                <tr>
                                  <td colSpan="5">
                                    No appointments available.
                                  </td>
                                </tr>
                              )}
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
