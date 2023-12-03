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
} from "reactstrap";

const AllUsers = () => {
  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="4">
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
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        style={{ color: "#f7fafc" }}
                      >
                        Username
                      </label>
                      <Input className="form-control-alternative" type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
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
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Button color="secondary" href="#pablo" size="sm">
                      Add Admin
                    </Button>
                  </Col>
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
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">hanayu</span>
                        </Media>
                      </Media>
                    </th>

                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">habibahilal</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">shahdamer</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
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
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">hanayu</span>
                        </Media>
                      </Media>
                    </th>

                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">habibahilal</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">shahdamer</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
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
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">hanayu</span>
                        </Media>
                      </Media>
                    </th>

                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">habibahilal</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      style={{
                        color: "#f7fafc",
                      }}
                    >
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">shahdamer</span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      <Button color="secondary" href="#pablo" size="sm">
                        Remove User
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
export default AllUsers;
