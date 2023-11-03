import React, { useEffect, useState } from "react";

// CSS
import '../css/Home.css';

const Prescription = ({ patientId }) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(`patients/viewPrescription/${patientId}`);
        if (!response.ok) {
          // Handle non-successful responses 
          console.error("Error fetching prescriptions:", response.statusText);
          return;
        }
        const data = await response.json();
        setPrescriptions(data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <h3>Prescription Details</h3>
            <p><strong>Medication:</strong> {prescription.medication}</p>
            <p><strong>Dosage:</strong> {prescription.dosage}</p>
            <p><strong>Is Filled:</strong> {prescription.isFilled ? "Yes" : "No"}</p>
            <p><strong>Date:</strong> {new Date(prescription.date).toDateString()}</p>
            <p><strong>Notes:</strong> {prescription.notes}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescription;







