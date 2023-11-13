// reactstrap components
import React, { useState, useEffect, useContext } from "react";
import ReactDatetime from "react-datetime";
import axios from "axios";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  Alert,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

// contexts
import { UserContext } from "../../contexts/UserContext";
import { HealthPackagesContext } from "../../contexts/HealthPackagesContext";

const HealthPackages = () => {
  //user states
  const { user } = useContext(UserContext);
  const { healthPackages, setHealthPackages } = useContext(
    HealthPackagesContext
  );

  const familyMemberEmailsInitial = healthPackages
    ? Array(healthPackages.length).fill(null)
    : [];

  const [familyMemberEmails, setFamilyMemberEmails] = useState(
    familyMemberEmailsInitial
  );

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch(`/patients/allHealthPackages/${user._id}`);
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

  const subscribeToPackage = async (packageId) => {
    try {
      const response = await axios.patch(
        `/patients/subscribeHealthPackage/${user._id}/${packageId}`
      );
      // If the subscription was successful, you may want to update the UI or take additional actions.
      console.log("Subscription successful:", response.data.message);
      alert("Subscription successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error subscribing to the package: " + error.response.data.message);
    }
  };

  const subscribeToFamilyMember = async (packageId, index) => {
    try {
      const response = await axios.patch(
        `/patients/subscribeHealthPackageForFamilyMember/${user._id}/${packageId}`,
        {
          email: familyMemberEmails[index],
        }
      );
      // If the subscription was successful, you may want to update the UI or take additional actions.
      console.log("Subscription successful:", response.data.message);
      alert("Subscription successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error subscribing to the package: " + error.response.data.message);
    }
  };

  const handleSubscribeFamilyMember = (packageId, index) => {
    if (familyMemberEmails[index]) {
      subscribeToFamilyMember(packageId, index);
    } else {
      alert("Please provide the family member's email.");
    }
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
      </div>
      <Container className="mt--7" fluid>
        <Row>
          {healthPackages ? (
            healthPackages.map((packageInfo, index) => (
              <Col key={index} lg="4">
                <Card
                  body
                  className="my-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "#435585",
                  }}
                >
                  <CardTitle
                    tag="h5"
                    style={{
                      color: "white",
                    }}
                  >
                    {packageInfo.name} Package
                  </CardTitle>
                  <CardText
                    style={{
                      color: "white",
                    }}
                  >
                    {`patient pays ${packageInfo.price} LE per year and gets ${packageInfo.sessionDiscount}% off any doctor's
                  session price and ${packageInfo.medicineDiscount}% off any medicine ordered from the pharmacy
                  platform and ${packageInfo.subscriptionDiscount}% discount on the subscription of any of his
                  family members in any package`}
                  </CardText>
                  <Button
                    onClick={() => subscribeToPackage(packageInfo._id)}
                    style={{ backgroundColor: "#F8F6F4" }}
                  >
                    Subscribe
                  </Button>
                  <Card
                    style={{ marginTop: "20px", backgroundColor: "#F8F6F4" }}
                  >
                    <CardBody>
                      <FormGroup>
                        <label className="form-control-label">
                          Subscribe for Family Member
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="email"
                          placeholder="family member email..."
                          value={familyMemberEmails[index]}
                          onChange={(e) => {
                            const newEmails = [...familyMemberEmails];
                            newEmails[index] = e.target.value;
                            setFamilyMemberEmails(newEmails);
                          }}
                        />
                        <Button
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#435585",
                          }}
                          color="primary"
                          href="#pablo"
                          onClick={() =>
                            handleSubscribeFamilyMember(packageInfo._id, index)
                          }
                          size="sm"
                        >
                          Subscribe
                        </Button>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Card>
              </Col>
            ))
          ) : (
            <Col lg="4">
              <Card
                body
                className="my-2"
                style={{
                  width: "18rem",
                  backgroundColor: "#435585",
                }}
              >
                <CardTitle
                  tag="h5"
                  style={{
                    color: "white",
                  }}
                >
                  No Registered Packages
                </CardTitle>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HealthPackages;
