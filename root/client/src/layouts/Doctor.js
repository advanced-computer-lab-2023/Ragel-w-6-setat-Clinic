import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import DoctorNavBar from "components/Navbars/DoctorNavbar";

import routes from "routes.js";

const Patient = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/doctor") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <DoctorNavBar />
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/doctor/home" replace />} />
        </Routes>
        <Container fluid></Container>
      </div>
    </>
  );
};

export default Patient;
