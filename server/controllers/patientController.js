import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import Appointments from "../models/Appointments.js";
import Package from "../models/Package.js";
import stripe from "stripe";
import PDFDocument from "pdfkit";
import e from "express";

// Set your Stripe secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
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
    const packageOffered = await Package.findById({
      _id: patientPackage.packageId,
    });
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

const registerPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      username: req.body.patientFields.username,
    });
    const doctor2 = await Doctor.findOne({
      email: req.body.patientFields.email,
    });
    const admin = await Admin.findOne({
      username: req.body.patientFields.username,
    });

    if (doctor || admin) {
      return res
        .status(500)
        .json({ message: "A user already exists with this username" });
    }

    if (doctor2) {
      return res
        .status(500)
        .json({ message: "A user already exists with this email" });
    }

    const patient = await Patient.create({
      ...req.body.patientFields,
      emergencyContact: {
        ...req.body.emergencyContact,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Patient successfully registered.",
    });
  } catch (error) {
    console.error("Patient registration error:", error);
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      const message = `A user already exists with this ${duplicatedField}`;
      res.status(500).json({ message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getAllPackages = async (req, res) => {
  const patientId = req.params.id;
  try {
    const packages = await Package.find({});
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// sprint 2

const cancelHealthPackageSubscription = async (req, res) => {
  const patientId = req.params.patientid;
  try {
    const patient = await Patient.findById(patientId);
    if (patient.subscribedPackage.cancellationDate) {
      return res
        .status(400)
        .json({ message: "Patient has already cancelled this health package" });
    }

    patient.subscribedPackage.cancellationDate =
      patient.subscribedPackage.renewalDate;
    patient.subscribedPackage.renewalDate = null;
    patient.subscribedPackage.subscriptionStatus = "cancelled";
    await patient.save();

    const patientUpdated = await Patient.findById(patientId);

    res.status(200).json({
      status: "success",
      message: "Package cancelled successfully.",
      patient: patientUpdated,
    });
  } catch (err) {
    res.status(500).json({
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

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const registerForAnAppointmentPatient = async (req, res) => {
  const patientId = req.params.patientid;
  const appointmentId = req.params.appointmentid;
  try {
    const patient = await Patient.findById(patientId);
    const appointment = await Appointments.findById(appointmentId).populate(
      "doctor"
    );

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
    const originalSessionPrice = appointment.doctor.sessionPrice;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);

    appointment.patient = patientId;
    appointment.isAvailable = false;
    appointment.status = "upcoming";
    appointment.price = discountedPrice;

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
  const familyMemberEmail = req.body.familyMemberEmail.value;
  try {
    const appointment = await Appointments.findById(appointmentId).populate(
      "doctor"
    );

    const patient = await Patient.findById(patientId);

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
    const originalSessionPrice = appointment.doctor.sessionPrice;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);

    const familyMemberDoc = await Patient.findOne({ email: familyMemberEmail });

    appointment.patient = familyMemberDoc._id;
    appointment.isAvailable = false;
    appointment.status = "upcoming";
    appointment.price = discountedPrice;
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

const getWalletAmount = async (req, res) => {
  const patientId = req.params.id;
  try {
    // Find the doctor by ID and select the 'wallet' field
    const patient = await Patient.findById(patientId).select("wallet").exec();
    // Return the wallet amount
    res.status(200).json(patient.wallet);
  } catch (err) {
    console.error("Error retrieving wallet amount:", err);
    res.status(500).json({ message: err.message });
  }
};

const uploadDocument = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    const newHealthRecord = {
      uploadByID: patientId,
      uploadByType: "Patient",
      name: req.file.originalname,
      filePath: req.file.filename,
      forWhomID: patientId,
      fileType: req.file.mimetype,
    };

    patient.medicalHistory.push(newHealthRecord);
    const medicalHistory = patient.medicalHistory;
    await patient.save();
    res.status(200).json({
      medicalHistory: medicalHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMedicalHistory = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    res.status(200).json({ medicalHistory: patient.medicalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const removeDocument = async (req, res) => {
  const patientId = req.params.patientid;
  const documentId = req.params.documentid;

  try {
    const patient = await Patient.findById(patientId);

    // Remove the document from the medicalHistory array
    patient.medicalHistory = patient.medicalHistory.filter(
      (document) => document._id.toString() !== documentId
    );
    await patient.save();

    res.status(200).json({ message: "Document removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Process payment
const processCreditCardPayment = async (res, items) => {
  try {
    const forAppointments = items[0].forAppointments;
    stripeInstance._api.auth =
      "Bearer sk_test_51OAZpWFzdF5dnLz8738y3YYDrj7WJHFDHzeufGEePpK4jOIOyG67Bv1bPOQZw1CBXbVGb53GWjXMDAPWi4iqhrfL00TmkTdtf6";
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name, // Adjust this based on your item data
          },
          unit_amount: Math.round(item.price * 100), // Stripe requires amount in cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: forAppointments
        ? `${process.env.CLIENT_URL}/patient/myAppointments`
        : `${process.env.CLIENT_URL}/patient/home`,
      cancel_url: forAppointments
        ? `${process.env.CLIENT_URL}/patient/myAppointments`
        : `${process.env.CLIENT_URL}/patient/home`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(400).json({
      error:
        "Credit card payment failed. Please check your card details and try again.",
      details: error.message,
    });
  }
};

const processPayment = async (req, res) => {
  const { id } = req.params;
  const { paymentType, item, paymentMethodId } = req.body.paymentData;
  try {
    const patient = await Patient.findById(id);

    if (req.body.paymentData.familyMemberEmail) {
      const familyPatient = await Patient.findOne({
        email: req.body.paymentData.familyMemberEmail.value,
      });

      if (!familyPatient) {
        return res
          .status(400)
          .json({ message: "Family member as patient not found" });
      }

      // Check if the family member is linked to patient
      const linkedFamilyMember = patient.familyMembers.find(
        (member) => member.email === familyPatient.email
      );

      if (!linkedFamilyMember) {
        return res
          .status(400)
          .json({ message: "Family member is not linked to this patient" });
      }

      if (
        familyPatient.subscribedPackage &&
        !req.body.paymentData.forAppointments
      ) {
        return res.status(400).json({
          message: "Family Member is already subscribed to a health package",
        });
      }
    }
    switch (paymentType) {
      case "wallet":
        if (patient.wallet >= item.price) {
          patient.wallet -= item.price;
          await patient.save();
          res
            .status(200)
            .json({ message: "Payment with wallet balance successful" });
        } else {
          res.status(400).json({
            message: "Insufficient funds in wallet.",
          });
        }
        break;
      case "creditCard":
        await processCreditCardPayment(res, item);
        break;
      default:
        res.status(500).json({ message: "Invalid payment type" });
    }
  } catch (error) {
    console.error("Process payment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// sprint 3
const getFamilyMember = async (req, res) => {
  const patientId = req.params.id;
  const familyMemberEmail = req.query.familyMemberEmail;
  try {
    const patient = await Patient.findById(patientId);
    const familyMember = patient.familyMembers.find(
      (member) => member.email === familyMemberEmail
    );
    const familyMemberDoc = await Patient.findOne({
      email: familyMemberEmail,
    });

    const subscribedPackage = familyMemberDoc.subscribedPackage;

    if (subscribedPackage?.cancellationDate) {
      const cancellationDate = subscribedPackage.cancellationDate;
      const currentDate = new Date();
      const isToday =
        cancellationDate.getFullYear() === currentDate.getFullYear() &&
        cancellationDate.getMonth() === currentDate.getMonth() &&
        cancellationDate.getDate() === currentDate.getDate();
      if (isToday) {
        familyMemberDoc.subscribedPackage = null;
        await familyMemberDoc.save();
        subscribedPackage = null;
      }
    }

    const familyMemberAppointments = await Appointments.find({
      patient: familyMemberDoc._id,
      acceptance: "accepted",
    }).populate("doctor");

    res.status(200).json({
      status: "success",
      familyMember: familyMemberDoc,
      relationship: familyMember.relationship,
      familyMemberAppointments: familyMemberAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const patientProfile = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);
    const subscribedPackage = patient.subscribedPackage;
    if (subscribedPackage?.cancellationDate) {
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
    res.status(200).json({
      patient: patient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscribedPackage = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    if (patient.subscribedPackage) {
      const subscribedPackage = patient.subscribedPackage;
      const packageOffered = await Package.findById({
        _id: subscribedPackage.packageId,
      });

      return res.status(200).json({
        status: "success",
        subscribedPackage: packageOffered,
      });
    }
    res.status(400).json({
      status: "fail",
      message: "Patient is not subscribed to any health package",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscribedPackageForFamilyMember = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);
    const registeredFamilyMembersEmails = patient.familyMembers.map(
      (member) => member.email
    );

    // check if at least one family member is subscribed to a health package
    const subscribedFamilyMember = await Patient.findOne({
      email: { $in: registeredFamilyMembersEmails },
      // his subscribedPackage is not null
      subscribedPackage: { $ne: null },
    });

    if (subscribedFamilyMember) {
      const subscribedPackage = subscribedFamilyMember.subscribedPackage;
      const packageOffered = await Package.findById({
        _id: subscribedPackage.packageId,
      });

      return res.status(200).json({
        status: "success",
        subscribedPackage: packageOffered,
      });
    }
    res.status(400).json({
      status: "fail",
      message: "No family member is subscribed to any health package",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const familyMembers = patient.familyMembers;
    await patient.save();
    res.status(200).json({
      status: "success",
      familyMembers: familyMembers,
      message: "Family Member added successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const viewPrescription = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);

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

    if (req.query.doctor != "") {
      filter.doctor = req.query.doctor;
    }

    if (req.query.date != "") {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }
    if (req.query.isFilled != "") {
      filter.isFilled = req.query.isFilled;
    }

    filter.patient = req.params.id;

    const prescriptions = await Prescription.find(filter).populate("doctor");

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
    const appointments = await Appointments.find({
      patient: patientId,
      status: "upcoming",
    }).populate("doctor");

    res.status(200).json({ appointments: appointments });
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
    const appointments = await Appointments.find({
      patient: patientId,
      status: "completed",
    }).populate("doctor");

    res.status(200).json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// sprint 3

const downloadPrescriptionPDF = async (req, res) => {
  try {
    const prescriptionId = req.params.id;

    // Check if the prescription exists
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Prescription_${prescriptionId}.pdf`
    );

    // Pipe the PDF to the response stream
    doc.pipe(res);

    // Add prescription data to the PDF
    doc.fontSize(12).text("Medication:");
    prescription.medication.forEach((med) => {
      doc
        .fontSize(12)
        .text(
          `- Name: ${med.name}, Dosage: ${med.dosage}, Price: ${med.price} EGP`
        );
    });
    doc.fontSize(12).text(`Notes: ${prescription.notes}`);
    doc.fontSize(12).text(`Date: ${prescription.date}`);
    doc.fontSize(12).text(`Is Filled: ${prescription.isFilled ? "Yes" : "No"}`);

    // End the PDF creation
    doc.end();

    // You can save the PDF to a file if needed
    // doc.pipe(fs.createWriteStream(`Prescription_${prescriptionId}.pdf`));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPatientNotifications = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Check if the patient exists
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Retrieve all notifications for the specific patient
    const notifications = await Notification.find({ patient: patientId });

    res.status(200).json({ status: "success", notifications: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAppointmentNotifications = async (req, res) => {
  try {
    const patientId = req.params.patientid;
    const appointmentId = req.params.appointmentid;

    const patient = await Patient.findById(patientId);
    const appointment = await Appointments.findById(appointmentId);
    const doctor = await Doctor.findById(appointment.doctor);

    let notificationMessagePatient = "";
    let notificationMessageDoctor = "";
    const appointmentDate = new Date(appointment.date);
    const localDate = appointmentDate.toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    const doctorName = `${doctor.fName} ${doctor.lName}`;
    const patientName = `${patient.fName} ${patient.lName}`;

    if (appointment.status === "upcoming") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} is scheduled for ${localDate}`;
      notificationMessageDoctor = `Your appointment with ${patientName} is scheduled for ${localDate}`;
    } else if (appointment.status === "cancelled") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} on ${localDate} has been cancelled`;
      notificationMessageDoctor = `Your appointment with ${patientName} on ${localDate} has been cancelled`;
    } else if (appointment.status === "rescheduled") {
      notificationMessagePatient = `Your appointment with Dr. ${doctorName} on ${localDate} has been rescheduled`;
      notificationMessageDoctor = `Your appointment with ${patientName} on ${localDate} has been rescheduled`;
    } else if (appointment.status === "follow-up") {
      notificationMessagePatient = `Your follow-up appointment with Dr. ${doctorName} on ${localDate} has been scheduled`;
      notificationMessageDoctor = `Your follow-up appointment with ${patientName} on ${localDate} has been scheduled`;
    }

    // Create a new notification
    const newNotificationDoctor = await Notification.create({
      doctor: doctor._id,
      title: "Appointment Update",
      message: notificationMessageDoctor,
      date: new Date(),
      read: false,
    });

    // Create a new notification
    const newNotificationPatient = await Notification.create({
      patient: patient._id,
      title: "Appointment Update",
      message: notificationMessagePatient,
      date: new Date(),
      read: false,
    });

    await sendNotificationsByEmail(doctor.email, [newNotificationDoctor]);
    await sendNotificationsByEmail(patient.email, [newNotificationPatient]);

    res.status(200).json({
      status: "success",
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendNotificationsByEmail = async (patientEmail, notifications) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // configure your email provider here
      service: "gmail",
      auth: {
        user: "3projectalpha3@gmail.com",
        pass: "ncgo dehg lebs zazh",
      },
    });

    // Compose email message
    const mailOptions = {
      from: "3projectalpha3@gmail.com",
      to: patientEmail,
      subject: "New Notifications",
      text: `You have new notifications:\n\n${formatNotifications(
        notifications
      )}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Helper function to format notifications for email
const formatNotifications = (notifications) => {
  // Customize the formatting based on your needs
  return notifications
    .map((notification) => `${notification.title}: ${notification.message}`)
    .join("\n");
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
        doctors: [],
        uniqueSpecialties: uniqueSpecialties,
      });
    } else {
      res.status(200).json({
        doctors: doctorsToDisplay,
        uniqueSpecialties: uniqueSpecialties,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterDoctors = async (req, res) => {
  try {
    const patientId = req.params.id;
    const specialty = req.query.specialty;
    const date = req.query.date;
    const filter = {};
    const doctorIDS = [];
    const specificDate = new Date(date.toString() + ":00.000+00:00");

    if (date != "") {
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

    if (specialty != "") {
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
        doctors: [],
        uniqueSpecialties: uniqueSpecialties,
      });
    } else {
      res.status(200).json({
        doctors: doctorsToDisplay,
        uniqueSpecialties: uniqueSpecialties,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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

    if (req.query.date != "") {
      var min_date = new Date(req.query.date);
      var max_date = new Date(req.query.date);
      min_date.setHours(0, 0, 0, 0);
      max_date.setHours(23, 59, 59, 999);
      filter.date = {
        $gte: min_date,
        $lt: max_date,
      };
    }

    if (req.query.status != "") {
      filter.status = req.query.status;
    }

    filter.patient = req.params.id;

    const appointments = await Appointments.find(filter).populate("doctor");

    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const viewAppointments = async (req, res) => {
  const patientId = req.params.id;

  try {
    const appointments = await Appointments.find({
      patient: patientId,
      acceptance: "accepted",
    }).populate("doctor");

    res.json({ appointments: appointments });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const doctorDetails = async (req, res) => {
  const patientId = req.params.patientid;
  const doctorId = req.params.doctorid;
  try {
    const doctor = await Doctor.findById({ _id: doctorId });
    const doc = await doctorDisplay(patientId, doctor);
    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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
    const familyMembers = currentPatient.familyMembers;
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

    return res.status(200).json({
      message: "Family members both got linked successfully",
      familyMembers: familyMembers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// SARAS REQS

//sprint 1

const getFamilyMembers = async (req, res) => {
  try {
    const patientID = req.params.id;

    const patient = await Patient.findById(patientID);

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers;

    if (!familyMembers) {
      return res.status(200).json({ patientFamily: [] });
    } else {
      res.status(200).json({ patientFamily: familyMembers });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      doctors: doctorsToDisplay,
      uniqueSpecialties: uniqueSpecialties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMyDoctors = async (req, res) => {
  try {
    const patientID = req.params.id;
    const appointments = await Appointments.find({
      patient: patientID,
    }).populate("doctor");
    if (!appointments) {
      return res.status(200).json({ doctors: [] });
    }
    const uniqueDoctorIds = new Set();
    const doctors = appointments.reduce((uniqueDoctors, appointment) => {
      const doctorId = appointment.doctor._id.toString(); // Convert ObjectId to string
      if (!uniqueDoctorIds.has(doctorId)) {
        uniqueDoctorIds.add(doctorId);
        uniqueDoctors.push(appointment.doctor);
      }
      return uniqueDoctors;
    }, []);

    const doctorsToDisplay = await doctorsDisplay(patientID, doctors);

    res.status(200).json({ doctors: doctorsToDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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
    const packageToBeSubscribed = await Package.findById(packageId);

    if (patient.subscribedPackage) {
      return res
        .status(400)
        .json({ message: "Patient is already subscribed to a health package" });
    }

    if (patient.wallet < packageToBeSubscribed.price) {
      return res.status(400).json({ message: "Insufficient funds in wallet." });
    }

    const today = new Date();
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

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
    const email = req.body.email.value;
    const currentPatient = await Patient.findById(patientId);
    const packageToBeSubscribed = await Package.findById(packageId);

    const familyPatient = await Patient.findOne({ email });

    if (!familyPatient) {
      return res
        .status(400)
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
      return res.status(400).json({
        message: "Family Member is already subscribed to a health package",
      });
    }

    const today = new Date();
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

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
//sprint 3

const rescheduleAppointmentforPatient = async (req, res) => {
  const patientId = req.params.patientid;
  const appointmentId = req.params.appointmentid;
  const newAppointmentId = req.body.appointmentRechedueledTo;

  try {
    const oldAppointment = await Appointments.findById(appointmentId);
    const newAppointment = await Appointments.findById(newAppointmentId.value);

    newAppointment.status = "rescheduled";
    newAppointment.isAvailable = false;
    newAppointment.patient = patientId;
    newAppointment.type = oldAppointment.type;

    await newAppointment.save();

    oldAppointment.status = "available";
    oldAppointment.isAvailable = true;
    oldAppointment.patient = null;
    oldAppointment.type = "general";
    await oldAppointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment rescheduled successfully.",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const requestFollowUpAppointment = async (req, res) => {
  const patientId = req.params.patientid;
  const newAppointment = req.body.followUpAppointment;

  try {
    const patient = await Patient.findById(patientId);
    const newFollowUpAppointment = await Appointments.findById(
      newAppointment.value
    );

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
    const originalSessionPrice = newFollowUpAppointment.price;
    const discountedPrice =
      originalSessionPrice - originalSessionPrice * (sessionDiscount / 100);

    if (patient.wallet < discountedPrice) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient funds in the wallet",
      });
    }

    patient.wallet -= discountedPrice;

    // Update patient's wallet
    await Patient.findOneAndUpdate(
      { _id: patientId },
      { $set: { wallet: patient.wallet } }
    );

    newFollowUpAppointment.status = "upcoming";
    newFollowUpAppointment.isAvailable = false;
    newFollowUpAppointment.patient = patientId;
    newFollowUpAppointment.type = "follow-up";
    newFollowUpAppointment.acceptance = "pending";
    newFollowUpAppointment.price = discountedPrice;

    // Save the follow-up appointment
    await newFollowUpAppointment.save();

    const patientAppointments = await Appointments.find({
      patient: patientId,
      acceptance: "accepted",
    }).populate("doctor");

    res.status(200).json({
      status: "success",
      message: "Follow-up appointment requested successfully.",
      patientAppointments: patientAppointments,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointments.findById(appointmentId);

    const patientId = appointment.patient;
    const patient = await Patient.findById(patientId);

    const appointmentTime = appointment.date.getTime();
    const currentTime = Date.now();
    const timeDiffInHours = Math.abs(appointmentTime - currentTime) / 36e5; // Calculate time difference in hours

    let refundAmount = 0;

    if (timeDiffInHours < 24) {
      appointment.status = "cancelled";
    } else {
      refundAmount = appointment.price;
      appointment.status = "cancelled";
      patient.wallet += refundAmount;
    }

    // Update patient's wallet
    await Patient.findOneAndUpdate(
      { _id: patientId },
      { $inc: { wallet: refundAmount } }
    );

    await appointment.save();

    res.status(200).json({
      status: "success",
      message: "Appointment cancelled.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const changePatientPassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const patient = await Patient.findOne({ username });

    if (oldPassword != patient.password) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain an uppercase letter and a digit.",
      });
    }

    patient.password = newPassword;
    await patient.save();

    // Update the associated user's password
    // const user = await User.findOne({ username });
    // user.password = await bcrypt.hash(newPassword, 10);
    //await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// hana's stuff

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Try to find the user in each collection
    const patient = await Patient.findById(id);
    if (patient) {
      return res.status(200).json(patient);
    }
    const doctor = await Doctor.findById(id);
    if (doctor) {
      return res.status(200).json(doctor);
    }
    const admin = await Admin.findById(id);
    if (admin) {
      return res.status(200).json(admin);
    }

    // If none of the above, user not found
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  registerPatient,
  viewPrescription,
  getAllPatients,
  addFamilyMember,
  filterThePrescription,
  selectPrescription,
  filterDoctors,
  searchForDoctor,
  filterMyAppointments,
  filterAvailableAppointments,
  doctorDetails,
  getFamilyMembers,
  getAllDoctors,
  viewAppointments,
  getMyDoctors,
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
  getWalletAmount,
  uploadDocument,
  getMedicalHistory,
  removeDocument,
  processPayment,
  downloadPrescriptionPDF,
  rescheduleAppointmentforPatient,
  requestFollowUpAppointment,
  cancelAppointment,
  getFamilyMember,
  patientProfile,
  getSubscribedPackage,
  getSubscribedPackageForFamilyMember,
  changePatientPassword,
  getUserById,
  createAppointmentNotifications,
  getPatientNotifications,
};
