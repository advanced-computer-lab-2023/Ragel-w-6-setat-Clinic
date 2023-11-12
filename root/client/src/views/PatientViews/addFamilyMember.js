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
import React, { useState, useContext, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  Collapse,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

//contexts to use
import { UserContext } from "../../contexts/UserContext";

const AddFamilyMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [email, setEmail] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [relationship, setRelationship] = useState("husband");
  const [familyMembers, setFamilyMembers] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(`/patients/familyMembers/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setFamilyMembers(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchFamilyMembers();
  }, [familyMembers]);

  const handleLinkFamilyMember = async () => {
    try {
      const response = await axios.post(
        `/patients/linkFamilyMember/${user._id}`,
        {
          email,
        }
      );
      console.log("Linked Succesfully:", response.data.message); // Log the response data
      // Clear the form inputs after successful addition
      alert("Linked Succesfully: " + response.data.message);
      setEmail("");
    } catch (error) {
      alert("Linked failed: " + error.response.data.message);
    }
  };

  const handleAddFamilyMember = async () => {
    try {
      const response = await axios.post(
        `/patients/addFamilyMember/${user._id}`,
        {
          fName,
          lName,
          nationalID,
          dateOfBirth,
          gender,
          relationship,
        }
      );
      console.log("Added Succesfully:", response.data.message); // Log the response data
      // Clear the form inputs after successful addition
      alert("Added Succesfully: " + response.data.message);
      setFirstName("");
      setLastName("");
      setNationalID("");
      setDateOfBirth(null);
      setGender("");
      setRelationship("");
    } catch (error) {
      alert("Added failed: " + error.response.data.message);
    }
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8"></Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleAddFamilyMember}
                      size="sm"
                    >
                      Add Family Member
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Family Member Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            First name
                          </label>
                          <Input
                            required
                            className="form-control-alternative"
                            type="text"
                            value={fName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
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
                            required
                            className="form-control-alternative"
                            type="text"
                            value={lName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            National ID
                          </label>
                          <Input
                            required
                            className="form-control-alternative"
                            type="text"
                            value={nationalID}
                            onChange={(e) => setNationalID(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Date of Birth
                          </label>
                          <Input
                            required
                            className="form-control-alternative"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" for="dropdown">
                            Gender:
                          </label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" for="dropdown">
                            Relationaship:
                          </label>
                          <br />
                          <select
                            id="dropdown"
                            className="form-control-alternative"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                          >
                            <option value="wife">Wife</option>
                            <option value="husband">Husband</option>
                            <option value="child">Child</option>
                            <option value="sibling">Sibling</option>
                            <option value="parent">Parent</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Is your family member a registered patient? Link their
                    account with yours!
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Email (Must match the email your family member
                            registered with)
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <React.StrictMode>
                            <Button
                              color="primary"
                              onClick={toggle}
                              style={{ marginBottom: "1rem" }}
                            >
                              View all registered family members
                            </Button>
                            <Collapse isOpen={isOpen}>
                              <Card>
                                <CardBody>
                                  <ListGroup>
                                    {familyMembers
                                      ? familyMembers.map((member, index) => (
                                          <ListGroupItem
                                            key={index}
                                          >{`${member.fName} ${member.lName}`}</ListGroupItem>
                                        ))
                                      : ""}
                                  </ListGroup>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </React.StrictMode>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleLinkFamilyMember}
                          size="sm"
                        >
                          Link Family Member
                        </Button>
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

export default AddFamilyMember;
