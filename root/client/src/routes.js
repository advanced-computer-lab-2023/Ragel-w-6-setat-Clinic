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
import RegisterDoctor from "views/examples/RegisterDoctor.js";
import RegisterPatient from "views/examples/RegisterPatient.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

// patient views
import SubscribedPackage from "views/PatientViews/viewSubscribedPackage.js";
import AddFamilyMember from "views/PatientViews/addFamilyMember.js";
import FilterAppointments from "views/PatientViews/filterAppointments.js";
import HealthPackages from "views/PatientViews/healthPackages";
import SearchForDoctors from "views/PatientViews/searchForDoctors";
import FilterPrescriptions from "views/PatientViews/filterPrescriptions";
import Wallet from "views/PatientViews/wallet";
import DoctorDetails from "views/PatientViews/doctorDetails";
import MedicalHistory from "views/PatientViews/viewMedicalHistory";

// doctor views
import DoctorProfile from "views/DoctorViews/doctorProfile";
import SearchForPatients from "views/DoctorViews/searchForPatients";
import DoctorAppointments from "views/DoctorViews/doctorAppointments";
import WalletDoctor from "views/DoctorViews/wallet";
import PatientDetails from "views/DoctorViews/patientDetails";

// admin views

import AllUsers from "views/AdminViews/allUsers";
import ManageHealthPackages from "views/AdminViews/healthPackagesManagement";

var routes = [
  //patient routes
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/patient",
  },
  {
    path: "/mySubscribedPackage",
    name: "Subscribed Package",
    icon: "ni ni-basket",
    component: <SubscribedPackage />,
    layout: "/patient",
  },
  {
    path: "/addFamilyMember",
    name: "Add a Family Member",
    icon: "ni ni-single-02",
    component: <AddFamilyMember />,
    layout: "/patient",
  },
  {
    path: "/filterAppointments",
    name: "My Appointments",
    icon: "ni ni-fat-add",
    component: <FilterAppointments />,
    layout: "/patient",
  },
  {
    path: "/healthPackagesOptions",
    name: "Health Package Options",
    icon: "ni ni-box-2",
    component: <HealthPackages />,
    layout: "/patient",
  },
  {
    path: "/allDoctors",
    name: "Search for Doctors",
    icon: "ni ni-single-02",
    component: <SearchForDoctors />,
    layout: "/patient",
  },
  {
    path: "/filterPrescriptions",
    name: "My Prescriptions",
    icon: "ni ni-collection",
    component: <FilterPrescriptions />,
    layout: "/patient",
  },
  {
    path: "/wallet",
    name: "My Wallet",
    icon: "ni ni-money-coins",
    component: <Wallet />,
    layout: "/patient",
  },
  {
    path: "/doctorProfile/:doctorid",
    name: "Doctor Profile",
    icon: "ni ni-money-coins",
    component: <DoctorDetails />,
    layout: "/patient",
    excludeFromSidebar: true,
  },
  {
    path: "/myMedicalHistory",
    name: "My Medical History",
    icon: "ni ni-money-coins",
    component: <MedicalHistory />,
    layout: "/patient",
  },

  //doctor routes

  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/doctor",
  },
  {
    path: "/myProfile",
    name: "My Profile",
    icon: "ni ni-circle-08",
    component: <DoctorProfile />,
    layout: "/doctor",
  },
  {
    path: "/myPatients",
    name: "My Patients",
    icon: "ni ni-single-02",
    component: <SearchForPatients />,
    layout: "/doctor",
  },
  {
    path: "/myAppointments",
    name: "My Appointments",
    icon: "ni ni-fat-add",
    component: <DoctorAppointments />,
    layout: "/doctor",
  },
  {
    path: "/wallet",
    name: "My Wallet",
    icon: "ni ni-money-coins",
    component: <WalletDoctor />,
    layout: "/doctor",
  },
  {
    path: "/patientDetails/:patientid",
    name: "Patient Profile",
    icon: "ni ni-money-coins",
    component: <PatientDetails />,
    layout: "/doctor",
    excludeFromSidebar: true,
  },

  //admin routes
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/allUsers",
    name: "System Users",
    icon: "ni ni-circle-08 text-pink",
    component: <AllUsers />,
    layout: "/admin",
  },
  {
    path: "/healthPackagesManagement",
    name: "Health Packages Management",
    icon: "ni ni-box-2",
    component: <ManageHealthPackages />,
    layout: "/admin",
  },

  // auth routes
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/registerDoctor",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterDoctor />,
    layout: "/auth",
  },
  {
    path: "/registerPatient",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <RegisterPatient />,
    layout: "/auth",
  },
];
export default routes;
