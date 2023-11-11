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

import { useState, useEffect, useContext } from "react";
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
import {UserContext} from "../../contexts/UserContext.js";
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


const SubscribedPackages = () => {
  const { user } = useContext(UserContext);
  const [packageInfo, setPackageInfo] = useState(null);

  useEffect(() => {
    const fetchPackageInfo = async () => {
      try {
        const response = await axios.get(`/patients/healthStatus/${user._id}`);
        if (response.status === 200) {
          setPackageInfo(response.data);
        } else {
          console.error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Patient not found or has no subscribed package");
        } else {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchPackageInfo();
  }, [user._id]);

  return (
    <div>
      <h3>Patient's Subscribed Package</h3>
      {packageInfo ? (
        <>
          {packageInfo.patientPackage.map((package1) => (
            <div key={package1.packageName}>
              <p>Package Name: {package1.packageName}</p>
              <p>Status: {package1.subscriptionStatus}</p>
              <p>
                Renewal Date:{" "}
                {package1.renewalDate === null ? "Not determined" : package1.renewalDate}
              </p>
              <p>
                Cancellation Date:{" "}
                {package1.cancellationDate === null
                  ? "Not Determined"
                  : package1.cancellationDate}
              </p>
            </div>
          ))}
                 <Button style={{ backgroundColor: "#F8F6F4" }}>Cancel</Button>
        </>
      ) : (
        <div>No subscribed packages found</div>
      )}

      <h3>Family Members' Subscribed Packages</h3>
      {packageInfo ? (
        <>
          {packageInfo.familyMembersPackages.map((familyMemberPackage) => (
            <div key={familyMemberPackage.packageName}>
              <p>Package Name: {familyMemberPackage.packageName}</p>
              <p>Status: {familyMemberPackage.subscriptionStatus}</p>
              <p>
                Renewal Date:{" "}
                {familyMemberPackage.renewalDate === null
                  ? "Not determined"
                  : familyMemberPackage.renewalDate}
              </p>
              <p>
                Cancellation Date:{" "}
                {familyMemberPackage.cancellationDate === null
                  ? "Not Determined"
                  : familyMemberPackage.cancellationDate}
              </p>
            </div>
          ))}
            <Button style={{ backgroundColor: "#F8F6F4" }}>Cancel</Button>
        </>
      ) : (
        <div>No subscribed packages found for family members</div>
      )}
    </div>
  );
};

export default SubscribedPackages;