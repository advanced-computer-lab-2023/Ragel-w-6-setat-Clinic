import React, { useState, useEffect } from "react";
import axios from "axios";

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
  Label,
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const FamilyMemberList = () => {
  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [visible2, setVisible2] = useState(false);
  const onDismiss2 = () => setVisible2(false);
  const [alertMessage2, setAlertMessage2] = useState("");
  const [alertColor2, setAlertColor2] = useState("danger");

  const [familyMembers, setFamilyMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [relationship, setRelationship] = useState("Wife");

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(
          `/patients/familyMembers/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setFamilyMembers(json.patientFamily);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchFamilyMembers();
    // eslint-disable-next-line
  }, []);

  const handleAddFamilyMember = async () => {
    try {
      const response = await axios.post(
        `/patients/addFamilyMember/${user.user._id}`,
        {
          fName,
          lName,
          nationalID,
          dateOfBirth,
          gender,
          relationship,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setFamilyMembers(response.data.familyMembers);
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
      }
      setFirstName("");
      setLastName("");
      setNationalID("");
      setDateOfBirth("");
      setGender("");
      setRelationship("");
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const handleLinkFamilyMember = async () => {
    try {
      const response = await axios.post(
        `/patients/linkFamilyMember/${user.user._id}`,
        {
          email,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setFamilyMembers(response.data.familyMembers);
        setAlertMessage2(response.data.message);
        setAlertColor2("success");
        setVisible2(true);
      }
      setEmail("");
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage2(error.response.data.message);
        setAlertColor2("danger");
        setVisible2(true);
      }
      console.error("An error occurred:", error.response.data.message);
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <Container className="mt-5" fluid>
        <Row>
          <Col xl="6">
            <Container fluid>
              <Row>
                {familyMembers.map((familyMember, index) => (
                  <Col className="order-xl-6 mb-4" xl="6">
                    <Card
                      className="card-profile shadow"
                      style={{ backgroundColor: "#EEF5FF" }}
                    >
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                id="tooltip1"
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
                              target="tooltip1"
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
                            {familyMember.fName} {familyMember.lName}{" "}
                            <span className="font-weight-light">
                              , {calculateAge(familyMember.dateOfBirth)}
                            </span>
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
                      <Button
                        color="secondary"
                        onClick={handleAddFamilyMember}
                        size="sm"
                      >
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
                            <Label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Gender:
                            </Label>
                            <br />
                            <Input
                              name="select"
                              type="select"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
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
                            <Input
                              name="select"
                              type="select"
                              value={relationship}
                              onChange={(e) => setRelationship(e.target.value)}
                            >
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
                    <Alert
                      className="mt-3"
                      color={alertColor}
                      isOpen={visible}
                      toggle={onDismiss}
                    >
                      {alertMessage}
                    </Alert>
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
                            <Label
                              className="form-control-label"
                              style={{ color: "#f7fafc" }}
                            >
                              Email
                              <div
                                className="h5 font-weight-300"
                                style={{ color: "#f7fafc" }}
                              >
                                (Must match the email your family member
                                registered with)
                              </div>
                            </Label>
                            <Input
                              className="form-control-alternative"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <Button
                            color="secondary"
                            onClick={handleLinkFamilyMember}
                            size="sm"
                          >
                            Link Family Member
                          </Button>
                        </Col>
                      </Row>
                      <Alert
                        className="mt-3"
                        color={alertColor2}
                        isOpen={visible2}
                        toggle={onDismiss2}
                      >
                        {alertMessage2}
                      </Alert>
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
