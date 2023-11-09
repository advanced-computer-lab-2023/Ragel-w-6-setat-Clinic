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
  Row,
  Col,
  Badge,
  Input,
  Media,
  Table,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const SearchForDoctors = () => {
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
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter/Search for Doctors
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Specialty:
                          </label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            <option value="upcoming">Cardiologist</option>
                            <option value="rescheduled">Children</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            First Name of Doctor
                          </label>
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
                          <label className="form-control-label">
                            Available on Date:
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
                              timeFormat={true}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Last Name of Doctor
                          </label>
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
                          Filter Doctors
                        </Button>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Specialty of Doctor
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6"></Col>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Search Doctors
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
                        <h3 className="mb-0">Doctors</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Session Price</th>
                            <th scope="col">Specialty</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    Dr. Hassan Soubra
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>$2,500 USD</td>
                            <td>
                              <i className="bg-warning" />
                              Cardiologist
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

export default SearchForDoctors;
