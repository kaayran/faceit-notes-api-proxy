import FaceitClient from "../lib/faceit-client.js";
import { validateApiKey } from "../lib/validation.js";
import { sendSuccess, sendError, handleFaceitError, setCorsHeaders } from "../lib/response-handler.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  const apiKey = process.env.SERVER_API_KEY;
  const { nickname, game, country, offset, limit } = req.query;

  const apiKeyValidation = validateApiKey(apiKey);
  if (!apiKeyValidation.valid) {
    return sendError(res, apiKeyValidation.error);
  }

  if (!nickname) {
    return sendError(res, {
      status: 400,
      message: "Missing nickname parameter",
    });
  }

  const parsedOffset = offset ? parseInt(offset, 10) : 0;
  const parsedLimit = limit ? parseInt(limit, 10) : 20;

  if (isNaN(parsedOffset) || parsedOffset < 0) {
    return sendError(res, {
      status: 400,
      message: "Invalid offset parameter",
    });
  }

  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return sendError(res, {
      status: 400,
      message: "Invalid limit parameter (must be between 1 and 100)",
    });
  }

  try {
    const client = new FaceitClient(apiKey);
    const result = await client.searchPlayers({
      nickname,
      game,
      country,
      offset: parsedOffset,
      limit: parsedLimit,
    });

    return sendSuccess(res, result);

  } catch (error) {
    return sendError(res, handleFaceitError(error));
  }
}


