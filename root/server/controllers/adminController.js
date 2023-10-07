import Admin from "../models/Admin.js";

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

export { createAdmin };
