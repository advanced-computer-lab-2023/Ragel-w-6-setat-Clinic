import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientPrescriptions from './components/Prescription'; 
import HealthPackages from './components/HealthPackages';


const App = () => {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/viewPrescription/:id" element={<PatientPrescriptions />} />
      <Route path="/viewHealthPackages" element={<HealthPackages />} />
    </Routes>
    </BrowserRouter>
 );
};

export default App;












