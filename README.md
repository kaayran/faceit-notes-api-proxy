# FACEIT Notes API Proxy

> Secure API proxy for FACEIT data. Hides API keys from client-side applications.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Overview

This serverless API proxy provides secure access to FACEIT data without exposing API keys on the client side. Built with Vercel serverless functions, it offers four main endpoints for retrieving player and match information.

**Features:**
- Secure API key storage on the server
- CORS enabled for client-side applications
- Parameter validation and error handling
- Fast serverless functions
- Interactive documentation page

## Getting Started

For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)

**Quick Deploy:**
1. Clone this repository
2. Add `SERVER_API_KEY` environment variable
3. Deploy to Vercel

Full interactive documentation is available on the home page after deployment.

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns the health status of the API.

**Example Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-26T12:34:56.789Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0",
  "checks": {
    "api_key": "configured"
  }
}
```

---

### 1. Match Data with Players

```http
GET /api/match?matchId={matchId}
```

Returns match data with all players (current nicknames, avatars, countries).

**Parameters:**
- `matchId` *(required)* - FACEIT match ID

**Example Response:**
```json
{
  "matchId": "1-xxx",
  "players": [
    {
      "playerId": "abc123",
      "nickname": "Player1",
      "avatar": "https://...",
      "country": "ua",
      "games": { "cs2": {...} }
    }
  ]
}
```

---

### 2. Player Information

```http
GET /api/player?playerId={playerId}
```

Returns information about a single player.

**Parameters:**
- `playerId` *(required)* - FACEIT player ID

**Example Response:**
```json
{
  "playerId": "abc123",
  "nickname": "Player1",
  "avatar": "https://...",
  "country": "ua",
  "games": {
    "cs2": {
      "skill_level": 10,
      "faceit_elo": 2000
    }
  }
}
```

---

### 3. Historical Nicknames from Match

```http
GET /api/match-stats?matchId={matchId}
```

Returns players with their nicknames at the time of the match. Useful for getting historical nicknames.

**Parameters:**
- `matchId` *(required)* - FACEIT match ID

**Example Response:**
```json
{
  "matchId": "1-xxx",
  "players": [
    {
      "playerId": "abc123",
      "nickname": "OldNickname1"
    },
    {
      "playerId": "def456",
      "nickname": "OldNickname2"
    }
  ]
}
```

---

### 4. Search Players

```http
GET /api/search?nickname={nickname}&game={game}&country={country}&offset={offset}&limit={limit}
```

Search for players by nickname with additional filters.

**Parameters:**
- `nickname` *(required)* - Nickname to search for
- `game` *(optional)* - Filter by game (e.g., "cs2", "dota2", "lol")
- `country` *(optional)* - Filter by country (e.g., "ua", "ru", "us")
- `offset` *(optional)* - Pagination offset (default: 0)
- `limit` *(optional)* - Number of results (default: 20, max: 100)

**Example Response:**
```json
{
  "start": 0,
  "end": 20,
  "items": [
    {
      "player_id": "abc123",
      "nickname": "SearchedPlayer",
      "avatar": "https://...",
      "country": "ua",
      "games": { "cs2": {...} }
    }
  ]
}
```

## Project Structure

```
faceit-notes-api-proxy/
├── api/                     # Serverless API functions
│   ├── match.js             # Get match data
│   ├── match-stats.js       # Get historical data
│   ├── player.js            # Get player data
│   └── search.js            # Search players
├── docs/                    # Documentation
│   └── SETUP.md             # Setup guide
├── lib/                     # Helper modules
│   ├── faceit-client.js     # FACEIT API client
│   ├── response-handler.js  # Response handling
│   └── validation.js        # Parameter validation
├── public/                  # Static files
│   ├── index.html           # Main documentation page
│   ├── styles.css           # Stylesheet
│   └── script.js            # Client-side JavaScript
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
├── package.json             # NPM configuration
├── README.md                # Project documentation
└── vercel.json              # Vercel configuration
```

## Security

- API keys stored securely in environment variables
- CORS enabled for client-side applications
- Input validation and sanitization
- Comprehensive error handling

## Roadmap

### API Features
- [ ] Detailed player statistics and performance metrics
- [ ] Extended match data (rounds, kills, deaths, assists)
- [ ] Player match history
- [ ] Player ELO history and progression
- [ ] Match details with full scoreboard

### Technical Improvements
- [ ] API versioning (`/api/v1/...`)
- [x] Health check endpoint (`/health`)
- [ ] Unified response format (JSend standard)
- [ ] Structured error codes
- [ ] Rate limiting and request throttling
- [ ] OpenAPI/Swagger specification
- [ ] Structured logging (Winston/Pino)
- [ ] Security headers (CSP, HSTS, etc.)
- [ ] HTTP caching strategy
- [ ] Unit and integration tests

Have a feature request? Feel free to open an issue!

## Links

- [Setup Guide](docs/SETUP.md) - Detailed installation and configuration instructions
- [FACEIT API Docs](https://developers.faceit.com/docs) - Official FACEIT API documentation

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT
