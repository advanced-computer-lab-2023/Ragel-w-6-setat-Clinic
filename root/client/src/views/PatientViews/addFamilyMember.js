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
} from "reactstrap";


// core components
import UserHeader from "components/Headers/UserHeader.js";
// core components
import { chartOptions, parseOptions } from "variables/charts.js";
//contexts to use
import { UserContext } from "../../contexts/UserContext";

const AddFamilyMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { user } = useContext(UserContext);

  // State variables for family member information
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default value
  const [relationship, setRelationship] = useState("wife"); // Default value

  // Function to handle changes in input fields
  const handleFNameChange = (e) => setFName(e.target.value);
  const handleLNameChange = (e) => setLName(e.target.value);
  const handleNationalIDChange = (e) => setNationalID(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleRelationshipChange = (e) => setRelationship(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted");

    // Create a data object with the family member information
    const data = {
      fName,
      lName,
      nationalID,
      age,
      gender,
      relationship,
    };


    console.log("EL DATA AHE    " + data);

    try {
      // Make a POST request to add the family member
      const response = await fetch(`/patients/addFamilyMember/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        console.log("Family member added successfully:", json.newFamilyMember);
        // Optionally, you can reset the form or handle success in another way
      } else {
        console.error("Error adding family member:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
                      onClick={handleFormSubmit}  // Ensure the correct onClick assignment
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
                <label className="form-control-label">First name</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  value={fName}
                  onChange={handleFNameChange}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">Last name</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  value={lName}
                  onChange={handleLNameChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">National ID</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  value={nationalID}
                  onChange={handleNationalIDChange}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">Age</label>
                <Input
                  className="form-control-alternative"
                  type="number"
                  value={age}
                  onChange={handleAgeChange}
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
                  onChange={handleGenderChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" for="dropdown">
                  Relationship:
                </label>
                <br />
                <select
                  id="dropdown"
                  className="form-control-alternative"
                  value={relationship}
                  onChange={handleRelationshipChange}
                >
                  <option value="wife">Wife</option>
                  <option value="husband">Husband</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">
                  Email (Must match the email your family member registered with)
                </label>
                <Input
                  className="form-control-alternative"
                  type="email"
                />
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
                                    <ListGroupItem>Habiba Samir</ListGroupItem>
                                    <ListGroupItem>Shahd Amer</ListGroupItem>
                                    <ListGroupItem>Hana Younis</ListGroupItem>
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
                          onClick={(e) => e.preventDefault()}
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
