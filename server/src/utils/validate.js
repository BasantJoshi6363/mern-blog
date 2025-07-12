import jwt from "jsonwebtoken";
export const validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    let valid = false;
    await jwt.verify(token, "thisissecret");
    return res.status(202).json({
      success: true,
      valid: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
