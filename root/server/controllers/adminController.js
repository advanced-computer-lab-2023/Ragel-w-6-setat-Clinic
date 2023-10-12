import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Package from "../models/Package.js";

const getAllAdmins = async (req, res) => {
  async (req, res) => {
    try {
      const admins = await Admin.find({}, "username password"); // Retrieve only username and password fields
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

const renderHomePage = function (req, res) {
  const adminId = req.params.id;
  res.render("adminHome", { userId: adminId });
};

const renderAddAdminPage = function (req, res) {
  const adminId = req.params.id;
  res.render("addAdmin", { userId: adminId });
};

const renderPackagePage = async (req, res) => {
  try {
    const packages = await Package.find({});
    const adminId = req.params.id;
    res.render("packageManagement", {
      userId: adminId,
      healthPackages: packages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create an admin
const createAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.create(req.body);
    const message = "Admin successfully added.";
    res.render("addAdmin", { userId: adminId, message: message });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// have an admin create a package
const createPackage = async (req, res) => {
  try {
    const pack = await Package.create(req.body);
    const packages = await Package.find({});
    const adminId = req.params.id;
    res.render("packageManagement", {
      userId: adminId,
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// have an admin delete a package

const deletePackage = async (req, res) => {
  try {
    const pack = await Package.findByIdAndDelete(req.params.packageid);
    const packages = await Package.find({});
    const adminId = req.params.userid;
    res.render("packageManagement", {
      userId: adminId,
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update a package

const updatePackage = async (req, res) => {
  try {
    const pack = await Package.findOneAndUpdate(
      { _id: req.params.packageid },
      {
        ...req.body,
      }
    );
    const packages = await Package.find({});
    const adminId = req.params.userid;
    res.render("packageManagement", {
      userId: adminId,
      healthPackages: packages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//LOJAINS REQS

const deleteAdmin = async (req, res) => {
  try {
    const filter = {
      username: req.body.username,
    };
    const deleteAdminResult = await Admin.deleteMany(filter);

    if (deleteAdminResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        admin: deleteAdminResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const filter = {
      username: req.body.username,
    };
    const deletedPatientResult = await Patient.deleteMany(filter);

    if (deletedPatientResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        deleted: deletedPatientResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const filter = {
      username: req.body.username,
    };
    const deleteDoctorResult = await Doctor.deleteMany(filter);

    if (deleteDoctorResult.deletedCount == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        patient: deleteDoctorResult,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const viewUnregisteredDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find({
      isRegistered: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        doctor: doctor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export {
  createAdmin,
  createPackage,
  deletePackage,
  updatePackage,
  getAllAdmins,
  renderHomePage,
  renderAddAdminPage,
  renderPackagePage,
  deleteAdmin,
  deletePatient,
  deleteDoctor,
  viewUnregisteredDoctors,
};
