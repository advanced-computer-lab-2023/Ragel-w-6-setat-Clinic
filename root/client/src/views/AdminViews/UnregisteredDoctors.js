import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";

const UnregisteredDoctors = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h6 className="heading-small mb-4" style={{ color: "#f7fafc" }}>
                  Unregistered Doctors
                </h6>

                <hr className="my-4" style={{ backgroundColor: "#f7fafc" }} />

                <Row>
                  <Col>
                    <Card
                      className="shadow"
                      style={{
                        backgroundColor: "#eef5ff",
                      }}
                    >
                      <CardHeader
                        className="border-0"
                        style={{
                          backgroundColor: "#eef5ff",
                        }}
                      >
                        <h3 className="mb-0">Doctor Details</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Username
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              First Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Last Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Educational Background
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Hourly Rate
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Affiliation
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Specialty
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Medical Licenses
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Degree
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Accept
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Reject
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>nohaahmed</td>
                            <td>noha</td>
                            <td>ahmed</td>
                            <td>Ain Shams University</td>
                            <td>180</td>
                            <td>Cairo University</td>
                            <td>Surgeon</td>
                            <td>
                              <Button
                                className="mt-3"
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                size="sm"
                              >
                                View Document
                              </Button>
                            </td>
                            <td>
                              <Button
                                className="mt-3"
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                size="sm"
                              >
                                View Document
                              </Button>
                            </td>
                            <td>
                              <Button
                                className="mt-3"
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                size="sm"
                              >
                                View Document
                              </Button>
                            </td>
                            <td>
                              <Button
                                className="mt-3"
                                color="success"
                                size="sm"
                              >
                                Accept
                              </Button>
                            </td>
                            <td>
                              <Button className="mt-3" color="danger" size="sm">
                                Reject
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UnregisteredDoctors;
