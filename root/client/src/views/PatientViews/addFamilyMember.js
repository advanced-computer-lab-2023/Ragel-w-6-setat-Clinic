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
// reactstrap components
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
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
import { UserContext } from "../../contexts/UserContext.js";


const AddFamilyMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [searchedFamilyMember, setSearchedFamilyMember] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get(`/patients/familyMembers/${user._id}`);
        setFamilyMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchFamilyMembers();
  }, [user._id]);

  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/patients/familyMember/${user._id}/${searchEmail}`);
      
      if (response.data && response.data.registeredFamilyMembers && response.data.registeredFamilyMembers.length > 0) {
        setSearchedFamilyMember(response.data.registeredFamilyMembers);
        console.log(response.data);
        toggle();
      } else {
        console.log('Family member not found.');
      }
    } catch (error) {
      console.error('Error searching for family member:', error);
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
                      onClick={(e) => e.preventDefault()}
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
                            className="form-control-alternative"
                            type="text"
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
                            className="form-control-alternative"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Age</label>
                          <Input
                            className="form-control-alternative"
                            type="number"
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
                          >
                            <option value="wife">Wife</option>
                            <option value="husband">Husband</option>
                            <option value="son">Son</option>
                            <option value="daughter">Daughter</option>
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
                            value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
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
            {searchedFamilyMember && searchedFamilyMember.length > 0 ? (
              <div>
                <h4>Registered Family Members</h4>
                {searchedFamilyMember.map((familyMember) => (
                  <p key={familyMember.email}>
                    Name: {familyMember.fname} {familyMember.lname}<br />
                  </p>
                ))}
              </div>
            ) : (
              <p>No family members found.</p>
            )}
          </CardBody>
        </Card>
      </Collapse>
                          </React.StrictMode>
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

export default AddFamilyMember;