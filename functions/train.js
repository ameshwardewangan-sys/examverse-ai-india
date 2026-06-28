/* ==========================================================
   EXAMVERSE AI v3.0
   TRAIN STATUS API
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");

/* ==========================================================
   LIVE TRAIN STATUS
========================================================== */

exports.trainStatus = onRequest(async (req, res) => {

  try {

    const trainNo = req.query.train || "";

    if (!trainNo) {
      return res.status(400).json({
        success: false,
        error: "Train number required"
      });
    }

    /* ------------------------------------------------------
       NOTE:
       You need a real Railway API provider here
       Example: RapidAPI Indian Railways API
       OR other rail data provider
    ------------------------------------------------------ */

    const API_KEY = process.env.TRAIN_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Train API key not configured"
      });
    }

    // Placeholder API URL (replace with real provider)
    const url = `https://api.railway.example/v1/train/${trainNo}?apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: data.message || "Train API error"
      });
    }

    return res.json({
      success: true,
      train: trainNo,
      data: data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
