import Admin from "../models/Admin.js";
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
    res.status(201).json({
      status: "success",
      data: {
        pack,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
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
};
