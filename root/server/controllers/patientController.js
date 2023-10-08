import Patient from "../models/Patient.js";

// create (register) a patient

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getFamilyMembers = async (req, res) => {
  try {
    const { email } = req.body; // Get patient's email from the request body

    // Find the patient using the provided email in the familyMembers array
    const patient = await Patient.findOne({ 'familyMembers.email': email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Extract family members from the patient object
    const familyMembers = patient.familyMembers.filter(member => member.email === email);

    res.json(familyMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export { createPatient,getFamilyMembers };


