/* ==========================================================
   EXAMVERSE AI v3.0
   NEWS / CURRENT AFFAIRS API
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");

/* ==========================================================
   NEWS API FUNCTION
========================================================== */

exports.currentAffairs = onRequest(async (req, res) => {

  try {

    const category = req.query.category || "general";
    const country = req.query.country || "in";

    /* ------------------------------------------------------
       API KEY (News provider)
       Example providers:
       - NewsAPI.org
       - GNews API
       - Mediastack
    ------------------------------------------------------ */

    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        error: "News API key not configured"
      });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: data.message || "News API error"
      });
    }

    const articles = data.articles.map(item => ({
      title: item.title,
      description: item.description,
      source: item.source.name,
      url: item.url,
      time: item.publishedAt
    }));

    return res.json({
      success: true,
      count: articles.length,
      data: articles
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
/* ==========================================================
   EXAMVERSE AI v3.0
   NEWS / CURRENT AFFAIRS API (FINAL)
========================================================== */

const { onRequest } = require("firebase-functions/v2/https");

/* ==========================================================
   CURRENT AFFAIRS
========================================================== */

exports.currentAffairs = onRequest(async (req, res) => {

  try {

    const category = req.query.category || "general";
    const country = req.query.country || "in";

    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        error: "NEWS_API_KEY not set"
      });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: data.message || "News API error"
      });
    }

    const articles = data.articles.map(a => ({
      title: a.title,
      description: a.description,
      source: a.source.name,
      url: a.url,
      time: a.publishedAt
    }));

    return res.json({
      success: true,
      count: articles.length,
      data: articles
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
