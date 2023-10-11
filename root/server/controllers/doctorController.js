import Doctor from "../models/Doctor.js";

// submit a request to register as a doctor

const getAllDoctors = async (req, res) => {
  async (req, res) => {
    try {
      const doctors = await Doctor.find({}, "username password"); // Retrieve only username and password fields
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

const renderHomePage = function (req, res) {
  res.render("doctorHome", { userId: req.params.id });
};

const renderProfilePage = async function (req, res) {
  const doctorid = req.params.id;
  const doctor = await Doctor.findById(doctorid);
  res.render("doctorProfile", { userId: req.params.id, doctor: doctor });
};

const renderRegisterationPage = function (req, res) {
  res.render("doctorRegister");
};

const createDoctor = async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.create(req.body);
    res.render("login", {
      submittedSuccessfully: true,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    const doctorid = req.params.userid;
    res.render("packageManagement", {
      userId: doctorid,
      doctor: doctor,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export {
  createDoctor,
  updateDoctorProfile,
  getAllDoctors,
  renderHomePage,
  renderRegisterationPage,
  renderProfilePage,
};
