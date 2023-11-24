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
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import { Card, CardTitle, CardBody, Container, Row, Col } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import { UserContext } from "../../contexts/UserContext";

const Wallet = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const { user } = useContext(UserContext);

  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch(`/doctors/myWalletAmount/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setWalletAmount(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Server Error");
      }
    };

    fetchWallet();
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
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Wallet Amount
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {walletAmount}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                      <i className="fas fa-percent" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          ;
        </Row>
      </Container>
    </>
  );
};

export default Wallet;
