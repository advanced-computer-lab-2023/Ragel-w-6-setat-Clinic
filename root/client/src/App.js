import React from 'react';
import { Route, Routes } from "react-router-dom";
import PatientPrescriptions from './components/PatientPrescriptions'; 
import HealthPackages from '../../../frontend/src/components/HealthPackages';

const App = () => {
 return (
    <Routes>
      <Route path="/viewPrescription/:id" element={<PatientPrescriptions />} />
      <Route path="/viewHealthPackages" element={<HealthPackages />} />
    </Routes>
 );
};

export default App;












