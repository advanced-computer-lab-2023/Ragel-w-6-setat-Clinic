// reactstrap components




import React, { useState, useContext} from "react";
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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {UserContext} from "../../contexts/UserContext.js";


  
const HealthPackages = () => {
  const user = useContext(UserContext);
  const [packages, setPackages] = useState([
    {
      packageName: "",
      subscriptionStatus: "Not Subscribed",
      renewalDate: null,
      cancellationDate: null,
    },
    // Add more packages as needed
  ]);

  const handleSubscription = async (index) => {
    try {
      // Update the array dynamically based on the subscription action
      const updatedPackages = [...packages];
      updatedPackages[index] = {
        ...updatedPackages[index],
        subscriptionStatus: "Subscribed",
        renewalDate: "2023-12-01", // Update with your logic for renewal date
      };
      console.log(updatedPackages);
      setPackages(updatedPackages);

      // Call the backend API
      const response = await axios.post(`patients/subscribe/${user._id}`, {
        packages: updatedPackages,
      });

      if (response.status === 200) {
        console.log('Subscription successful');
        // You can add additional logic or redirection here
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during subscription:', error);
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
          {/* Gold Package */}
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
                Gold Package
              </CardTitle>
              <CardText
                style={{
                  color: "white",
                }}
              >
                patient pays 6000 LE per year and gets 60% off any doctor's
                session price and 30% off any medicin ordered from pharmacy
                platform and 15% discount on the subscription of any of his
                family members in any package
              </CardText>
              <Button style={{ backgroundColor: "#F8F6F4" }}>Subscribe</Button>
            </Card>
          </Col>
  
          {/* Silver Package (Hard-coded) */}
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
                Silver Package
              </CardTitle>
              <CardText
                style={{
                  color: "white",
                }}
              >
                patient pays 4000 LE per year and gets 40% off any doctor's
                session price and 20% off any medicin ordered from pharmacy
                platform and 10% discount on the subscription of any of his
                family members in any package
              </CardText>
              <Button style={{ backgroundColor: "#F8F6F4" }}>Subscribe</Button>
            </Card>
          </Col>
  
          {/* Platinum Package (Hard-coded) */}
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
                Platinum Package
              </CardTitle>
              <CardText
                style={{
                  color: "white",
                }}
              >
                patient pays 2000 LE per year and gets 20% off any doctor's
                session price and 10% off any medicin ordered from pharmacy
                platform and 5% discount on the subscription of any of his
                family members in any package
              </CardText>
              <Button
              style={{ backgroundColor: "#F8F6F4" }}
              onClick={() => handleSubscription('Platinum Package', { /* package details */ })}
            >
              Subscribe
            </Button>
            </Card>
          </Col>  
        </Row>
      </Container>
    </>

  );
};

export default HealthPackages;
