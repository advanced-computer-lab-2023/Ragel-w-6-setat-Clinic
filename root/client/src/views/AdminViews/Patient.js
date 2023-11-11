import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams } from 'react-router-dom';
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

const Patients = () => {
  const { id } = useParams();
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patients associated with the doctor
        const response = await axios.get(`/doctors/viewMypatients/${id}`);
        setDoctorPatients(response.data);
      } catch (error) {
        console.error('Error fetching doctor patients:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = async () => {
    try {
      // Search for patients based on the search query
      const response = await axios.get(`/doctors/searchForPatients`, {
        params: {
          fName: searchQuery,
          lName: searchQuery,
        },
      });
  
      if (response.data && response.data.length > 0) {
        setDoctorPatients(response.data);
      } else {
        setDoctorPatients([]); // Set to an empty array if no patients found
        showToast('No patients found for the given search criteria.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 status separately
        setDoctorPatients([]);
        showToast('No patients found for the given search criteria.', 'error');
      } else {
        console.error('Error searching for patients:', error);
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
  

 const handleFilterUpcomingAppointments = async () => {
    try {
      const response = await axios.get(`/doctors/upcomingappointments/${id}`);
      setDoctorPatients(response.data.data);
    } catch (error) {
      console.error('Error filtering patients based on upcoming appointments:', error);
    }
  };
  
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">View Patients</h3>
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
                  <Button
                    color="primary"
                    onClick={handleSearch}
                    size="sm"
                  >
                    Search Patients
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg="6"></Col>
                <Col lg="6">
                <Button
  color="primary"
  onClick={handleFilterUpcomingAppointments}
  size="sm"
>
  Filter Upcoming Appointments
</Button>
                </Col>
              </Row>
            </div>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
              {doctorPatients && doctorPatients.length > 0 ? (
  doctorPatients.map((patient) => (
    <tr key={patient?._id}>
      <td>{`${patient?.fName} ${patient?.lName}`}</td>
      <td>{patient?.email}</td>
      <td>{new Date(patient?.dateOfBirth).toDateString()}</td>
      <td>{patient?.gender}</td>
      <td>{patient?.phoneNum}</td>
    </tr>
  ))
) : (
  <p>{searchQuery ? 'No patients found for the given search criteria.' : 'No patients available.'}</p>
)}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Patients;
