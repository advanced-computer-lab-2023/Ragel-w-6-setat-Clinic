import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

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

 const searchForDoctor = async (req, res) =>{
     const { name } = req.query;
     const { speciality } = req.query;

     try{
      const doctors = await Doctor.find({
       ...req.body
      });
      res.json(doctors);

     }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Server error' });
     }
 }


export { createPatient };
export { searchForDoctor };
