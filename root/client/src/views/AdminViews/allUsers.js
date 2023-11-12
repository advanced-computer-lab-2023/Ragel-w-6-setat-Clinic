// reactstrap components
import React, { useState } from "react";
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

const AllUsers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
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
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    shahdamer
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>patient</td>
                            <td>
                              <Button
                                color="primary"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                size="sm"
                              >
                                Remove User
                              </Button>
                            </td>
                          </tr>
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
