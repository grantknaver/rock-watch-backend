
const express = require('express'); 
const app = express(); 
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
  
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin",  
               "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers",  
               "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

app.get('*', (req, res) => {
  res.send('Rock watch backend');
});

app.get('/api/asteroids-data', async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`
      const response = await axios.get(url);
      const data = response.data;
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
  
app.listen(4500, () => { 
    console.log('Server listening on port 4500'); 
});