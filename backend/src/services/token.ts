import jwt from "jsonwebtoken";

// Create a JWT token with user ID
export const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Create a token for reset password (without jwt)
export const generatePasswordResetToken = (email: string): string => {
  // Create a token payload with the user's email
  const payload = { email };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // Generate a JWT token with the payload, secret key, and expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};
