import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Paper,
  Tabs,
  Switch,
  Slide,
  FormControlLabel,
} from "@mui/material";

import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  Button,
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const HealthPackagesManagement = () => {
  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [checked, setChecked] = useState(false);
  const handleChangeChecked = () => {
    setVisible(false);
    setChecked((prev) => !prev);
  };

  const [editableIndex, setEditableIndex] = useState(null);

  const [healthPackages, setHealthPackages] = useState([]);
  const [updatedPackage, setUpdatedPackage] = useState({
    name: "",
    description: "",
    price: "",
    sessionDiscount: "",
    medicineDiscount: "",
    subscriptionDiscount: "",
  });
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState(0);
  const [packageSessionDiscount, setPackageSessionDiscount] = useState(0);
  const [packageMedicineDiscount, setPackageMedicineDiscount] = useState(0);
  const [packageSubscriptionDiscount, setPackageSubscriptionDiscount] =
    useState(0);
  const [packageDescription, setPackageDescription] = useState("");

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch(
          `/admins/getAllPackages/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setHealthPackages(json);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchHealthPackages();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPackage((prevPackage) => ({
      ...prevPackage,
      [name]: value,
    }));
  };

  const addPackage = async () => {
    try {
      if (
        !packageName ||
        !packagePrice ||
        !packageDescription ||
        !packageSessionDiscount ||
        !packageMedicineDiscount ||
        !packageSubscriptionDiscount
      ) {
        setVisible(true);
        setAlertMessage(`Please complete all the form`);
        setAlertColor("danger");
        return;
      }
      const response = await axios.post(
        `/admins/packageManagement/${user.user._id}`,
        {
          name: packageName,
          price: packagePrice,
          description: packageDescription,
          sessionDiscount: packageSessionDiscount,
          medicineDiscount: packageMedicineDiscount,
          subscriptionDiscount: packageSubscriptionDiscount,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setHealthPackages(response.data.packages);
        setAlertMessage(response.data.message);
        setVisible(true);
        setAlertColor("success");
      }
      setPackageName("");
      setPackagePrice(0);
      setPackageSessionDiscount(0);
      setPackageMedicineDiscount(0);
      setPackageSubscriptionDiscount(0);
      setPackageDescription("");
    } catch (error) {
      console.error(error.response.data.message);
      setPackageName("");
      setPackagePrice(0);
      setPackageSessionDiscount(0);
      setPackageMedicineDiscount(0);
      setPackageSubscriptionDiscount(0);
      setPackageDescription("");
    }
  };

  const deletePackage = async (packageId) => {
    try {
      const response = await axios.delete(
        `/admins/packageManagement/${user.user._id}/${packageId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.status === 200) {
        setHealthPackages(
          healthPackages.filter(
            (healthPackage) => healthPackage._id !== packageId
          )
        );
        setValue((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setUpdatedPackage(healthPackages[index]);
  };

  const handleDone = async () => {
    setEditableIndex(null);
    try {
      const response = await axios.patch(
        `/admins/packageManagement/${user.user._id}/${updatedPackage._id}`,
        updatedPackage,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setHealthPackages(response.data.packages);
      }
    } catch (error) {
      console.error(
        "An error occurred while updating the package:",
        error.response.data.message
      );
    }
  };

  const packageForm = (
    <Paper elevation={4} className="mb-5">
      <Card className="bg-secondary shadow">
        <CardHeader
          className=" border-0"
          style={{ backgroundColor: "#0C356A" }}
        >
          <Row className="align-items-center">
            <Col>
              <h3 style={{ color: "#f7fafc" }}>Add a New Health Package</h3>
            </Col>
            <Col className="text-right">
              <Button
                style={{ backgroundColor: "#f7fafc", color: "#0C356A" }}
                size="sm"
                onClick={addPackage}
              >
                Add Package
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody style={{ backgroundColor: "#eef5ff" }}>
          <Form>
            <h6 className="heading-small mb-4" style={{ color: "#0C356A" }}>
              Health Package Information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label
                      style={{ color: "#0C356A" }}
                      className="form-control-label"
                    >
                      Name
                    </Label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label
                      className="form-control-label"
                      style={{ color: "#0C356A" }}
                    >
                      Price
                    </Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      value={packagePrice}
                      onChange={(e) => setPackagePrice(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <Label
                      className="form-control-label"
                      style={{ color: "#0C356A" }}
                    >
                      Session Discount
                    </Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      value={packageSessionDiscount}
                      onChange={(e) =>
                        setPackageSessionDiscount(e.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Label
                      className="form-control-label"
                      style={{ color: "#0C356A" }}
                    >
                      Medicine Discount
                    </Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      value={packageMedicineDiscount}
                      onChange={(e) =>
                        setPackageMedicineDiscount(e.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Label
                      className="form-control-label"
                      style={{ color: "#0C356A" }}
                    >
                      Subscription Discount
                    </Label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      value={packageSubscriptionDiscount}
                      onChange={(e) =>
                        setPackageSubscriptionDiscount(e.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <Label
                      className="form-control-label"
                      style={{ color: "#0C356A" }}
                    >
                      Description
                    </Label>
                    <Input
                      className="form-control-alternative"
                      rows="4"
                      type="textarea"
                      value={packageDescription}
                      onChange={(e) => setPackageDescription(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
          <Alert
            className="mt-3"
            color={alertColor}
            isOpen={visible}
            toggle={onDismiss}
          >
            {alertMessage}
          </Alert>
        </CardBody>
      </Card>
    </Paper>
  );

  return (
    <Container
      className="mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      fluid
    >
      <Row>
        <Col>
          <Box sx={{ maxWidth: { xs: 330, sm: 880 }, bgcolor: "#f7fafc" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ backgroundColor: "#eef5ff" }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {healthPackages.map((healthPackage, index) => (
                <Tab
                  style={{ color: "#0C356A" }}
                  key={index}
                  label={`Package ${index + 1}`}
                />
              ))}
            </Tabs>

            <Box>
              {healthPackages.map((healthPackage, index) => (
                <div key={index} hidden={value !== index}>
                  <Card
                    className="my-2"
                    inverse
                    style={{
                      width: "40rem",
                      backgroundColor: "#0C356A",
                    }}
                  >
                    <CardHeader
                      style={{ color: "#0C356A", backgroundColor: "#eef5ff" }}
                    >
                      <Row>
                        <Col>
                          {" "}
                          <h3>{healthPackage.name} Package</h3>
                        </Col>
                        <Col className="text-right">
                          {editableIndex === index ? (
                            <>
                              <Button
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                onClick={handleDone}
                                size="sm"
                              >
                                Done
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                onClick={() => deletePackage(healthPackage._id)}
                                size="sm"
                              >
                                Delete Package
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: "#0C356A",
                                  color: "#f7fafc",
                                }}
                                onClick={() => handleEdit(index)}
                                size="sm"
                              >
                                Update Package
                              </Button>
                            </>
                          )}
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h5" style={{ color: "#f7fafc" }}>
                        Package Details
                      </CardTitle>
                      <CardText>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "#f7fafc",
                                  }}
                                >
                                  Package Name
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  type="text"
                                  value={
                                    editableIndex === index
                                      ? updatedPackage.name
                                      : healthPackage.name
                                  }
                                  onChange={handleInputChange}
                                  name="name"
                                  readOnly={editableIndex !== index}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "#f7fafc",
                                  }}
                                >
                                  Package Price
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  value={
                                    editableIndex === index
                                      ? updatedPackage.price
                                      : healthPackage.price
                                  }
                                  onChange={handleInputChange}
                                  name="price"
                                  readOnly={editableIndex !== index}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="4">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  Session Discount
                                </Label>

                                <InputGroup className="mb-4">
                                  <InputGroupAddon
                                    addonType="prepend"
                                    className=""
                                  >
                                    <InputGroupText>
                                      <i class="fa-solid fa-percent"></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    className="form-control-alternative"
                                    value={
                                      editableIndex === index
                                        ? ` ${updatedPackage.sessionDiscount}`
                                        : ` ${healthPackage.sessionDiscount}`
                                    }
                                    onChange={handleInputChange}
                                    name="sessionDiscount"
                                    readOnly={editableIndex !== index}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  Medicine Discount
                                </Label>

                                <InputGroup className="mb-4">
                                  <InputGroupAddon
                                    addonType="prepend"
                                    className=""
                                  >
                                    <InputGroupText>
                                      <i class="fa-solid fa-percent"></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    className="form-control-alternative"
                                    value={
                                      editableIndex === index
                                        ? ` ${updatedPackage.medicineDiscount}`
                                        : ` ${healthPackage.medicineDiscount}`
                                    }
                                    onChange={handleInputChange}
                                    name="medicineDiscount"
                                    readOnly={editableIndex !== index}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "#f7fafc",
                                  }}
                                >
                                  Subscription Discount
                                </Label>

                                <InputGroup className="mb-4">
                                  <InputGroupAddon
                                    addonType="prepend"
                                    className=""
                                  >
                                    <InputGroupText>
                                      <i class="fa-solid fa-percent"></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    className="form-control-alternative"
                                    value={
                                      editableIndex === index
                                        ? ` ${updatedPackage.subscriptionDiscount}`
                                        : ` ${healthPackage.subscriptionDiscount}`
                                    }
                                    onChange={handleInputChange}
                                    name="subscriptionDiscount"
                                    readOnly={editableIndex !== index}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  style={{
                                    color: "#f7fafc",
                                  }}
                                >
                                  Package Description
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  type="textarea"
                                  rows="3"
                                  value={
                                    editableIndex === index
                                      ? updatedPackage.description
                                      : healthPackage.description
                                  }
                                  onChange={handleInputChange}
                                  name="description"
                                  readOnly={editableIndex !== index}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </Box>
          </Box>
        </Col>
        <Col>
          <Box>
            <FormControlLabel
              control={
                <Switch checked={checked} onChange={handleChangeChecked} />
              }
              label="Slide to view health package form"
              style={{ color: "#0C356A", fontWeight: "bold" }}
            />
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              {packageForm}
            </Slide>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthPackagesManagement;
