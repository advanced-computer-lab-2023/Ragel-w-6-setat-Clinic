//components

import {
  NavLink,
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import { useEffect, useContext ,useState } from "react";
import { UserContext } from "contexts/UserContext";
import { Link } from "react-router-dom";

const DoctorVideoCall = () => {
  const { user } = useContext(UserContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchDoctorsPatients = async () => {
      try {
        const response = await fetch(`/doctors/viewMyPatients/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setPatients(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert(error.response.data.message);
      }
    };

    fetchDoctorsPatients();
  }, []);


  return (
    <Container className="container-style">
    <Row>
    {patients.map((patient) => (
      <Col  key={patient._id}  className="order-xl-6 mb-4" xl="6">
        <Card
          className="card-profile shadow"
          style={{ backgroundColor: "#EEF5FF" }}
        >
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <Link to={`/doctor/DoctorRoom`}>
                  <img
                    id="tooltip1"
                    alt="..."
                    className="rounded-circle"
                    src={require("../../assets/img/brand/patienticonf.png")}
                    style={{
                      height: "70px",
                      width: "70px",
                      background: "#EEF5FF",
                    }}
                  />
                  </Link>
                </a>
              </div>
            </Col>
          </Row>
          <CardHeader
            className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            style={{ backgroundColor: "#EEF5FF" }}
          ></CardHeader>
         <CardBody className="pt-0 pt-md-4">
      <div className="text-center">
        <h3>
        {patient.fName} {patient.lName}
          <span className="font-weight-light">, {patient.age}</span>
        </h3>
      </div>{" "}
    </CardBody>
  </Card>
</Col>
 ))}
</Row>
  </Container>
  )
};



export default DoctorVideoCall;