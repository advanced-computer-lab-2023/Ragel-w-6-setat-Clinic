import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PatientRegistration from "./components/PatientRegistration";
import RegistrationOptions from "./components/RegistrationOptions";
import DoctorRegistration from "./components/DoctorRegistration";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/registration" element={<RegistrationOptions />} />
      <Route path="/registration/patient" element={<PatientRegistration />} />
      <Route path="/registration/doctor" element={<DoctorRegistration />} />
    </Routes>
  );
}

export default App;
