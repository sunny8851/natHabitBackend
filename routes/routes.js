const router = require("express").Router();
const { default: axios } = require("axios");
require("dotenv").config();
const APIKEY = process.env.APIKEY;
const db = require("../helper/db");
router.get("/User", (req, res) => {
  res.json({
    success: true,
    message: "User route",
  });
});
router.get("/city", (req, res) => {
  res.json({
    success: true,
    message: "City list",
    data: cities,
  });
});
router.get("/savedcity", async (req, res) => {
  const query = "SELECT * FROM savedCity";
  try {
    const getResult = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
    res.json({ success: true, data: getResult });
  } catch (e) {
    console.log(e);
  }
});
router.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.city.key;
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
router.post("/savecity", async (req, res) => {
  try {
    const insertResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO savedCity SET ?",
        { cityName: req.body.name },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error while saving" });
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

  // Iterate through the data and include only the first entry for each day
  data.forEach((entry) => {
    const day = entry.dt_txt.split(" ")[0]; // Assuming dt_txt contains date information

    if (!uniqueDays.has(day)) {
      uniqueDays.add(day);
      filteredData.push(entry);
    }
  });

  return filteredData;
};
