import Doctor from "../models/Doctor.js";
import jwt from "jsonwebtoken";

const requireAuthDoctor = async (req, res, next) => {
  // verify authentication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Doctor.findOne({ username }).select("username");
    if (!req.user) {
      return res.status(401).json({ error: "Request is not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuthDoctor };
