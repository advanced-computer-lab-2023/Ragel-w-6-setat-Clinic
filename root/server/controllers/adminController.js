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
  res.render("adminHome");
};
// create an admin
const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        admin,
      },
    });
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

// have an admin delete a package

const deletePackage = async (req, res) => {
  try {
    const pack = await Package.findByIdAndDelete(req.params.id);
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

// update a package

const updatePackage = async (req, res) => {
  try {
    const pack = await Package.findOneAndUpdate(
      { _id: req.params.id },
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
};
