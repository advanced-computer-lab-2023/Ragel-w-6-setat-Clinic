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
import axios from "axios";
import { useState, useContext, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

//contexts to use
import { UserContext } from "../../contexts/UserContext";

const SubscribedPackage = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const { user } = useContext(UserContext);

  const [packageDetails, setPackageDetails] = useState(null);
  const [familyPackageDetails, setFamilyPackageDetails] = useState(null);

  useEffect(() => {
    const fetchSubscribedPackage = async () => {
      try {
        const response = await fetch(`/patients/healthPackages/${user._id}`);
        const json = await response.json();
        console.log(json);

        if (response.ok) {
          setPackageDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSubscribedPackage();
  }, []);

  useEffect(() => {
    const fetchFamilySubscribedPackage = async () => {
      try {
        const response = await fetch(
          `/patients/familyMembersHealthPackages/${user._id}`
        );
        const json = await response.json();
        console.log(json);

        if (response.ok) {
          setFamilyPackageDetails(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchFamilySubscribedPackage();
  }, []);

  const cancelMyHealthPackage = async () => {
    try {
      const response = await axios.patch(
        `/patients/cancelHealthPackage/${user._id}/`
      );
      // If the subscription was successful, you may want to update the UI or take additional actions.
      console.log("Cancellation successful:", response.data.message);
      alert("Cancellation successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error cancelling the package:",
        error.response.data.message
      );
      alert("Error cancelling to the package: " + error.response.data.message);
    }
  };

  const cancelFamilyHealthPackage = async (patientId) => {
    try {
      const response = await axios.patch(
        `/patients/cancelHealthPackage/${patientId}/`
      );
      // If the subscription was successful, you may want to update the UI or take additional actions.
      console.log("Cancellation successful:", response.data.message);
      alert("Cancellation successful: " + response.data.message);
    } catch (error) {
      // If there was an error in the subscription process, you can handle it accordingly.
      console.error(
        "Error cancelling the package:",
        error.response.data.message
      );
      alert("Error cancelling to the package: " + error.response.data.message);
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
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="6" xl="3">
            <Card
              className="card-stats mb-4 mb-xl-0"
              style={{
                width: "18rem",
                backgroundColor: "#435585",
              }}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase  mb-0"
                      style={{
                        color: "white",
                      }}
                    >
                      My Package
                    </CardTitle>
                    <span
                      className="h2 font-weight-bold mb-0"
                      style={{
                        color: "white",
                      }}
                    >
                      {packageDetails
                        ? packageDetails.packageName + " Package"
                        : ""}
                    </span>
                  </div>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span
                    className="text-nowrap"
                    style={{
                      color: "white",
                    }}
                  >
                    {packageDetails ? (
                      <div key={packageDetails.packageId}>
                        Package Name: {packageDetails.packageName} <br />
                        Status: {packageDetails.subscriptionStatus} <br />
                        Renewal Date:{" "}
                        {packageDetails.renewalDate === null
                          ? "Not determined"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(new Date(packageDetails.renewalDate))}
                        <br />
                        Cancellation Date:{" "}
                        {packageDetails.cancellationDate === null
                          ? "Not Determined"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(
                              new Date(packageDetails.cancellationDate)
                            )}{" "}
                      </div>
                    ) : (
                      <div>No subscribed packages found</div>
                    )}
                  </span>
                </p>
                {packageDetails ? (
                  <Button
                    style={{ backgroundColor: "#F8F6F4" }}
                    type="button"
                    onClick={cancelMyHealthPackage}
                  >
                    Cancel
                  </Button>
                ) : (
                  ""
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {familyPackageDetails ? (
            familyPackageDetails.map((familyPackage, index) => (
              <Col lg="6" xl="3" key={index} className="mt-4 mr-4">
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  style={{
                    width: "18rem",
                    backgroundColor: "#435585",
                  }}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase  mb-0"
                          style={{
                            color: "white",
                          }}
                        >
                          {`${familyPackage.fName} ${familyPackage.lName} Package`}
                        </CardTitle>
                        <span
                          className="h2 font-weight-bold mb-0"
                          style={{
                            color: "white",
                          }}
                        >
                          {`${familyPackage.subscribedPackage.packageName} Package`}
                        </span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-nowrap"
                        style={{
                          color: "white",
                        }}
                      >
                        {`Package Name: ${familyPackage.subscribedPackage.packageName}`}
                        <br />
                        {` Status: ${familyPackage.subscribedPackage.subscriptionStatus}`}
                        <br />
                        Renewal Date:{" "}
                        {familyPackage.subscribedPackage.renewalDate === null
                          ? "Not determined"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(
                              new Date(
                                familyPackage.subscribedPackage.renewalDate
                              )
                            )}
                        <br />
                        Cancellation Date:{" "}
                        {familyPackage.subscribedPackage.cancellationDate ===
                        null
                          ? "Not Determined"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(
                              new Date(
                                familyPackage.subscribedPackage.cancellationDate
                              )
                            )}
                      </span>
                    </p>

                    <Button
                      style={{ backgroundColor: "#F8F6F4" }}
                      type="button"
                      onClick={() =>
                        cancelFamilyHealthPackage(familyPackage.familyMemberId)
                      }
                    >
                      Cancel
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col lg="6" xl="3" className="mt-4">
              <Card
                body
                className="card-stats mb-4 mb-xl-0"
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
                  No Registered Packages for Family Members
                </CardTitle>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SubscribedPackage;
