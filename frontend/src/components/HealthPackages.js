import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    padding: '20px',
    borderRadius: '10px',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  li: {
    backgroundColor: '#B3E5FC', // Dark primary color
    margin: '20px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #bdbdbd', // Divider color
    color: '#212121', // Primary text color
  },
};

const pageStyle = {
  backgroundColor: '#0288D1', // Background color for the entire page
  minHeight: '100vh', // Ensure the page covers the full viewport height
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '-8px',
};

const HealthPackages = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/patients/viewHealthPackages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={pageStyle}>
      <h2>Health Packages</h2>
      <ul style={styles.ul}>
        {packages.map((healthPackage) => (
          <li key={healthPackage._id} style={styles.li}>
            <h3>{healthPackage.name}</h3>
            <p>Price: ${healthPackage.price}</p>
            <p>{healthPackage.description}</p>
            <p>Session Discount: {healthPackage.sessionDiscount}%</p>
            <p>Medicine Discount: {healthPackage.medicineDiscount}%</p>
            <p>Subscription Discount: {healthPackage.subscriptionDiscount}%</p>
            <p>Status: {healthPackage.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthPackages;
