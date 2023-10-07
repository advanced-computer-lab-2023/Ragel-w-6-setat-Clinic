import Admin from "../models/Admin.js";
import Package from "../models/Package.js";

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
      { _id: id },
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

export { createAdmin, createPackage };
