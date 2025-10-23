export default async function handler(req, res) {
    const { q } = req.query;
    const apiKey = process.env.API_KEY;
  
    const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(q)}`, {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
  
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  }
  