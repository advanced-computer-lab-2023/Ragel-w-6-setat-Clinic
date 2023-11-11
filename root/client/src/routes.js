/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import HandlePharmReq from "views/AdminViews/HandlePharmReq";
import HealthPackages from "views/AdminViews/HealthPackages";
import Patients from "views/AdminViews/Patient";
import PatientPrescriptions from "views/AdminViews/PatientPrescriptions";
import ViewDoctors from "views/AdminViews/Doctors";
import AddFamilyMember from "views/AdminViews/addFamilyMember";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/HealthPackages",
    name: "HealthPackages",
    icon: "ni ni-circle-08 text-pink",
    component: <HealthPackages />,
    layout: "/auth",
  },
  {
    path: "/Patient/:id",
    name: "Patient",
    icon: "ni ni-circle-08 text-pink",
    component: <Patients />,
    layout: "/auth",
  },
  {
    path: "/Prescriptions/:id",
    name: "PatientPrescriptions",
    icon: "ni ni-circle-08 text-pink",
    component: <PatientPrescriptions />,
    layout: "/auth",
  },
  {
    path: "/Doctor",
    name: "Doctor",
    icon: "ni ni-circle-08 text-pink",
    component: <viewDoctors />,
    layout: "/auth",
  },
  {
    path: "/Family/:id",
    name: "Family",
    icon: "ni ni-circle-08 text-pink",
    component: <AddFamilyMember />,
    layout: "/auth",
  },

];
export default routes;
