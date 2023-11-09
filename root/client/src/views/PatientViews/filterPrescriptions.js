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
  Media,
  Table,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const FilterPrescriptions = () => {
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
                    Filter with Doctor, Date, and/or Filled/Unfilled
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Doctor:</label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            {/* from backend */}
                            <option value="Ahmed">Ahmed</option>
                            <option value="Mohamed">Mohamed</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">On Date:</label>
                          <br />
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              inputProps={{
                                placeholder: "Date",
                              }}
                              timeFormat={false}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Filled/Unfilled:
                          </label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            {/* from backend */}
                            <option value={true}>Filled</option>
                            <option value={false}>Unfiled</option>
                          </select>
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
                          Filter Prescriptions
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
                        <h3 className="mb-0">Prescriptions</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Doctor</th>
                            <th scope="col">Medication</th>
                            <th scope="col">Dosage</th>
                            <th scope="col">Date</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Filled?</th>
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
                            <td>Panadol</td>
                            <td>2 pills</td>
                            <td>23-12-2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">
                                  Take one after breakfast, and one before bed
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">True</span>
                              </div>
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

export default FilterPrescriptions;
