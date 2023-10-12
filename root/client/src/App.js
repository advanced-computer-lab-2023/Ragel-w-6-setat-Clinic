
import { Route, Routes } from "react-router-dom";
import RemoveGeneral from "./components/RemoveGeneral";

function App() {
     return (
        <Route path="/registration" element={<RegistrationOptions />} />
    // //   <Routes>
    // //     <Route path="/" exact element={<Login />} />
    // //     <Route path="/registration" element={<RegistrationOptions />} />
    // //     <Route path="/registration/patient" element={<PatientRegistration />} />
    // //     <Route path="/registration/doctor" element={<DoctorRegistration />} />
    // //     <Route path="/admin/landingpage" element={<AdminLanding />} />
    // //     <Route path="/admin/addadmin" element={<AddAdmin />} />
    // //     <Route path="/admin/removeuser" element={<RemoveUser />} />
    // //   </Routes>
     );
  }
  
  export default App;