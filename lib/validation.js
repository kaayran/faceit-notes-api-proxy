export function validateApiKey(apiKey) {
  if (!apiKey) {
    return {
      valid: false,
      error: {
        status: 500,
        message: "SERVER_API_KEY is missing in environment variables",
      },
    };
  }
  return { valid: true };
}

export function validateRequiredParam(paramName, paramValue) {
  if (!paramValue) {
    return {
      valid: false,
      error: {
        status: 400,
        message: `Missing ${paramName} parameter`,
      },
    };
  }
  return { valid: true };
}

export function validateParams(apiKey, params) {
  const apiKeyCheck = validateApiKey(apiKey);
  if (!apiKeyCheck.valid) {
    return apiKeyCheck;
  }

  for (const [paramName, paramValue] of Object.entries(params)) {
    const paramCheck = validateRequiredParam(paramName, paramValue);
    if (!paramCheck.valid) {
      return paramCheck;
    }
  }

  return { valid: true };
}
