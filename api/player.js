import FaceitClient from "../lib/faceit-client.js";
import { validateParams } from "../lib/validation.js";
import { sendSuccess, sendError, handleFaceitError } from "../lib/response-handler.js";

export default async function handler(req, res) {
  const apiKey = process.env.SERVER_API_KEY;
  const { playerId } = req.query;

  const validation = validateParams(apiKey, { playerId });
  if (!validation.valid) {
    return sendError(res, validation.error);
  }

  try {
    const client = new FaceitClient(apiKey);
    const playerData = await client.getPlayer(playerId);

    return sendSuccess(res, {
      playerId: playerData.player_id,
      nickname: playerData.nickname,
      avatar: playerData.avatar,
      country: playerData.country,
      games: playerData.games,
    });

  } catch (error) {
    return sendError(res, handleFaceitError(error));
  }
}
