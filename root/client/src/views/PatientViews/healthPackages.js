// reactstrap components
import React, { useState } from "react";
import ReactDatetime from "react-datetime";
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

const HealthPackages = () => {
  const items = [
    {
      id: 1,
      altText: "Slide 1",
      name: "Gold Package",
      description:
        "patient pays 6000 LE per year and gets 60% off any doctor's session price and 30% off any medicin ordered from pharmacy platform and 15% discount on the subscribtion of any of his family members in any package",
    },
    {
      id: 2,
      altText: "Slide 2",
      name: "Gold Package",
      description:
        "patient pays 6000 LE per year and gets 60% off any doctor's session price and 30% off any medicin ordered from pharmacy platform and 15% discount on the subscribtion of any of his family members in any package",
    },
    {
      id: 3,
      altText: "Slide 3",
      name: "Gold Package",
      description:
        "patient pays 6000 LE per year and gets 60% off any doctor's session price and 30% off any medicin ordered from pharmacy platform and 15% discount on the subscribtion of any of his family members in any package",
    },
  ];

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
          <Col lg="3">
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
                platform and 15% discount on the subscribtion of any of his
                family members in any package
              </CardText>
              <Button style={{ backgroundColor: "#F8F6F4" }}>Subscribe</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HealthPackages;
