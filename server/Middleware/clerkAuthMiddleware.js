// clerkAuthMiddleware.js
import { verifyToken } from "@clerk/clerk-sdk-node";

const clerkAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    // Extract the token from the header
    const token = authHeader.split("Bearer ")[1].trim();

    // Verify the token; adjust 'audience' as per your Clerk API configuration
    const verifiedToken = await verifyToken(token, { audience: "api://default" });
    
    // Optionally attach the verified token or user info to the request object
    req.auth = verifiedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default clerkAuthMiddleware;
