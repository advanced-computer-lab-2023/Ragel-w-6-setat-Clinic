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
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
} from "reactstrap";
// core components

import { UserContext } from "contexts/UserContext";

const DoctorProfile = () => {
  const { user } = useContext(UserContext);

  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    educationalBackground: "",
    hourlyRate: "",
    affiliation: "",
    specialty: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    affiliation: "",
    hourlyRate: "",
    email: "",
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`/doctors/doctorProfile/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setDoctorDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorDetails();
  }, [user._id]);

  const handleEditProfile = () => {
    setEditMode(true);
    setEditedValues({
      affiliation: doctorDetails.affiliation,
      hourlyRate: doctorDetails.hourlyRate,
      email: doctorDetails.email,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`/doctors/updateProfile/${user._id}`, editedValues);
      setEditMode(false);
      setDoctorDetails((prevDetails) => ({
        ...prevDetails,
        affiliation: editedValues.affiliation,
        hourlyRate: editedValues.hourlyRate,
        email: editedValues.email,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                {doctorDetails ? `Hello Dr. ${doctorDetails.fName}!` : ""}
              </h1>
              {editMode ? (
                <>
                  <Button
                    color="primary"
                    onClick={handleSaveChanges}
                    className="ml-2"
                  >
                    Done
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCancelEdit}
                    className="ml-2 mt-2"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="primary"
                  onClick={handleEditProfile}
                  className="ml-2"
                >
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
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
                            id="input-username"
                            type="text"
                            value={doctorDetails.username}
                            readOnly={true}
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
                            name="email"
                            value={
                              editMode
                                ? editedValues.email
                                : doctorDetails.email
                            }
                            readOnly={!editMode} // Updated this line
                            onChange={handleChange}
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
                            value={doctorDetails.fName}
                            readOnly={true}
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
                            value={doctorDetails.lName}
                            readOnly={true}
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
                            Educational Background
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={doctorDetails.educationalBackground}
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Hourly Rate
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            name="hourlyRate"
                            value={
                              editMode
                                ? editedValues.hourlyRate
                                : doctorDetails.hourlyRate
                            }
                            readOnly={!editMode}
                            onChange={handleChange}
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
                            Specialty
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={doctorDetails.specialty}
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Affiliation
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            name="affiliation"
                            value={
                              editMode
                                ? editedValues.affiliation
                                : doctorDetails.affiliation
                            }
                            readOnly={!editMode}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorProfile;
