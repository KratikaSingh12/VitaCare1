import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // If no Authorization header or incorrect format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized: Token missing or invalid format",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    // console.log("🔐 Token received:", token);

    // Verify token
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("✅ Decoded user ID:", decoded.id);
    

    // Attach user ID to request for further use
    req.body.userId = decoded.id;

    next(); // Proceed to route/controller
  } catch (error) {
    console.error("❌ JWT verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Invalid token. Access denied.",
    });
  }
};

export default authUser;
