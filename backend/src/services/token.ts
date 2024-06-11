import jwt from "jsonwebtoken";

// Create a JWT token with user ID
export const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
