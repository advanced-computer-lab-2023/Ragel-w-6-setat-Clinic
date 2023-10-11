import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PatientRegistration from "./components/PatientRegistration";
import RegistrationOptions from "./components/RegistrationOptions";
import DoctorRegistration from "./components/DoctorRegistration";
import AdminLanding from "./components/AdminLanding";
import AddAdmin from "./components/AddAdmin";
import RemoveUser from "./components/RemoveUser";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/registration" element={<RegistrationOptions />} />
      <Route path="/registration/patient" element={<PatientRegistration />} />
      <Route path="/registration/doctor" element={<DoctorRegistration />} />
      <Route path="/admin/landingpage" element={<AdminLanding />} />
      <Route path="/admin/addadmin" element={<AddAdmin />} />
      <Route path="/admin/removeuser" element={<RemoveUser />} />
    </Routes>
  );
}

export default App;
