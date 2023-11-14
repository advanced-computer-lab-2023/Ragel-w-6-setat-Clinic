/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";

const PatientDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const { user } = useContext(UserContext);
  const { patientid } = useParams();
  // States to store patient details
  const [patientDetails, setPatientDetails] = useState("");
  const [file, setFile] = useState();
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `/doctors/selectedPatient/${user._id}/${patientid}`
        );
        const json = await response.json();
        // Update the state with the fetched doctor details
        if (response.ok) {
          setPatientDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert(error.response.data.message);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(
          `/doctors/patientMedicalHistory/${user._id}/${patientid}`
        );
        const json = await response.json();
        if (response.ok) {
          setMedicalHistory(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Server Error");
      }
    };
    fetchMedicalHistory();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `/doctors/uploadDocumentForPatient/${user._id}/${patientid}`,
        formData
      );
      if (response.ok) {
        alert("File uploaded successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Server Error");
    }
  };

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

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
                  <h6 className="heading-small text-muted mb-4">Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={patientDetails.username}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            readOnly
                            defaultValue={patientDetails.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={patientDetails.fName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={patientDetails.lName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Gender
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={patientDetails.gender}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={patientDetails.phoneNum}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            readOnly
                            defaultValue={
                              patientDetails.dateOfBirth
                                ? calculateAge(patientDetails.dateOfBirth)
                                : ""
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                {/* patient documents */}
                <Row>
                  <div class="input-group mb-3">
                    <label
                      class="input-group-text mr-1"
                      for="inputGroupFile01"
                      onClick={handleUpload}
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      class="form-control"
                      id="inputGroupFile01"
                    />
                  </div>
                </Row>
                <Row>
                  {medicalHistory.length > 0
                    ? medicalHistory.map((history, index) => (
                        <Col lg="6" xl="3">
                          <Card className="card-stats mb-4 mb-xl-0 mt-3">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Document {index + 1}
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    <Button
                                      className="mt-3"
                                      color="primary"
                                      onClick={() => showDocument(history)}
                                      size="sm"
                                    >
                                      View Document
                                    </Button>
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  {/* <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div> */}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      ))
                    : ""}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientDetails;
