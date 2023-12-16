import { useState } from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";

const RegisterDoctor = () => {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [doctorFields, setDoctorFields] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    dateOfBirth: "",
    sessionPrice: "",
    specialty: "",
    affiliation: "",
    hourlyRate: "",
    educationalBackground: "",
    password: "",
  });

  // eslint-disable-next-line
  const [fileID, setFileID] = useState();
  // eslint-disable-next-line
  const [fileMedicalDegree, setFileMedicalDegree] = useState();
  // eslint-disable-next-line
  const [fileMedicalLicense, setFileMedicalLicense] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleDoctorRegister = async () => {
    try {
      // Validate all fields
      for (const key in doctorFields) {
        if (!doctorFields[key]) {
          setVisible(true);
          setAlertMessage(`Please complete all the form`);
          return;
        }
      }
      if (!fileID) {
        setVisible(true);
        setAlertMessage(`Please complete all the form`);
        return;
      }
      if (!fileMedicalDegree) {
        setVisible(true);
        setAlertMessage(`Please complete all the form`);
        return;
      }
      if (!fileMedicalLicense) {
        setVisible(true);
        setAlertMessage(`Please complete all the form`);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(doctorFields.email)) {
        setVisible(true);
        setAlertMessage("Please enter a valid email address");
        return;
      }

      // Validate username format
      const usernameRegex = /^[^\s]+$/;
      if (!usernameRegex.test(doctorFields.username)) {
        setVisible(true);
        setAlertMessage("Username should not contain spaces");
        return;
      }

      const formData = new FormData();
      formData.append("fileID", fileID);
      formData.append("fileMedicalLicense", fileMedicalLicense);
      formData.append("fileMedicalDegree", fileMedicalDegree);

      const requestData = {
        doctorFields: { ...doctorFields },
      };

      formData.append("requestData", JSON.stringify(requestData));

      await axios.post("/registerDoctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.location.href = "`http://localhost:3000/auth/login`";
    } catch (error) {
      console.error("Error registering doctor:", error);
      setVisible(true);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={doctorFields.username}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        name="fName"
                        value={doctorFields.fName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>{" "}
              </Row>

              <Row>
                {" "}
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        name="lName"
                        value={doctorFields.lName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={doctorFields.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Hourly Rate EGP"
                        type="number"
                        name="hourlyRate"
                        value={doctorFields.hourlyRate}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={doctorFields.dateOfBirth}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Session Price"
                        type="number"
                        name="sessionPrice"
                        value={doctorFields.sessionPrice}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Specialty"
                        type="text"
                        name="specialty"
                        value={doctorFields.specialty}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                          <i className="ni ni-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Affiliation"
                        type="text"
                        name="affiliation"
                        value={doctorFields.affiliation}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Educational Background"
                        type="text"
                        name="educationalBackground"
                        value={doctorFields.educationalBackground}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={doctorFields.password}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Personal ID</small>
                  <div className="input-group mb-3">
                    <label className="input-group-text mr-1">Upload</label>
                    <input
                      type="file"
                      onChange={(e) => setFileID(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Meidcal License</small>
                  <div className="input-group mb-3">
                    <label className="input-group-text mr-1">Upload</label>
                    <input
                      type="file"
                      onChange={(e) => setFileMedicalLicense(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <small>Upload Medical Degree</small>
                  <div className="input-group mb-3">
                    <label className="input-group-text mr-1">Upload</label>
                    <input
                      type="file"
                      onChange={(e) => setFileMedicalDegree(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleDoctorRegister}
                >
                  Create account
                </Button>
              </div>
            </Form>
            <Alert
              className="mt-3"
              color="danger"
              isOpen={visible}
              toggle={onDismiss}
            >
              {alertMessage}
            </Alert>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default RegisterDoctor;
