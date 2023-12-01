import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// For Prod
export const PORT = process.env.PORT || '3003';
export const WEBSITE_URL =
  process.env.WEBSITE_URL || `https://localhost:${PORT}`;

// For express session
export const SESSION_SECRET = process.env.SESSION_SECRET || 'liham_api_secret';

export const corsOptions: cors.CorsOptions = {
  origin: WEBSITE_URL,
  credentials: true,
};

// Cloudinary Secrets
export const CLOUD_NAME = process.env.CLOUD_NAME || 'cloud_name';
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY || 'cloud_key';
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || 'cloud_secret';
