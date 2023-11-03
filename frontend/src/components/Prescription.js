import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const styles = {
  page: {
    backgroundColor: '#0288D1', // Set the background color to blue
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: '-7px',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#B3E5FC', // Dark primary color
    borderRadius: '10px',
    margin: '20px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #bdbdbd', // Divider color
    color: '#212121', // Primary text color
    textAlign: 'left',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  li: {
    margin: '20px 0',
  },
};

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
    <div style={styles.page}>
      <h2>Prescriptions</h2>
      {prescriptions.map((prescription) => (
        <div key={prescription._id} style={styles.container}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              Medication: {prescription.medication}<br />
              Dosage: {prescription.dosage}<br />
              Date: {new Date(prescription.date).toDateString()}<br />
              Notes: {prescription.notes}<br />
              Doctor: {prescription.doctor.username}<br />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPrescriptions;
