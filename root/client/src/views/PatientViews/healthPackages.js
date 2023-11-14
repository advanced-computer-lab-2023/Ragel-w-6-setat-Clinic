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

  const subscribeToPackageCreditCard = async (packageId) => {
    try {
      // extracting relevant information
      const selectedPackage = healthPackages.find(
        (packageInfo) => packageInfo._id === packageId
      );
      const { name, price } = selectedPackage;

      const items = [
        {
          name: name,
          price: price,
          quantity: 1,
          forAppointments: false,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: false,
      };
      const response2 = await axios.patch(
        `/patients/subscribeHealthPackage/${user._id}/${packageId}`
      );
      console.log("Subscription successful:", response2.data.message);

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      } else {
        const error = await response.json();
        console.log(error);
        alert("Error processing payment: " + error.message);
      }

      // alert("Subscription successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error subscribing to the package: " + error.response.data.message);
    }
  };

  const subscribeToPackageWallet = async (packageId) => {
    try {
      // extracting relevant information
      const selectedPackage = healthPackages.find(
        (packageInfo) => packageInfo._id === packageId
      );
      const { name, price } = selectedPackage;

      const items = {
        name: name,
        price: price,
        quantity: 1,
        forAppointments: false,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: false,
      };

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );

      const response2 = await axios.patch(
        `/patients/subscribeHealthPackage/${user._id}/${packageId}`
      );
      console.log("Subscription successful:", response2.data.message);

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

  const subscribeToFamilyMemberWallet = async (packageId, index) => {
    try {
      // extracting relevant information
      const selectedPackage = healthPackages.find(
        (packageInfo) => packageInfo._id === packageId
      );
      const { name, price } = selectedPackage;

      const items = {
        name: name,
        price: price,
        quantity: 1,
        forAppointments: false,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: familyMemberEmails[index],
        forAppointments: false,
      };

      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );

      const response2 = await axios.patch(
        `/patients/subscribeHealthPackageForFamilyMember/${user._id}/${packageId}`,
        {
          email: familyMemberEmails[index],
        }
      );
      console.log("Subscription successful:", response2.data.message);

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

  const subscribeToFamilyMemberCreditCard = async (packageId, index) => {
    try {
      // extracting relevant information
      const selectedPackage = healthPackages.find(
        (packageInfo) => packageInfo._id === packageId
      );
      const { name, price } = selectedPackage;

      const items = [
        {
          name: name,
          price: price,
          quantity: 1,
          forAppointments: false,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: familyMemberEmails[index],
        forAppointments: false,
      };
      const response2 = await axios.patch(
        `/patients/subscribeHealthPackageForFamilyMember/${user._id}/${packageId}`,
        {
          email: familyMemberEmails[index],
        }
      );
      console.log("Subscription successful:", response2.data.message);
      const response = await axios.post(
        `/patients/processPayment/${user._id}`,
        {
          paymentData,
        }
      );
      if (response.data) {
        window.location.href = response.data.url;
      } else {
        const error = await response.json();
        console.log(error);
        alert("Error processing payment: " + error.message);
      }
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
      alert("Error subscribing to the package: " + error.response.data.message);
    }
  };

  const handleSubscribeFamilyMemberCreditCard = (packageId, index) => {
    if (familyMemberEmails[index]) {
      subscribeToFamilyMemberCreditCard(packageId, index);
    } else {
      alert("Please provide the family member's email.");
    }
  };

  const handleSubscribeFamilyMemberWallet = (packageId, index) => {
    if (familyMemberEmails[index]) {
      subscribeToFamilyMemberWallet(packageId, index);
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
                    onClick={() => subscribeToPackageWallet(packageInfo._id)}
                    style={{ backgroundColor: "#F8F6F4" }}
                  >
                    Subscribe With Wallet
                  </Button>
                  <Button
                    className="mt-2"
                    onClick={() =>
                      subscribeToPackageCreditCard(packageInfo._id)
                    }
                    style={{ backgroundColor: "#F8F6F4" }}
                  >
                    Subscribe With Credit Card
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
                            marginTop: "5px",
                            backgroundColor: "#435585",
                          }}
                          color="primary"
                          href="#pablo"
                          onClick={() =>
                            handleSubscribeFamilyMemberWallet(
                              packageInfo._id,
                              index
                            )
                          }
                          size="sm"
                        >
                          Subscribe With Wallet
                        </Button>
                        <Button
                          style={{
                            marginTop: "5px",
                            backgroundColor: "#435585",
                          }}
                          color="primary"
                          href="#pablo"
                          onClick={() =>
                            handleSubscribeFamilyMemberCreditCard(
                              packageInfo._id,
                              index
                            )
                          }
                          size="sm"
                        >
                          Subscribe With Credit Card
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
