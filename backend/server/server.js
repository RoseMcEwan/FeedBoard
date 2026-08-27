const express = require("express");             
const app = express();
const port = 3000;
const farmRoutes = require("./data")
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(farmRoutes);

app.get("/api/weather", async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    if(!lat || !lon) {
        return res.status(400).json({
    error: "Latitude and longitude are required"});
}
  
try {
  const response = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
    {
      headers: {
        "User-Agent":
          "CowWeatherStudentProject/1.0 rosemc867@gmail.com",
      },
    }
  );

  const weatherData = await response.json();

  res.json(weatherData);
} catch (error) {
  console.error(error);

  res.status(500).json({
    error: "Unable to retrieve weather data",
  });
}
})

app.listen(port, () => {                                
console.log(`Feed-Board server running on http://localhost:${port}`);
})