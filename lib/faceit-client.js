class FaceitClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://open.faceit.com/data/v4";
    this.matchUrl = "https://www.faceit.com/api/match/v2";
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

  async requestMatch(endpoint) {
    const url = `${this.matchUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
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

  async getMatchStats(matchId) {
    return await this.request(`/matches/${encodeURIComponent(matchId)}/stats`);
  }

  async getMatchStatsDetailed(matchId) {
    return await this.requestMatch(`/match/${encodeURIComponent(matchId)}`);
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

  async searchPlayers(params) {
    const queryParams = new URLSearchParams();
    
    if (params.nickname) queryParams.append("nickname", params.nickname);
    if (params.game) queryParams.append("game", params.game);
    if (params.country) queryParams.append("country", params.country);
    if (params.offset !== undefined) queryParams.append("offset", params.offset);
    if (params.limit !== undefined) queryParams.append("limit", params.limit);

    return await this.request(`/search/players?${queryParams.toString()}`);
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

  extractPlayersFromDetailedStats(matchData) {
    const players = [];

    if (matchData?.payload?.teams) {
      const teams = matchData.payload.teams;
      
      for (const faction of Object.values(teams)) {
        if (faction.roster && Array.isArray(faction.roster)) {
          for (const player of faction.roster) {
            if (player.id && player.nickname) {
              players.push({
                playerId: player.id,
                nickname: player.nickname,
              });
            }
          }
        }
      }
    }

    return players;
  }
}

export default FaceitClient;
