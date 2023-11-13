import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";
import Appointments from "../models/Appointments.js";
import Package from "../models/Package.js";

// HABIBAS REQS

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}, "username password"); // Retrieve only username and password fields
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function doctorsDisplay(patientID, doctors) {
  const patient = await Patient.findById(patientID);
  const patientPackage = patient.subscribedPackage;
  let sessionDiscount = 0;
  if (patientPackage) {
    const packageOffered = await Package.findById({
      _id: patientPackage.packageId,
    });
    if (packageOffered) {
      sessionDiscount = packageOffered.sessionDiscount || 0;
    }
  }
  const doctorToDisplay = doctors.map((doctor) => {
    const originalSessionPrice = doctor.sessionPrice;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
    return {
      _id: doctor._id,
      name: doctor.fName + " " + doctor.lName,
      specialty: doctor.specialty,
      sessionPrice: discountedPrice,
    };
  });

  return doctorToDisplay;
}

async function doctorDisplay(patientID, doctor) {
  const patient = await Patient.findById(patientID);
  const patientPackage = patient.subscribedPackage;
  let sessionDiscount = 0;
  if (patientPackage) {
    const packageOffered = await Package.findById({ _id: patientPackage });
    if (packageOffered) {
      sessionDiscount = packageOffered.sessionDiscount || 0;
    }
  }

  const originalSessionPrice = doctor.sessionPrice;
  const discountedPrice =
    originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);
  const doctorToDisplay = {
    ...doctor.toObject(),
    sessionPrice: discountedPrice,
  };

  return doctorToDisplay;
}

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      username: req.body.username,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phoneNum: req.body.phoneNum,
      emergencyContact: {
        phoneNum: req.body.emergencyMobile,
        fName: req.body.emergencyFName,
        lName: req.body.emergencyLName,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Patient successfully registered.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getAllPackages = async (req, res) => {
  const patientId = req.params.id;
  try {
    const packages = await Package.find({});
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// sprint 2
const cancelHealthPackageSubscription = async (req, res) => {
  const patientId = req.params.patientid;
  try {
    const patient = await Patient.findById(patientId);
    if (patient.subscribedPackage.cancellationDate) {
      return res
        .status(500)
        .json({ message: "Patient has already cancelled this health package" });
    }

    patient.subscribedPackage.cancellationDate =
      patient.subscribedPackage.renewalDate;
    patient.subscribedPackage.renewalDate = null;
    patient.subscribedPackage.subscriptionStatus = "cancelled";
    await patient.save();

    res.status(200).json({
      status: "success",
      message: "Health package subscription cancelled successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const viewSelectedDoctorAvailableAppointments = async (req, res) => {
  const patientId = req.params.patientid;
  const doctorId = req.params.doctorid;
  try {
    const appointments = await Appointments.find({
      doctor: doctorId,
      isAvailable: true,
    });
    res.status(200).json({
      status: "success",
      appointments: appointments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const registerForAnAppointmentPatient = async (req, res) => {
  const patientId = req.params.patientid;
  const appointmentId = req.params.appointmentid;
  try {
    const appointment = await Appointments.findById(appointmentId);
    if (!appointment.isAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment is not available",
      });
    }
    appointment.patient = patientId;
    appointment.isAvailable = false;
    appointment.status = "upcoming";
    await appointment.save();
    res.status(200).json({
      status: "success",
      message: "Appointment registered successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const registerForAnAppointmentFamilyMember = async (req, res) => {
  const patientId = req.params.patientid;
  const appointmentId = req.params.appointmentid;
  const familyMemberEmail = req.body.familymemberemail;
  try {
    const appointment = await Appointments.findById(appointmentId);
    if (!appointment.isAvailable) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment is not available",
      });
    }

    const patient = await Patient.findById(patientId);

    const familyMember = patient.familyMembers.find(
      (member) => member.email === familyMemberEmail
    );

    if (!familyMember) {
      return res.status(404).json({
        status: "fail",
        message: "Family member not found with the specified email",
      });
    }

    const familyMemberDoc = await Patient.findOne({ email: familyMemberEmail });

    appointment.patient = familyMemberDoc._id;
    appointment.isAvailable = false;
    appointment.status = "upcoming";
    await appointment.save();
    res.status(200).json({
      status: "success",
      message: "Appointment registered successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// LOJAINS REQS

const addFamilyMember = async (req, res) => {
  const patientId = req.params.id;
  const { fName, lName, nationalID, gender, dateOfBirth, relationship } =
    req.body;

  try {
    const patient = await Patient.findById(patientId);

    // Check if the nationalID already exists in familyMembers
    const isDuplicateNationalID = patient.familyMembers.some(
      (member) => member.nationalID === nationalID
    );

    if (isDuplicateNationalID) {
      return res.status(400).json({
        status: "error",
        message: "Family member with the same national ID already exists.",
      });
    }

    const newFamilyMember = {
      fName: fName,
      lName: lName,
      nationalID: nationalID,
      gender: gender,
      dateOfBirth: dateOfBirth,
      relationship: relationship,
    };

    patient.familyMembers.push(newFamilyMember);
    await patient.save();
    res.status(201).json({
      status: "success",
      message: "Family Member added successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Make sure all fields are filled",
    });
  }
};

const viewPrescription = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Find all the prescriptions for the patient
    const prescriptions = await Prescription.find({
      patient: patientId,
    }).populate("doctor");

    const doctorsSet = await Doctor.find({ isRegistered: true }).select(
      "username"
    ); // ??? what for

    res.status(200).json({
      status: "success",
      prescriptions: prescriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const filterThePrescription = async (req, res) => {
  const patientId = req.params.id;
  try {
    const filter = {};

    if (req.query.doctor) {
      const doctorsWithSpecificUsername = await Doctor.findOne({
        username: req.query.doctor,
      });
      filter.doctor = doctorsWithSpecificUsername._id;
    }

    if (req.query.date) {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }
    if (req.query.isFilled) {
      filter.isFilled = req.query.isFilled;
    }

    if (req.params.id) {
      filter.patient = req.params.id;
    }

    const prescriptions = await Prescription.find(filter).populate("doctor");

    const doctorsSet = await Doctor.find({ isRegistered: true }).select(
      "username"
    );

    res.status(200).json({
      status: "success",
      prescriptions: prescriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const selectPrescription = async (req, res) => {
  const prescriptionId = req.params.prescriptionid;
  const patiendID = req.params.patientid;

  try {
    const prescription = await Prescription.findOne({
      _id: prescriptionId,
      patient: patiendID,
    }).populate("doctor");

    if (!prescription) {
      return res.status(404).json({
        status: "fail",
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      status: "success",
      prescription: prescription,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//sprint 2
const viewUpcomingAppointments = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);

    const appointments = await Appointments.find({
      patient: patientId,
      status: "upcoming",
    }).populate("doctor");

    res.json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const viewPastAppointments = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);

    const appointments = await Appointments.find({
      patient: patientId,
      status: "completed",
    }).populate("doctor");

    res.json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// MARIAMS REQS

const searchForDoctor = async (req, res) => {
  const patientID = req.params.id;
  const filter = {};
  if (req.query.specialty != "") {
    filter.specialty = req.query.specialty;
  }
  if (req.query.fName != "") {
    filter.fName = req.query.fName;
  }
  if (req.query.lName != "") {
    filter.lName = req.query.lName;
  }

  try {
    const allDoctors = await Doctor.find({ isRegistered: true }).lean();
    const uniqueSpecialtiesSet = new Set();
    allDoctors.forEach((doctor) => {
      uniqueSpecialtiesSet.add(doctor.specialty);
    });
    const uniqueSpecialties = [...uniqueSpecialtiesSet];

    const doctors = allDoctors.filter((doctor) => {
      const isFNameMatch =
        !filter.fName ||
        doctor.fName.toLowerCase().includes(filter.fName.toLowerCase());
      const isLNameMatch =
        !filter.lName ||
        doctor.lName.toLowerCase().includes(filter.lName.toLowerCase());
      const isSpecialtyMatch =
        !filter.specialty ||
        doctor.specialty.toLowerCase().includes(filter.specialty.toLowerCase());

      return isFNameMatch && isLNameMatch && isSpecialtyMatch;
    });

    const doctorsToDisplay = await doctorsDisplay(patientID, doctors);

    if (doctors.length === 0) {
      res.status(200).json({
        status: "success",
        doctors: [],
        uniqueSpecialties: uniqueSpecialties,
      });
    } else {
      res.status(200).json({
        status: "success",
        doctors: doctorsToDisplay,
        uniqueSpecialties: uniqueSpecialties,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterDoctors = async (req, res) => {
  try {
    const specialty = req.query.specialty;
    const patientId = req.params.id;
    const date = req.query.date;
    const filter = {};
    const doctorIDS = [];
    const specificDate = new Date(date.toString() + ":00.000+00:00");

    if (date) {
      const appointmentsByDate = await Appointments.find({
        date: specificDate,
        isAvailable: true,
      });
      appointmentsByDate.forEach((appointment) => {
        if (appointment.isAvailable === true) {
          doctorIDS.push(appointment.doctor);
        }
      });
    }

    if (specialty) {
      filter.specialty = specialty;
    }

    if (doctorIDS.length > 0) {
      filter._id = { $in: doctorIDS };
    } else if (doctorIDS.length === 0 && date) {
      filter._id = null;
    }
    filter.isRegistered = true;

    const allDoctors = await Doctor.find().lean();
    const uniqueSpecialtiesSet = new Set();
    allDoctors.forEach((doctor) => {
      uniqueSpecialtiesSet.add(doctor.specialty);
    });
    const uniqueSpecialties = [...uniqueSpecialtiesSet];

    const doctors = await Doctor.find(filter).exec();

    const doctorsToDisplay = await doctorsDisplay(patientId, doctors);
    if (doctors.length === 0) {
      res.status(200).json({
        status: "success",
        doctors: [],
        uniqueSpecialties: uniqueSpecialties,
      });
    } else {
      res.status(200).json({
        status: "success",
        doctors: doctorsToDisplay,
        uniqueSpecialties: uniqueSpecialties,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const filterAvailableAppointments = async (req, res) => {
  const { status, date } = req.query;
  //const patientID = req.params.id;
  try {
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.date = new Date(date);
    }
    const appointments = await Appointments.find(filter);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterMyAppointments = async (req, res) => {
  const patientId = req.params.id; // Get patientId from URL parameter

  try {
    const filter = {};

    if (req.query.date) {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    filter.patient = req.params.id;

    const appointments = await Appointments.find(filter).populate("doctor");

    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;
    const appointments = await Appointments.find({
      patient: patientId,
    }).populate("doctor");
    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const selectDoctor = async (req, res) => {
  const patientId = req.params.patientid;
  const doctorId = req.params.doctorid;
  try {
    const doctor = await Doctor.findById({ _id: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doc = await doctorDisplay(patientId, doctor);
    res.status(200).json({ doctor: doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// sprint 2

const findOutRelationship = (relationship) => {
  switch (relationship) {
    case "wife":
      return "husband";
    case "husband":
      return "wife";
    case "child":
      return "parent";
    case "sibling":
      return "sibling";
    case "parent":
      return "child";
    default:
      throw new Error("Invalid relationship");
  }
};

const linkFamilyMember = async (req, res) => {
  try {
    const { email } = req.body;
    const patientId = req.params.id;

    const currentPatient = await Patient.findById(patientId);

    const patientToLink = await Patient.findOne({ email });
    if (!patientToLink) {
      return res.status(400).json({ message: "Patient to link not found" });
    }

    // Check if the family member already exists
    const existingFamilyMember = currentPatient.familyMembers.find(
      (member) => member.email === patientToLink.email
    );

    if (existingFamilyMember) {
      return res.status(400).json({ message: "Family member already linked" });
    }

    const matchingNationalIDMember = currentPatient.familyMembers.find(
      (member) => member.nationalID === patientToLink.nationalID
    );

    if (!matchingNationalIDMember) {
      return res
        .status(400)
        .json({ message: "You must add family member first" });
    }

    matchingNationalIDMember.email = email;
    await currentPatient.save();

    const oppositeRelationship = findOutRelationship(
      matchingNationalIDMember.relationship
    );

    patientToLink.familyMembers.push({
      email: currentPatient.email,
      fName: currentPatient.fName,
      lName: currentPatient.lName,
      nationalID: currentPatient.nationalID,
      gender: currentPatient.gender,
      dateOfBirth: currentPatient.dateOfBirth,
      relationship: oppositeRelationship,
    });

    await patientToLink.save();

    return res
      .status(201)
      .json({ message: "Family members both got linked successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while linking a family member" });
  }
};

// SARAS REQS

//sprint 1

const getFamilyMembers = async (req, res) => {
  try {
    const patientID = req.params.id; // Get patient's email from the request body

    // Find the patient using the provided email in the familyMembers array
    const patient = await Patient.findById(patientID);

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers.filter(
      (member) => member.email
    );

    if (!familyMembers) {
      return res.status(200).json({ patientFamily: [] });
    } else {
      res.status(200).json(familyMembers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const patientID = req.params.id;
    const filter = {};
    filter.isRegistered = true;
    const doctors = await Doctor.find(filter).lean();
    const uniqueSpecialtiesSet = new Set();
    doctors.forEach((doctor) => {
      uniqueSpecialtiesSet.add(doctor.specialty);
    });
    const uniqueSpecialties = [...uniqueSpecialtiesSet];

    const doctorsToDisplay = await doctorsDisplay(patientID, doctors);

    res.status(200).json({
      status: "success",
      doctors: doctorsToDisplay,
      uniqueSpecialties: uniqueSpecialties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//sprint 2

const getMyHealthPackages = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);

    const subscribedPackage = patient.subscribedPackage;
    if (subscribedPackage.cancellationDate) {
      const cancellationDate = subscribedPackage.cancellationDate;
      const currentDate = new Date();
      const isToday =
        cancellationDate.getFullYear() === currentDate.getFullYear() &&
        cancellationDate.getMonth() === currentDate.getMonth() &&
        cancellationDate.getDate() === currentDate.getDate();
      if (isToday) {
        patient.subscribedPackage = null;
        await patient.save();
        subscribedPackage = null;
      }
    }

    res.status(200).json(subscribedPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFamilyHealthPackages = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await Patient.findById(patientID);

    // Filter family members who have an email (indicating they are patients)
    const familyPatients = patient.familyMembers.filter(
      (member) => member.email
    );

    // Initialize an array to store family packages
    const familyPackages = [];

    // Iterate over family members
    for (const familyMember of familyPatients) {
      const familyPatient = await Patient.findOne({
        email: familyMember.email,
      });

      // Check if family patient has a subscribed package
      if (familyPatient && familyPatient.subscribedPackage) {
        const subscribedPackage = familyPatient.subscribedPackage;
        if (subscribedPackage.cancellationDate) {
          const cancellationDate = subscribedPackage.cancellationDate;
          const currentDate = new Date();
          const isToday =
            cancellationDate.getFullYear() === currentDate.getFullYear() &&
            cancellationDate.getMonth() === currentDate.getMonth() &&
            cancellationDate.getDate() === currentDate.getDate();
          if (isToday) {
            familyPatient.subscribedPackage = null;
            await familyPatient.save();
            subscribedPackage = null;
          } else {
            familyPackages.push({
              fName: familyMember.fName,
              lName: familyMember.lName,
              email: familyMember.email,
              familyMemberId: familyPatient._id.toString(),
              subscribedPackage: familyPatient.subscribedPackage,
            });
          }
        } else {
          familyPackages.push({
            fName: familyMember.fName,
            lName: familyMember.lName,
            email: familyMember.email,
            familyMemberId: familyPatient._id.toString(),
            subscribedPackage: familyPatient.subscribedPackage,
          });
        }
      }
    }
    res.status(200).json(familyPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const subscribeToHealthPackage = async (req, res) => {
  const patientId = req.params.patientId;
  const packageId = req.params.packageId;
  try {
    const patient = await Patient.findById(patientId);

    if (patient.subscribedPackage) {
      return res
        .status(500)
        .json({ message: "Patient is already subscribed to a health package" });
    }

    const today = new Date();
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

    const packageToBeSubscribed = await Package.findById(packageId);
    const newPackage = {
      packageId: packageToBeSubscribed._id,
      packageName: packageToBeSubscribed.name,
      subscriptionStatus: "subscribed",
      renewalDate: oneYearFromToday, // Format as "YYYY-MM-DD"
      cancellationDate: null,
    };

    patient.subscribedPackage = newPackage;
    await patient.save();
    res.status(200).json({ message: "Subscription successful" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const subscribeHealthPackageForFamilyMember = async (req, res) => {
  const patientId = req.params.patientId;
  const packageId = req.params.packageId;
  try {
    const { email } = req.body;
    const currentPatient = await Patient.findById(patientId);

    const familyPatient = await Patient.findOne({ email });

    if (!familyPatient) {
      return res
        .status(404)
        .json({ message: "Family member as patient not found" });
    }

    // Check if the family member is linked to patient
    const linkedFamilyMember = currentPatient.familyMembers.find(
      (member) => member.email === familyPatient.email
    );

    if (!linkedFamilyMember) {
      return res
        .status(400)
        .json({ message: "Family member is not linked to this patient" });
    }

    if (familyPatient.subscribedPackage) {
      return res.status(500).json({
        message: "Family Member is already subscribed to a health package",
      });
    }

    const today = new Date();
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

    const packageToBeSubscribed = await Package.findById(packageId);
    const newPackage = {
      packageId: packageToBeSubscribed._id,
      packageName: packageToBeSubscribed.name,
      subscriptionStatus: "subscribed",
      renewalDate: oneYearFromToday.toISOString().split("T")[0], // Format as "YYYY-MM-DD"
      cancellationDate: null,
    };

    familyPatient.subscribedPackage = newPackage;
    await familyPatient.save();
    res
      .status(200)
      .json({ message: "Subscription for family member successful" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  createPatient,
  viewPrescription,
  getAllPatients,
  addFamilyMember,
  filterThePrescription,
  selectPrescription,
  filterDoctors,
  searchForDoctor,
  filterMyAppointments,
  filterAvailableAppointments,
  selectDoctor,
  getFamilyMembers,
  getAllDoctors,
  getMyAppointments,
  cancelHealthPackageSubscription,
  viewSelectedDoctorAvailableAppointments,
  registerForAnAppointmentPatient,
  registerForAnAppointmentFamilyMember,
  getMyHealthPackages,
  getAllPackages,
  subscribeToHealthPackage,
  subscribeHealthPackageForFamilyMember,
  getFamilyHealthPackages,
  linkFamilyMember,
  viewUpcomingAppointments,
  viewPastAppointments,
};
