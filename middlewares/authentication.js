import dotenv from "dotenv";
dotenv.config();
import pkg from "jsonwebtoken";
const { sign, decode } = pkg;
import { StatusCodes } from "http-status-codes";

// CONSTANTS

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

// Generating Access Token

const generateAccessToken = (payload) => {
  return sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

// Generating Refresh Token

const generateRefreshToken = (payload) => {
  return sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

// Generating Access Token via Refresh Token

const generateAccessTokenFromRefreshToken = (refreshToken) => {
  const payload = decode(refreshToken, REFRESH_TOKEN_SECRET);
  return generateAccessToken(payload);
};

// Verify Token

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Access denied" });
  }
  try {
    const decoded = decode(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};

// EXPORTING MODULES

export {
  generateAccessToken as GENERATEACCESSTOKEN,
  generateRefreshToken as GENERATEREFRESHTOKEN,
  generateAccessTokenFromRefreshToken as GENERATEACCESSTOKENFROMREFRESHTOKEN,
  verifyToken as VERIFYTOKEN,
};
