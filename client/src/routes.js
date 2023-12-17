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
import FamilyMemberDetails from "views/PatientViews/FamilyMemberDetails";
import HealthPackages from "views/PatientViews/HealthPackages";
import ChatWithDoctor from "views/PatientViews/ChatWithDoctor";

// admin users

import HomeAdmin from "views/AdminViews/HomeAdmin";
import AllUsers from "views/AdminViews/AllUsers";
import UnregisteredDoctors from "views/AdminViews/UnregisteredDoctors";
import HealthPackagesManagement from "views/AdminViews/HealthPackagesManagement";

//doctor users

import HomeDoctor from "views/DoctorViews/HomeDoctor";
import DoctorAppointments from "views/DoctorViews/DoctorAppointments";
import AppointmentRequests from "views/DoctorViews/AppointmentRequests";
import DoctorPatients from "views/DoctorViews/DoctorPatients";
import PatientDetails from "views/DoctorViews/PatientDetails";
import DoctorMedicalHistoryForPatient from "views/DoctorViews/DoctorMedicalHistoryForPatient";
import DoctorPrescriptionsForPatient from "views/DoctorViews/DoctorPrescriptionsForPatient";
import DoctorPrescriptionDetailsForPatient from "views/DoctorViews/DoctorPrescriptionDetailsForPatient";
import ChatWithPatient from "views/DoctorViews/ChatWithPatient";

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
    path: "/healthPackages",
    name: "Health Packages",
    icon: "ni ni-circle-08 text-pink",
    component: <HealthPackages />,
    layout: "/patient",
  },

  {
    path: "/chatWithDoctor",
    name: "Chat With Doctor",
    icon: "ni ni-circle-08 text-pink",
    component: <ChatWithDoctor />,
    layout: "/patient",
  },

  // doctor routes
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-single-02 text-yellow",
    component: <HomeDoctor />,
    layout: "/doctor",
  },
  {
    path: "/myAppointments",
    name: "My Appointments",
    icon: "ni ni-single-02 text-yellow",
    component: <DoctorAppointments />,
    layout: "/doctor",
  },
  {
    path: "/appointmentRequests",
    name: "Appointment Requests",
    icon: "ni ni-single-02 text-yellow",
    component: <AppointmentRequests />,
    layout: "/doctor",
  },
  {
    path: "/myPatients",
    name: "My Patients",
    icon: "ni ni-single-02 text-yellow",
    component: <DoctorPatients />,
    layout: "/doctor",
  },
  {
    path: "/patientDetails",
    name: "Patient Details",
    icon: "ni ni-single-02 text-yellow",
    component: <PatientDetails />,
    layout: "/doctor",
  },
  {
    path: "/patientMedicalHistory",
    name: "Patient Medical History",
    icon: "ni ni-single-02 text-yellow",
    component: <DoctorMedicalHistoryForPatient />,
    layout: "/doctor",
  },
  {
    path: "/patientPrescriptions",
    name: "Patient Prescription",
    icon: "ni ni-single-02 text-yellow",
    component: <DoctorPrescriptionsForPatient />,
    layout: "/doctor",
  },
  {
    path: "/patientPrescriptionDetails",
    name: "Patient Prescription Details",
    icon: "ni ni-single-02 text-yellow",
    component: <DoctorPrescriptionDetailsForPatient />,
    layout: "/doctor",
  },

  {
    path: "/chatWithPatient",
    name: "Chat With Patient",
    icon: "ni ni-circle-08 text-pink",
    component: <ChatWithPatient />,
    layout: "/doctor",
  },

  // admin routes
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-single-02 text-yellow",
    component: <HomeAdmin />,
    layout: "/admin",
  },
  {
    path: "/allUsers",
    name: "All System Users",
    icon: "ni ni-single-02 text-yellow",
    component: <AllUsers />,
    layout: "/admin",
  },
  {
    path: "/unregisteredDoctors",
    name: "Unregistered Doctors",
    icon: "ni ni-single-02 text-yellow",
    component: <UnregisteredDoctors />,
    layout: "/admin",
  },
  {
    path: "/healthPackagesManagement",
    name: "Health Packages Management",
    icon: "ni ni-single-02 text-yellow",
    component: <HealthPackagesManagement />,
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
