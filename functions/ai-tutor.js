/* ==========================================================
   EXAMVERSE AI v3.0
   functions/ai-tutor.js
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

/*
  API Keys ko code me hardcode mat karein.
  Firebase Secrets ya environment variables use karein.

  Example:
  process.env.GEMINI_API_KEY
  process.env.OPENAI_API_KEY
*/

exports.aiTutor = onRequest(async (req, res) => {

  try {

    const {
      question,
      mode = "general",
      provider = "gemini",
      language = "en"
    } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required."
      });
    }

    let systemPrompt = "You are ExamVerse AI Tutor.";

    switch (mode) {

      case "ssc":
        systemPrompt =
          "You are an SSC exam expert. Give short and accurate answers.";
        break;

      case "railway":
        systemPrompt =
          "You are a Railway exam coach.";
        break;

      case "banking":
        systemPrompt =
          "You are a Banking exam mentor.";
        break;

      case "upsc":
        systemPrompt =
          "You are a UPSC mentor with detailed explanations.";
        break;

      default:
        systemPrompt =
          "You are ExamVerse AI Tutor.";
    }

    if (language === "hi") {
      systemPrompt += " Reply in simple Hindi.";
    }

    /* AI provider integration agle part me hoga */

    return res.json({

      success: true,

      provider,

      mode,

      reply:
        "AI provider integration will be added in Part 2."

    });

  } catch (err) {

    logger.error(err);

    return res.status(500).json({

      success: false,

      error: err.message

    });

  }

});
