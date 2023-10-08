import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

const searchForPatient =  async( req , res ) =>{
  const { name } = req.query;
  
  try{
    const patients = await Patient.find({
     ...req.body
    });
    res.json(patients);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export {searchForPatient};
