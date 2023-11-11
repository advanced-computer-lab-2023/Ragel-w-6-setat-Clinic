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

import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
//to get the route 
import axios from "axios";
//for the route
import { useParams } from 'react-router-dom';
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



  const SubscribedPackage = () => {
    const [packageInfo, setPackageInfo] = useState(null);
    const { id } = useParams();
    console.log(id);
  
    useEffect(() => {
      const fetchPackageInfo = async () => {
        try {
          const response = await axios.get(`/patients/healthStatus/${id}`);
          console.log(response);
    
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // Access the packageInfo array directly
            setPackageInfo(response.data);
    
            // Log the packageInfo array
            console.log(response.data,"hello");
          } else {
            // Handle other response status codes
            console.error(`Unexpected response status: ${response.status}`);
          }
        } catch (error) {
          // Handle 404 error
          if (error.response && error.response.status === 404) {
            console.log("Patient not found or has no subscribed package");
          } else {
            console.error("An error occurred:", error);
          }
        }
      };
    
      fetchPackageInfo();
    }, [id]);
    
    
    return (
      <>
        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
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
                        className="text-uppercase mb-0"
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
                        {packageInfo ? (
                          packageInfo.map((package1) => (
                            // Check if package1 and its properties are defined
                            package1 && package1.packageName ? (
                              <div key={package1.packageName}>
                              <p>Package Name: {package1.packageName}</p>
                              <p>Status: {package1.subscriptionStatus}</p>
                              <p>Renewal Date: {package1.renewalDate=== null? 'Not determined': package1.renewalDate}</p>
                              <p>Cancellation Date: {package1.cancellationDate === null ? 'Not Determined' : package1.cancellationDate}</p>
                            </div>
                            ) : null
                          ))
                        ) : (
                          <div>No subscribed packages found</div>
                        )}
                      </span>
                    </div>
                  </Row>
                  {/* ... */}
                  <Button style={{ backgroundColor: "#F8F6F4" }}>Cancel</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
   };  
  
  
  export default SubscribedPackage;