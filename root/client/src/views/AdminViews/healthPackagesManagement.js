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
  CardTitle,
  CardText,
  CardLink,
  Label,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { UserContext } from "../../contexts/UserContext";
import { HealthPackagesContext } from "../../contexts/HealthPackagesContext";

const ManageHealthPackages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { user } = useContext(UserContext);
  const { healthPackages, setHealthPackages } = useContext(
    HealthPackagesContext
  );

  const [editableIndex, setEditableIndex] = useState(null);
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
        const response = await fetch(`/admins/getAllPackages/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setHealthPackages(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchHealthPackages();
  }, [healthPackages]);

  const addPackage = async () => {
    try {
      const response = await axios.post(
        `/admins/packageManagement/${user._id}`,
        {
          name: packageName,
          price: packagePrice,
          description: packageDescription,
          sessionDiscount: packageSessionDiscount,
          medicineDiscount: packageMedicineDiscount,
          subscriptionDiscount: packageSubscriptionDiscount,
        }
      );

      alert(response.data.message);
      setPackageName("");
      setPackagePrice(0);
      setPackageSessionDiscount(0);
      setPackageMedicineDiscount(0);
      setPackageSubscriptionDiscount(0);
      setPackageDescription("");
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert("Please make sure to fill in the blanks");
    }
  };

  const deletePackage = async (packageId) => {
    try {
      const response = await axios.delete(
        `/admins/packageManagement/${user._id}/${packageId}`
      );
      alert(response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(error.response.data.message);
      alert("Failed: " + error.response.data.message);
    }
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setUpdatedPackage(healthPackages[index]);
  };

  const handleDone = async () => {
    setEditableIndex(null); // Set editableIndex to null to exit edit mode

    try {
      // Call your API to update the package using the updatedPackage data
      await axios.patch(
        `/admins/packageManagement/${user._id}/${updatedPackage._id}`,
        updatedPackage
      );

      // Provide user feedback about the successful update
      alert("Package updated successfully");
    } catch (error) {
      // Handle errors appropriately
      console.error("An error occurred while updating the package:", error);
      // You may want to provide user feedback about the update failure
      alert("Failed to update package. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPackage((prevPackage) => ({
      ...prevPackage,
      [name]: value,
    }));
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
                      onClick={addPackage}
                      size="sm"
                    >
                      Add Package
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Health Package Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Name</label>
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
                          <label className="form-control-label">Price</label>
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
                          <label className="form-control-label">
                            Session Discount
                          </label>
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
                          <label className="form-control-label">
                            Medicine Discount
                          </label>
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
                          <label className="form-control-label">
                            Subscription Discount
                          </label>
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
                          <label>Description</label>
                          <Input
                            className="form-control-alternative"
                            rows="4"
                            type="textarea"
                            value={packageDescription}
                            onChange={(e) =>
                              setPackageDescription(e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* packages */}
                </Form>
                <Row>
                  {healthPackages
                    ? healthPackages.map((healthPackage, index) => (
                        <Card
                          style={{
                            width: "18rem",
                            backgroundColor: "#435585",
                          }}
                          className="mt-3 mr-3"
                        >
                          <CardBody>
                            <CardText
                              style={{
                                color: "white",
                              }}
                            >
                              <FormGroup>
                                <Label for="exampleText">
                                  Package Description
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  type="textarea"
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
                            </CardText>
                          </CardBody>
                          <ListGroup flush contentEditable={false}>
                            <ListGroupItem
                              style={{
                                backgroundColor: "#435585",
                                color: "white",
                              }}
                            >
                              <label
                                className="form-control-label"
                                style={{
                                  color: "white",
                                }}
                              >
                                Package Name
                              </label>
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
                            </ListGroupItem>
                            <ListGroupItem
                              style={{
                                backgroundColor: "#435585",
                                color: "white",
                              }}
                            >
                              <label
                                className="form-control-label"
                                style={{
                                  color: "white",
                                }}
                              >
                                Package Price
                              </label>
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
                            </ListGroupItem>
                            <ListGroupItem
                              style={{
                                backgroundColor: "#435585",
                                color: "white",
                              }}
                            >
                              <label
                                className="form-control-label"
                                style={{
                                  color: "white",
                                }}
                              >
                                Session Discount
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={
                                  editableIndex === index
                                    ? updatedPackage.sessionDiscount
                                    : healthPackage.sessionDiscount
                                }
                                onChange={handleInputChange}
                                name="sessionDiscount"
                                readOnly={editableIndex !== index}
                              />
                            </ListGroupItem>
                            <ListGroupItem
                              style={{
                                backgroundColor: "#435585",
                                color: "white",
                              }}
                            >
                              <label
                                className="form-control-label"
                                style={{
                                  color: "white",
                                }}
                              >
                                Medicine Discount
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={
                                  editableIndex === index
                                    ? updatedPackage.medicineDiscount
                                    : healthPackage.medicineDiscount
                                }
                                onChange={handleInputChange}
                                name="medicineDiscount"
                                readOnly={editableIndex !== index}
                              />
                            </ListGroupItem>
                            <ListGroupItem
                              style={{
                                backgroundColor: "#435585",
                                color: "white",
                              }}
                            >
                              <label
                                className="form-control-label"
                                style={{
                                  color: "white",
                                }}
                              >
                                Subscription Discount
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={
                                  editableIndex === index
                                    ? updatedPackage.subscriptionDiscount
                                    : healthPackage.subscriptionDiscount
                                }
                                onChange={handleInputChange}
                                name="subscriptionDiscount"
                                readOnly={editableIndex !== index}
                              />
                            </ListGroupItem>
                          </ListGroup>
                          <CardBody>
                            {editableIndex === index ? (
                              <>
                                <Button
                                  style={{ backgroundColor: "#F8F6F4" }}
                                  onClick={handleDone}
                                  size="sm"
                                >
                                  Done
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  style={{ backgroundColor: "#F8F6F4" }}
                                  onClick={() =>
                                    deletePackage(healthPackage._id)
                                  }
                                  size="sm"
                                >
                                  Delete Package
                                </Button>
                                <Button
                                  style={{ backgroundColor: "#F8F6F4" }}
                                  onClick={() => handleEdit(index)}
                                  size="sm"
                                >
                                  Update Package
                                </Button>
                              </>
                            )}
                          </CardBody>
                        </Card>
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

export default ManageHealthPackages;
