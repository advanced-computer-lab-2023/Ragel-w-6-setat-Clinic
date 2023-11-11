import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);
  const [searchedOrFiltered, setSearchedOrFiltered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/patients/viewDoctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/patients/searchForDoctors', {
        params: {
          fName: searchQuery,
          lName: searchQuery,
          specialty: searchSpecialty,
        },
      });
  
      if (response.data && response.data.length > 0) {
        setDoctors(response.data);
      } else {
        setDoctors([]); // Set to an empty array if no doctors found
        showToast('No doctors found for the given search criteria.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 status separately
        setDoctors([]);
        showToast('No doctors found for the given search criteria.', 'error');
      } else {
        console.error('Error searching for doctors:', error);
      }
    }
  };
  

  const handleFilter = async () => {
    try {
      const response = await axios.get('/patients/filterDoctors', {
        params: {
          specialty: searchSpecialty,
          date: filterDate,
        },
      });
      setDoctors(response.data);
      setSearchedOrFiltered(true);
    } catch (error) {
      console.error('Error filtering doctors:', error);
    }
  };

  const handleSelectDoctor = (doctorId) => {
    if (searchedOrFiltered) {
      if (expandedDoctorId === doctorId) {
        setExpandedDoctorId(null);
      } else {
        setExpandedDoctorId(doctorId);
      }
    }
  };

  const showToast = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">View Doctors</h3>
            </CardHeader>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Search by First or Last Name:
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <Button color="primary" onClick={handleSearch} size="sm">
                    Search Doctors
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Search/Filter by Specialty:
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={searchSpecialty}
                      onChange={(e) => setSearchSpecialty(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">
                      Filter by Date and Time:
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Button color="primary" onClick={handleFilter} size="sm">
                    Filter Doctors
                  </Button>
                </Col>
              </Row>
            </div>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Specialty</th>
                  <th scope="col">Registration Status</th>
                  <th scope="col">Hourly Rate</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <React.Fragment key={doctor._id}>
                    <tr
                      className="doctor-container"
                      onClick={() => handleSelectDoctor(doctor._id)}
                    >
                      <td>{`${doctor.fName} ${doctor.lName}`}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.specialty}</td>
                      <td>
                        {doctor.isRegistered
                          ? 'Registered'
                          : 'Not Registered'}
                      </td>
                      <td>{`${doctor.hourlyRate} USD`}</td>
                    </tr>
                    {expandedDoctorId === doctor._id && (
                      <tr className="doctor-details">
                        <td colSpan="5">
                          <strong>Date of Birth:</strong>{' '}
                          {new Date(doctor.dateOfBirth).toDateString()}<br />
                          <strong>Educational Background:</strong>{' '}
                          {doctor.educationalBackground}<br />
                          <strong>Affiliation:</strong> {doctor.affiliation}
                          <br />
                          <strong>Session Price:</strong>{' '}
                          {`${doctor.sessionPrice} USD`}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewDoctors;
