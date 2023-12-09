import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1 } from "variables/charts.js";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

const Index = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const { user } = useAuthContext();

  const [admin, setAdmin] = useState({ username: "" });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`/admins/adminDetails/${user.user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setAdmin(data.admin);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
        alert(error.message);
      }
    };
    fetchAdmin();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Page content */}
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4">
            {" "}
            <div className="d-flex justify-content-center">
              <Card
                className="card-profile shadow"
                style={{ backgroundColor: "#EEF5FF", width: "100%" }}
              >
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/brand/adminicon.png")}
                          style={{
                            height: "70px",
                            width: "70px",
                            background: "#EEF5FF",
                          }}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardBody
                  className="pt-0 pt-md-4 d-flex align-items-center justify-content-center"
                  style={{ height: "490px" }}
                >
                  <div className="card-profile-stats d-flex justify-content-center mt-md-4"></div>
                  <div className="text-center">
                    <h3>Hello {admin.username}!</h3>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Welcome to the Admin Dashboard!
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      This comprehensive overview provides insights into the
                      heart of your system. Dive into the Sales section to track
                      valuable metrics on sales value, gain a deeper
                      understanding of social traffic with detailed analytics on
                      referrals from platforms like Facebook and Google, and
                      monitor page visits to evaluate user engagement.
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card
              className="shadow mb-3"
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
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                      Page visits
                    </h3>
                  </div>
                </Row>
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
                      Page name
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Visitors
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Unique users
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Bounce rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={{ color: "#f7fafc" }}>
                      /patient/home
                    </th>
                    <td style={{ color: "#f7fafc" }}>4,569</td>
                    <td style={{ color: "#f7fafc" }}>340</td>
                    <td style={{ color: "#f7fafc" }}>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ color: "#f7fafc" }}>
                      /patient/myAppointments
                    </th>
                    <td style={{ color: "#f7fafc" }}>3,985</td>
                    <td style={{ color: "#f7fafc" }}>319</td>
                    <td style={{ color: "#f7fafc" }}>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ color: "#f7fafc" }}>
                      /admin/unregisteredDoctors
                    </th>
                    <td style={{ color: "#f7fafc" }}>3,513</td>
                    <td style={{ color: "#f7fafc" }}>294</td>
                    <td style={{ color: "#f7fafc" }}>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ color: "#f7fafc" }}>
                      /doctor/myPatients
                    </th>
                    <td style={{ color: "#f7fafc" }}>2,050</td>
                    <td style={{ color: "#f7fafc" }}>147</td>
                    <td style={{ color: "#f7fafc" }}>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ color: "#f7fafc" }}>
                      /patient/allDoctors
                    </th>
                    <td style={{ color: "#f7fafc" }}>1,795</td>
                    <td style={{ color: "#f7fafc" }}>190</td>
                    <td style={{ color: "#f7fafc" }}>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card
              className="shadow mb-3"
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
                <Row className="align-items-center">
                  <div className="col">
                    <h3
                      className="mb-0"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      Social traffic
                    </h3>
                  </div>
                </Row>
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
                      Referral
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Visitors
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      Facebook
                    </th>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      1,480
                    </td>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      Facebook
                    </th>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      5,480
                    </td>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      Google
                    </th>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      4,807
                    </td>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      Instagram
                    </th>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      3,678
                    </td>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      twitter
                    </th>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      2,645
                    </td>
                    <td
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
