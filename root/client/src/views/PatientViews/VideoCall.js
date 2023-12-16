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

const VideoCall = () => { 
  const { user } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/patients/viewDoctors/${user._id}`);
        const json = await response.json();
        if (response.ok) {
          setDoctors(json.doctors);
          setUniqueSpecialties(json.uniqueSpecialties);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert(error.response.data.message);
      }
    };

    fetchDoctors();
  }, []);
  
  return (
    <>
      <Container className="container-style">
        <Row>
          {doctors.map((doctor, index) => (
            <Col key={index} className="order-xl-6 mb-4" xl="4">
              <Card className="card-profile shadow" style={{ backgroundColor: "#EEF5FF" }}>
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <Link to={`/patient/Room`}>
                        <img
                          id={`tooltip${index + 1}`}
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/brand/patienticonm.png")}
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
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4" style={{ backgroundColor: "#EEF5FF" }}></CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>
                      {doctor.name}
                      <span className="font-weight-light">, {doctor.specialty}</span>
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
  



}


export default  VideoCall;