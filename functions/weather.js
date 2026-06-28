/* ==========================================================
   EXAMVERSE AI v3.0
   WEATHER API (Tomorrow.io Integration)
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");

/* ==========================================================
   WEATHER FUNCTION
========================================================== */

exports.weatherAPI = onRequest(async (req, res) => {

  try {

    const city = req.query.city || "Delhi";

    const apiKey = process.env.TOMORROW_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "Weather API key not set in environment"
      });
    }

    /* ------------------------------------------------------
       STEP 1: Get location coordinates (simple fallback)
       (Tomorrow.io supports direct city query too)
    ------------------------------------------------------ */

    const weatherURL = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`;

    const response = await fetch(weatherURL);

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: data.message || "Weather API error"
      });
    }

    /* ------------------------------------------------------
       STEP 2: Format response
    ------------------------------------------------------ */

    const result = {
      city: city,
      temperature: data.data.values.temperature,
      humidity: data.data.values.humidity,
      windSpeed: data.data.values.windSpeed,
      weatherCode: data.data.values.weatherCode,
      time: data.data.time
    };

    return res.json({
      success: true,
      source: "Tomorrow.io",
      data: result
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
