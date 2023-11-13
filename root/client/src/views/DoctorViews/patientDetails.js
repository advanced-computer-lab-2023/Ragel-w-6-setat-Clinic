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
  Table,
  Media,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";

const PatientDetails = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const { user } = useContext(UserContext);
  const { patientid } = useParams();
  // State to store doctor details
  const [PatientDetails, setPatientDetails] = useState({
    username: "",
    password: "",
    email: "",
    fName: "",
    lName: "",
    dateOfBirth: null,
    educationalBackground: "",
    hourlyRate: 0,
    sessionPrice: 0,
    affiliation: "",
    specialty: "",
    isRegistered: false,
    wallet: 0,
  });



  useEffect(() => {  
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `/doctors/selectedPatient/$${user._id}/${patientid}`
        );
        const json = await response.json();
        // Update the state with the fetched doctor details
        if (response.ok) {
          setPatientDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
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
                  <h6 className="heading-small text-muted mb-4">
                     Information
                  </h6>
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
                            defaultValue={PatientDetails.username}
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
                            defaultValue={PatientDetails.email}
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
                            defaultValue={PatientDetails.fName}
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
                            defaultValue={PatientDetails.lName}
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
                            defaultValue={PatientDetails.gender}
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
                            defaultValue={PatientDetails.phoneNum}
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
                              PatientDetails.dateOfBirth &&
                              calculateAge(PatientDetails.dateOfBirth)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientDetails;