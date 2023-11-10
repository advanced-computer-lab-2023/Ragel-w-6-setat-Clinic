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

  useEffect(() => {
    const fetchSubscribedPackage = async () => {
      try {
        const response = await fetch(`/patients/healthPackages/${user._id}`);
        const json = await response.json();
        console.log(json);

        if (response.ok) {
          setPackageDetails(json);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSubscribedPackage();
  }, []);

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
                      Package
                    </CardTitle>
                    <span
                      className="h2 font-weight-bold mb-0"
                      style={{
                        color: "white",
                      }}
                    >
                      {packageDetails ? packageDetails.name : ""} Package
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
                    Status: Subscribed
                  </span>
                </p>
                <Button style={{ backgroundColor: "#F8F6F4" }} type="button">
                  Cancel
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SubscribedPackage;
