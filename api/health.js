import { setCorsHeaders } from "../lib/response-handler.js";

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.VERCEL_ENV || "development",
    version: "1.0.0",
    checks: {
      api_key: process.env.SERVER_API_KEY ? "configured" : "missing"
    }
  };

  return res.status(200).json(healthData);
}

