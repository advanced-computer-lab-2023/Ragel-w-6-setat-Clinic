import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from 'reactstrap';

const PatientPrescriptions = () => {
  const { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/patients/viewPrescription/${id}`);
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Prescriptions</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Medication</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Date</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr key={prescription._id}>
                    <td>{prescription.medication}</td>
                    <td>{prescription.dosage}</td>
                    <td>{new Date(prescription.date).toDateString()}</td>
                    <td>{prescription.notes}</td>
                    <td>{prescription.doctor ? prescription.doctor.username : 'Unknown Doctor'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default PatientPrescriptions;
