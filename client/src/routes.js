import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

// guest users

import Login from "views/GuestViews/Login.js";
import RegisterDoctor from "views/GuestViews/RegisterDoctor.js";
import RegisterPatient from "views/GuestViews/RegisterPatient.js";

// patient users

import HomePatient from "views/PatientViews/HomePatient.js";
import MedicalHistory from "views/PatientViews/MedicalHistory.js";
import FamilyMemberList from "views/PatientViews/FamilyMemberList";
import AllDoctors from "views/PatientViews/AllDoctors";
import DoctorDetails from "views/PatientViews/DoctorDetails";
import PatientAppointments from "views/PatientViews/PatientAppointments";
import PatientPrescriptions from "views/PatientViews/PatientPrescriptions";
import PrescriptionDetails from "views/PatientViews/PrescriptionDetails";
import FamilyMemberDetails from "views/PatientViews/FamiltMemberDetails";

var routes = [
  // patient routes
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-circle-08 text-pink",
    component: <HomePatient />,
    layout: "/patient",
  },
  {
    path: "/medicalHistory",
    name: "Medical History",
    icon: "ni ni-circle-08 text-pink",
    component: <MedicalHistory />,
    layout: "/patient",
  },
  {
    path: "/familyMembers",
    name: "Family Members",
    icon: "ni ni-circle-08 text-pink",
    component: <FamilyMemberList />,
    layout: "/patient",
  },
  {
    path: "/allDoctors",
    name: "Doctors",
    icon: "ni ni-circle-08 text-pink",
    component: <AllDoctors />,
    layout: "/patient",
  },
  {
    path: "/doctorDetails",
    name: "Doctor Details",
    icon: "ni ni-circle-08 text-pink",
    component: <DoctorDetails />,
    layout: "/patient",
  },
  {
    path: "/myAppointments",
    name: "My Appointments",
    icon: "ni ni-circle-08 text-pink",
    component: <PatientAppointments />,
    layout: "/patient",
  },
  {
    path: "/myPrescriptions",
    name: "My Prescriptions",
    icon: "ni ni-circle-08 text-pink",
    component: <PatientPrescriptions />,
    layout: "/patient",
  },
  {
    path: "/prescriptionDetails",
    name: "Prescription Details",
    icon: "ni ni-circle-08 text-pink",
    component: <PrescriptionDetails />,
    layout: "/patient",
  },
  {
    path: "/familyMemberDetails",
    name: "Family Member Details",
    icon: "ni ni-circle-08 text-pink",
    component: <FamilyMemberDetails />,
    layout: "/patient",
  },

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
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
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
