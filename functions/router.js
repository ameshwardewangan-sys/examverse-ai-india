/* ==========================================================
   EXAMVERSE AI v3.0
   MASTER AI ROUTER (FINAL CONNECT SYSTEM)
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");

/* ==========================================================
   IMPORT MODULES
========================================================== */

const { aiTutor } = require("./ai-tutor");
const { weatherAPI } = require("./weather");
const { trainStatus } = require("./train");
const { currentAffairs } = require("./news");

/* ==========================================================
   SMART ROUTER
========================================================== */

exports.examverseAI = onRequest(async (req, res) => {

  try {

    const { type, query, city, train, category } = req.query;

    /* ======================================================
       AI TUTOR
    ====================================================== */

    if (type === "ai") {
      req.body = { question: query };
      return aiTutor(req, res);
    }

    /* ======================================================
       WEATHER
    ====================================================== */

    if (type === "weather") {
      req.query.city = city || "Delhi";
      return weatherAPI(req, res);
    }

    /* ======================================================
       TRAIN STATUS
    ====================================================== */

    if (type === "train") {
      req.query.train = train;
      return trainStatus(req, res);
    }

    /* ======================================================
       NEWS / CURRENT AFFAIRS
    ====================================================== */

    if (type === "news") {
      req.query.category = category || "general";
      return currentAffairs(req, res);
    }

    /* ======================================================
       DEFAULT RESPONSE
    ====================================================== */

    return res.json({
      success: true,
      message: "ExamVerse AI Router Active 🚀",
      availableAPIs: [
        "ai",
        "weather",
        "train",
        "news"
      ]
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
