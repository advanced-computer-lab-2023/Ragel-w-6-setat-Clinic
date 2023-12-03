//components
import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";
import React, { useState ,useContext,useEffect } from "react";
import axios from "axios";

const FamilyMemberList = () => {
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
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="6">
            <Container fluid>
              <Row>
              {familyMembers.map((familyMember, index) => (
                <Col key={index} className="order-xl-6 mb-4" xl="6">
                  <Card
                    className="card-profile shadow"
                    style={{ backgroundColor: "#EEF5FF" }}
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              id={`tooltip${index + 1}`}
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/brand/patienticonf.png")}
                              style={{
                                height: "70px",
                                width: "70px",
                                background: "#EEF5FF",
                              }}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target={`tooltip${index + 1}`}
                            style={{ backgroundColor: "#0C356A" }}
                          >
                            Click to view profile
                          </UncontrolledTooltip>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader
                      className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                      style={{ backgroundColor: "#EEF5FF" }}
                    ></CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <div className="text-center">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {familyMember.relationship}
                        </div>
                        <h3>
                          {familyMember.fName} {familyMember.lName}
                          <span className="font-weight-light">, {familyMember.age}</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Linked: {familyMember.email ? "Yes" : "No"}
                        </div>
                      </div>{" "}
                    </CardBody>
                  </Card>
                </Col>
              ))}
              </Row>
            </Container>
          </Col>
          <Col xl="6">
            <Container fluid>
              <Card className="bg-secondary shadow shadow w-100">
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="8"></Col>
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo"  onClick={handleAddFamilyMember} size="sm">
                        Add Family Member
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#0C356A" }}>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Family Member Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
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
                              style={{ color: "#f7fafc" }}
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
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
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
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
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
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Gender:
                            </label>
                            <br />
                            <Input name="select" type="select" id="dropdown"
                            className="form-control-alternative"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Relationaship:
                            </label>
                            <br />
                            <Input name="select" type="select"  id="dropdown"
                            className="form-control-alternative"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}>
                              <option value="wife">Wife</option>
                              <option value="husband">Husband</option>
                              <option value="child">Child</option>
                              <option value="sibling">Sibling</option>
                              <option value="parent">Parent</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr
                      className="my-4"
                      style={{ backgroundColor: "#f7fafc" }}
                    />
                    <h6 className="heading-small text-muted mb-4">
                      Is your family member a registered patient? Link their
                      account with yours!
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Email (Must match the email your family member
                              registered with)
                            </label>
                             <Input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <Button color="secondary" href="#pablo" 
                           onClick={handleLinkFamilyMember}
                           size="sm">
                            Link Family Member
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FamilyMemberList;
