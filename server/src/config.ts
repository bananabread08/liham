import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

export const PORT = process.env.PORT || '3003';
export const WEBSITE_URL =
  process.env.WEBSITE_URL || `https://localhost:${PORT}`;
const allowedOrigins = [WEBSITE_URL];
export const SESSION_SECRET = process.env.SESSION_SECRET || 'liham_api_secret';
export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
