import FaceitClient from "../lib/faceit-client.js";
import { validateParams } from "../lib/validation.js";
import { sendSuccess, sendError, handleFaceitError, setCorsHeaders } from "../lib/response-handler.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  const apiKey = process.env.SERVER_API_KEY;
  const { matchId } = req.query;

  const validation = validateParams(apiKey, { matchId });
  if (!validation.valid) {
    return sendError(res, validation.error);
  }

  try {
    const client = new FaceitClient(apiKey);
    const matchData = await client.getMatch(matchId);
    const playerIds = client.extractPlayerIds(matchData);
    const players = await client.getPlayers(playerIds);

    return sendSuccess(res, {
      matchId,
      players,
    });

  } catch (error) {
    return sendError(res, handleFaceitError(error));
  }
}

