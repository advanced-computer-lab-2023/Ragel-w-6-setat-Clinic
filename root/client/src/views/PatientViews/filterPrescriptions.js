// reactstrap components
import { useState, useContext, useEffect } from "react";
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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
// core components
import { chartOptions, parseOptions } from "variables/charts.js";

//contexts to use
import { UserContext } from "../../contexts/UserContext";

const FilterPrescriptions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { user } = useContext(UserContext);
//VIEW PRESCRIPTIONS
  const [prescriptionDetails, setprescriptionDetails] = useState(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await fetch(`/patients/viewPrescription/${user._id}`);
        const json = await response.json();

        if (response.ok) {
          setprescriptionDetails(json.prescriptions); // Assuming the prescriptions are in a "prescriptions" property
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPrescriptionDetails();
  }, [user._id]);


  const [getDoctorsNames, setgetDoctorsNames] = useState(null);

  useEffect(() => {
    const fetchDoctorNames = async () => {
      try {
        const response = await fetch(`/patients/getAllDoctors/${user._id}`);
        const json = await response.json();

        if (response.ok) {
          setgetDoctorsNames(json.doctors); // Assuming the prescriptions are in a "prescriptions" property
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchDoctorNames();
  }, [user._id]);





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
      {/* Page content */}
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
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            {/* from backend */}
                            <option value="Ahmed">Ahmed</option>
                            <option value="Mohamed">Mohamed</option>
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
                            id="dropdown"
                            className="form-control-alternative"
                          >
                            {/* from backend */}
                            <option value={true}>Filled</option>
                            <option value={false}>Unfiled</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
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
                      <Table className="align-items-center table-flush" responsive hover>
                      <thead className="thead-light">
                <tr>
                  <th scope="col">Doctor</th>
                  <th scope="col">Medication</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Date</th> {/* Change this line */}
                  <th scope="col">Notes</th>
                  <th scope="col">Is Filled</th> {/* Change this line */}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(prescriptionDetails) && prescriptionDetails.length > 0 ? (
                  prescriptionDetails.map((prescription, index) => (
                    <tr key={index}>
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
                          <span className="mr-2">{prescription.notes}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{prescription.isFilled.toString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No prescriptions available.</td>
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
