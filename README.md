# FACEIT Notes API Proxy

API proxy for FACEIT data to hide API keys on client side.

## API Endpoints

### 1. Get Match Data with Players

```
GET /api/match?matchId={matchId}
```

Returns match data with all players info (current nicknames, avatars, countries).

**Response:**
```json
{
  "matchId": "1-xxx",
  "players": [
    {
      "playerId": "abc123",
      "nickname": "Player1",
      "avatar": "...",
      "country": "...",
      "games": {...}
    }
  ]
}
```

---

### 2. Get Single Player Info

```
GET /api/player?playerId={playerId}
```

Returns player information.

**Response:**
```json
{
  "playerId": "abc123",
  "nickname": "Player1",
  "avatar": "...",
  "country": "...",
  "games": {...}
}
```

---

### 3. Get Players from Match (Historical Nicknames)

```
GET /api/match-stats?matchId={matchId}
```

Returns players with their nicknames as they were during the match. Useful for getting historical nicknames.

**Response:**
```json
{
  "matchId": "1-xxx",
  "players": [
    {
      "playerId": "abc123",
      "nickname": "Player1"
    },
    {
      "playerId": "def456",
      "nickname": "Player2"
    }
  ]
}
```

---

### 4. Search for Players

```
GET /api/search?nickname={nickname}&game={game}&country={country}&offset={offset}&limit={limit}
```

Search for players by nickname. 

**Parameters:**
- `nickname` (required)
- `game` (optional) - e.g. "cs2", "dota2"
- `country` (optional) - e.g. "us", "ua"
- `offset` (optional) - default: 0
- `limit` (optional) - default: 20, max: 100

**Response:**
```json
{
  "start": 0,
  "end": 20,
  "items": [
    {
      "player_id": "...",
      "nickname": "...",
      "avatar": "...",
      "country": "...",
      "games": {...}
    }
  ]
}
```
