const router = require("express").Router();
const { default: axios } = require("axios");
require("dotenv").config();
const APIKEY = process.env.APIKEY;

router.get("/city", (req, res) => {
  res.json({
    success: true,
    message: "City list",
    data: cities,
  });
});

router.post("/weather", async (req, res) => {
  try {
    console.log("object", req.body.city);
    const cityName = req.body.city;
    if (!cityName) {
      return res.status(400).json({ error: "City parameter is required." });
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&units=metric`
    );
    let responseData = filterDataByDay(response.data.list);
    res.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
const cities = [
  "Tokyo",
  "London",
  "Paris",
  "Sydney",
  "Rome",
  "Cairo",
  "Berlin",
  "Delhi",
  "Moscow",
  "Seoul",
  "Rio",
  "Istanbul",
  "Nairobi",
  "Lima",
  "Bangkok",
];
const filterDataByDay = (data) => {
  const filteredData = [];
  const uniqueDays = new Set();

  data.forEach((entry) => {
    const day = entry.dt_txt.split(" ")[0];

    if (!uniqueDays.has(day)) {
      uniqueDays.add(day);
      filteredData.push(entry);
    }
  });

  return filteredData;
};
