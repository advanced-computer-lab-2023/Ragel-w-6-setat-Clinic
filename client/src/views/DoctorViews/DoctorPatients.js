import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  Media,
  FormGroup,
  Form,
  CardBody,
  Input,
} from "reactstrap";

const DoctorPatients = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4">
            <Card
              className="shadow"
              style={{
                backgroundColor: "#0C356A",
              }}
            >
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter/Search for Patients
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            First Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Last Name of Patient:
                          </label>
                          <br />
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Search Patients
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="12">
                        <Button color="secondary" size="sm">
                          Get Patients with Upcoming Appointments
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card
              className="shadow mt-5"
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
                <Row>
                  <Col lg="6">
                    <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                      My Patients
                    </h3>
                  </Col>
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
                      Patient
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#0C356A",
                        color: "#f7fafc",
                      }}
                    >
                      Phone Number
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
                  <tr key="1" style={{ color: "#f7fafc" }}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">Sara Elshemy</span>
                        </Media>
                      </Media>
                    </th>
                    <td> female </td>
                    <td> 01234567890</td>
                    <td>
                      <Button color="secondary" size="sm">
                        View Patient Details
                      </Button>
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

export default DoctorPatients;
