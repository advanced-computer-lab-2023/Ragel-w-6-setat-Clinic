import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const requireAuthAdmin = async (req, res, next) => {
  // verify authentication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Admin.findOne({ username }).select("username");
    if (!req.user) {
      return res.status(401).json({ error: "Request is not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuthAdmin };
