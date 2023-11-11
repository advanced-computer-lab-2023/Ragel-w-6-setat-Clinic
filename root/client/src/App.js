import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import NotFound from "components/NotFound"; // A custom NotFound component

function App() {
  return (
    <div className="App"> {/* This div is not necessary, but it is a good practice to wrap all the components in a div */}
     <BrowserRouter>
       <div className="pages"> {/* This div is not necessary, but it is a good practice to wrap all the components in a div */}
        <Routes>
         <Route path="/admin/*" element={<AdminLayout />} />
         <Route path="/auth/*" element={<AuthLayout />} />
         <Route path="*" element={<NotFound />} /> {/* Custom NotFound component */}
        </Routes>
       </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
