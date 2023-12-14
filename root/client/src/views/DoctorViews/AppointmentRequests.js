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

const AppointmentRequests = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="order-xl-1 mt-5" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody
                style={{
                  backgroundColor: "#0C356A",
                }}
              >
                <h6 className="heading-small mb-4" style={{ color: "#f7fafc" }}>
                  Appointment Requests
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
                        <h3 className="mb-0">Appointment Details</h3>
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
                              Patient
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                backgroundColor: "#eef5ff",
                              }}
                            >
                              Type
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
                            <td>noha ahmed</td>
                            <td>20-12-2023</td>
                            <td>Follow-up</td>
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

export default AppointmentRequests;
