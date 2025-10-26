# Setup Guide

## Local Development

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example
cp .env.example .env
```

Open `.env` and add your FACEIT API key:

```env
SERVER_API_KEY=your_faceit_api_key_here
```

### 3. Start Local Server

```bash
# Start in development mode
vercel dev
```

The application will be available at `http://localhost:3000`

### 4. Verify It Works

Open in your browser:
- `http://localhost:3000` - Home page with documentation
- `http://localhost:3000/api/player?playerId=test` - Test request

## Deploy to Vercel

### Via Vercel CLI

```bash
# Deploy to production
vercel --prod
```

### Via Web Interface

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add the `SERVER_API_KEY` environment variable in project settings
5. Click "Deploy"

## Getting a FACEIT API Key

1. Register at [FACEIT Developers](https://developers.faceit.com/)
2. Create a new application
3. Copy the API key from the "API Keys" section
4. Add it to your `.env` file or Vercel environment variables

## Project Structure

```
faceit-notes-api-proxy/
├── api/                     # Serverless API endpoints
│   ├── match.js             # GET /api/match
│   ├── match-stats.js       # GET /api/match-stats
│   ├── player.js            # GET /api/player
│   └── search.js            # GET /api/search
├── docs/                    # Documentation
│   └── SETUP.md             # Setup guide
├── lib/                     # Helper libraries
│   ├── faceit-client.js     # FACEIT API client
│   ├── response-handler.js  # Response handling
│   └── validation.js        # Input validation
├── public/                  # Static files
│   ├── index.html           # Main documentation page
│   ├── styles.css           # Stylesheet
│   └── script.js            # Client-side JavaScript
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
├── package.json             # NPM configuration
├── README.md                # Main documentation
└── vercel.json              # Vercel configuration
```

## Testing the API

### Using curl

```bash
# Get player information
curl "http://localhost:3000/api/player?playerId=abc123"

# Get match data
curl "http://localhost:3000/api/match?matchId=1-xxx"

# Search for players
curl "http://localhost:3000/api/search?nickname=s1mple&game=cs2"
```

### Using Browser

Simply open the URL in your browser:
- `http://localhost:3000/api/player?playerId=abc123`
- `http://localhost:3000/api/search?nickname=player`

## Debugging

### Checking Logs

```bash
# Locally - check the terminal where vercel dev is running

# On Vercel - open Dashboard > Deployments > Function Logs
```

### Common Issues

**Issue**: `Missing SERVER_API_KEY`  
**Solution**: Make sure the `.env` file is created with the correct key

**Issue**: CORS errors  
**Solution**: Check settings in `vercel.json` and `response-handler.js`

**Issue**: 404 on API endpoints  
**Solution**: Make sure Vercel correctly detected the serverless functions

## Additional Resources

- [FACEIT API Documentation](https://developers.faceit.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

