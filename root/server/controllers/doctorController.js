import Doctor from "../models/Doctor.js";

// submit a request to register as a doctor
const createDoctor = async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export { createDoctor };
