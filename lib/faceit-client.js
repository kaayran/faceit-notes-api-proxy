class FaceitClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://open.faceit.com/data/v4";
  }

  async request(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw {
        status: response.status,
        message: text || response.statusText,
      };
    }

    return await response.json();
  }

  async getMatch(matchId) {
    return await this.request(`/matches/${encodeURIComponent(matchId)}`);
  }

  async getPlayer(playerId) {
    return await this.request(`/players/${encodeURIComponent(playerId)}`);
  }

  async getPlayers(playerIds) {
    const promises = playerIds.map(async (playerId) => {
      try {
        const playerData = await this.getPlayer(playerId);
        return {
          playerId: playerData.player_id,
          nickname: playerData.nickname,
          avatar: playerData.avatar,
          country: playerData.country,
          games: playerData.games,
        };
      } catch (error) {
        console.error(`Failed to fetch player ${playerId}:`, error);
        return {
          playerId,
          nickname: null,
          error: true,
        };
      }
    });

    return await Promise.all(promises);
  }

  extractPlayerIds(matchData) {
    const playerIds = [];

    if (matchData?.teams) {
      for (const team of Object.values(matchData.teams)) {
        if (team.roster) {
          for (const player of team.roster) {
            if (player.player_id) {
              playerIds.push(player.player_id);
            }
          }
        }
      }
    }

    return playerIds;
  }
}

export default FaceitClient;
