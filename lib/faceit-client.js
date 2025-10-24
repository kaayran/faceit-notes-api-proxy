class FaceitClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://open.faceit.com/data/v4";
    this.statsUrl = "https://www.faceit.com/api/stats/v3";
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

  async requestStats(endpoint) {
    const url = `${this.statsUrl}${endpoint}`;
    
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
    return await this.requestStats(`/matches/${encodeURIComponent(matchId)}`);
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

  extractPlayersFromDetailedStats(statsData) {
    const players = [];

    if (Array.isArray(statsData) && statsData.length > 0) {
      const matchData = statsData[0];
      
      if (matchData?.teams && Array.isArray(matchData.teams)) {
        for (const team of matchData.teams) {
          if (team.players && Array.isArray(team.players)) {
            for (const player of team.players) {
              if (player.playerId && player.nickname) {
                players.push({
                  playerId: player.playerId,
                  nickname: player.nickname,
                });
              }
            }
          }
        }
      }
    }

    return players;
  }
}

export default FaceitClient;
