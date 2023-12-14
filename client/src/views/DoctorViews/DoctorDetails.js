import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Badge, 
  Media,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Badge
} from "reactstrap";

const DoctorDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <Container className="mt-5" fluid>
        <div className="d-flex justify-content-center">
          <Card
            className="card-profile shadow"
            style={{ backgroundColor: "#EEF5FF", width: "30%" }}
          >
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("../../assets/img/brand/patienticonf.png")}
                      style={{
                        height: "100px",
                        width: "100px",
                        background: "#EEF5FF",
                      }}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader
              className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
              style={{ backgroundColor: "#EEF5FF" }}
            ></CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <div className="card-profile-stats d-flex justify-content-center mt-md-4"></div>
              <div className="text-center">
                <h3>
                  Dr. Jessica Jones
                  <span className="font-weight-light">, Pediatric</span>
                </h3>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  From Ain Shams University
                </div>
                <div>
                  <i className="ni education_hat mr-2" />
                  Doctor at New Giza Hospital
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="d-flex justify-content-center mt-5">
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
              <h3 className="mb-0" style={{ color: "#f7fafc" }}>
                Doctor's Available Appointments
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
                    Doctor
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#0C356A",
                      color: "#f7fafc",
                    }}
                  ></th>
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
                        <span className="mb-0 text-sm">Dr. Jessica Jones</span>
                      </Media>
                    </Media>
                  </th>
                  <td>100 EGP </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-success" />
                      Available
                    </Badge>
                  </td>
                  <td> 12-10-2023</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">General</span>
                    </div>
                  </td>
                  <td>
                    <Button color="secondary" size="sm">
                      Schedule With Wallet
                    </Button>
                  </td>
                  <td>
                    <Button color="secondary" size="sm">
                      Schedule With Credit Card
                    </Button>
                  </td>
                  <td>
                    <Button color="secondary" size="sm" onClick={toggleModal}>
                      Schedule For Family
                    </Button>
                    <Modal isOpen={modal} toggle={toggleModal}>
                      <ModalHeader toggle={toggleModal}>
                        Schedule For Family Member
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Email of Family Member
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="default">Pay With Wallet</Button>
                        <Button color="default">Pay With Credit Card</Button>
                        <Button color="secondary" onClick={toggleModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default DoctorDetails;
