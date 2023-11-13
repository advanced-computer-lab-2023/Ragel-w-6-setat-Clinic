import React, { useState, useContext, useEffect } from "react";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Media,
  Table,
  Label,
  Input,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { UserContext } from "../../contexts/UserContext";

const FilterPrescriptions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user } = useContext(UserContext);

  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFilledStatus, setSelectedFilledStatus] = useState("");
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  useEffect(() => {
    const fetchDoctorOptions = async () => {
      try {
        const response = await fetch(`/patients/getAllDoctors/${user._id}`);
        const json = await response.json();

        console.log("Doctor Options Response:", json);  // ana ba debug

        if (response.ok) {
          // Assuming the response includes an array of doctors
          setDoctorOptions(json.doctors);
        } else {
          console.error("Error fetching doctor options:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorOptions();
  }, [user._id]);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        // Fetch all prescriptions by default
        const response = await fetch(`/patients/viewPrescription/${user._id}`);
        const json = await response.json();

        if (response.ok) {
          setPrescriptionDetails(json.prescriptions);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPrescriptionDetails();
  }, [user._id]);

  const handleFilterPrescriptions = async () => {
    try {
      const response = await fetch(
        `/patients/filterThePrescription/${user._id}?doctor=${selectedDoctor}&date=${selectedDate}&isFilled=${selectedFilledStatus}`
      );
      const json = await response.json();

      if (response.ok) {
        setPrescriptionDetails(json.prescriptions);
      } else {
        console.error("Error fetching data:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handlePrescriptionSelection = (prescriptionId) => {
    setSelectedPrescriptions((prevSelection) => {
      if (prevSelection.includes(prescriptionId)) {
        return prevSelection.filter((id) => id !== prescriptionId);
      } else {
        return [...prevSelection, prescriptionId];
      }
    });
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
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter with Doctor, Date, and/or Filled/Unfilled
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Doctor:</label>
                          <br />
                          <select
id="                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ownDoctor"
                            className="form-control-alternative"
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                          >
                            <option value="">All</option>
                            {doctorOptions.map((doctor, index) => (
                              <option key={index} value={doctor.username}>
                                {doctor.username}
                              </option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">On Date:</label>
                          <br />
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              inputProps={{
                                placeholder: "Date",
                              }}
                              timeFormat={false}
                              onChange={(date) =>
                                setSelectedDate(date.format("YYYY-MM-DD"))
                              }
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Filled/Unfilled:
                          </label>
                          <br />
                          <select
                            id="dropdownFilledStatus"
                            className="form-control-alternative"
                            onChange={(e) =>
                              setSelectedFilledStatus(e.target.value)
                            }
                          >
                            <option value="">All</option>
                            <option value="true">Filled</option>
                            <option value="false">Unfilled</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleFilterPrescriptions}
                          size="sm"
                        >
                          Filter Prescriptions
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
                {/* Table */}
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Prescriptions</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                        hover
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Select</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Medication</th>
                            <th scope="col">Dosage</th>
                            <th scope="col">Date</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Is Filled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(prescriptionDetails) &&
                          prescriptionDetails.length > 0 ? (
                            prescriptionDetails.map((prescription, index) => (
                              <tr key={index}>
                                <td>
                                  <FormGroup check>
                                    <Label check>
                                      <Input
                                        type="checkbox"
                                        checked={selectedPrescriptions.includes(
                                          prescription._id
                                        )}
                                        onChange={() =>
                                          handlePrescriptionSelection(
                                            prescription._id
                                          )
                                        }
                                      />
                                    </Label>
                                  </FormGroup>
                                </td>
                                <td>
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {prescription.doctor.username}
                                      </span>
                                    </Media>
                                  </Media>
                                </td>
                                <td>{prescription.medication}</td>
                                <td>{prescription.dosage}</td>
                                <td>{prescription.date}</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="mr-2">
                                      {prescription.notes}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="mr-2">
                                      {prescription.isFilled.toString()}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">No prescriptions available.</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FilterPrescriptions;
