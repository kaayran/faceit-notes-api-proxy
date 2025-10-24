export function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function sendSuccess(res, data, status = 200) {
  setCorsHeaders(res);
  return res.status(status).json(data);
}

export function sendError(res, error) {
  setCorsHeaders(res);
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  
  return res.status(status).json({ error: message });
}

export function handleFaceitError(error) {
  console.error("FACEIT API error:", error);
  
  if (error.status) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: "Internal server error",
  };
}
