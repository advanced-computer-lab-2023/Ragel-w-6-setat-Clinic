import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PatientLayout from "layouts/Patient.js";
import DoctorLayout from "layouts/Doctor.js";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/patient/*"
          element={user && user.userType === "patient" && <PatientLayout />}
        />
        <Route
          path="/admin/*"
          element={user && user.userType === "admin" && <AdminLayout />}
        />
        <Route path="/auth/*" element={!user && <AuthLayout />} />
        <Route
          path="/doctor/*"
          element={user && user.userType === "doctor" && <DoctorLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
