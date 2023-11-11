import React, { useEffect, useState } from 'react';
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from 'reactstrap';


const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/patients/viewHealthPackages');
        console.log('Health Packages response:', response.data);

        setHealthPackages(response.data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">HealthPackages</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Session Discount</th>
                    <th scope="col">Medicine Discount</th>
                    <th scope="col">Subscription Discount</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {healthPackages.map((healthPackage) => (
                    <tr key={healthPackage._id}>
                      <th scope="row">{healthPackage.name}</th>
                      <td>${healthPackage.price}</td>
                      <td>{healthPackage.description}</td>
                      <td>{healthPackage.sessionDiscount}%</td>
                      <td>{healthPackage.medicineDiscount}%</td>
                      <td>{healthPackage.subscriptionDiscount}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table> 
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HealthPackages;
