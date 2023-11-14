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
import {
  Card,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import { UserContext } from "../../contexts/UserContext";

const MedicalHistory = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const { user } = useContext(UserContext);

  const [file, setFile] = useState();
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(`/patients/myMedicalHistory/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setMedicalHistory(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Server Error");
      }
    };
    fetchMedicalHistory();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `/patients/uploadDocument/${user._id}`,
        formData
      );
      if (response.ok) {
        alert("File uploaded successfully");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Server Error");
    }
  };

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const removeDocument = async (documentId) => {
    try {
      const response = await axios.patch(
        `/patients/removeDocument/${user._id}/${documentId}`
      );

      if (response.ok) {
        alert("Document removed successfully");
        // Update the medicalHistory state to reflect the removal
        setMedicalHistory((prevHistory) =>
          prevHistory.filter((document) => document !== documentId)
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Server Error");
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
          <div class="input-group mb-3">
            <label
              class="input-group-text mr-1"
              for="inputGroupFile01"
              onClick={handleUpload}
            >
              Upload
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              class="form-control"
              id="inputGroupFile01"
            />
          </div>
        </Row>
        <Row>
          {medicalHistory.length > 0
            ? medicalHistory.map((history, index) => (
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0 mt-3">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Document {index + 1}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            <Button
                              className="mt-3"
                              color="primary"
                              onClick={() => showDocument(history)}
                              size="sm"
                            >
                              View Document
                            </Button>
                          </span>
                          <span className="h2 font-weight-bold mb-0">
                            <Button
                              color="primary"
                              onClick={() => removeDocument(history)}
                              size="sm"
                            >
                              Remove Document
                            </Button>
                          </span>
                        </div>
                        <Col className="col-auto">
                          {/* <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div> */}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))
            : ""}
        </Row>
      </Container>
    </>
  );
};

export default MedicalHistory;