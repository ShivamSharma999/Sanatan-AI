const express = require("express"),
  path = require("path"),
  nodemailer = require("nodemailer"),
  { escapeJsonString, open, isLocal } = require("./helper.js"),
  { getHistory, setHistory, deleteHistory, getMemory, setMemory, getUser, setSessions } = require("./store.js"),
  adminRouter = require("./admin"),
  { GoogleGenAI } = require("@google/genai"),
  cors = require("cors"),
  port = isLocal ? 3000 : Math.round(Math.random() * 9999),
  app = express(),
  whiteList = ["https://sanatan-ai.vercel.app/"];
require('colors');
require("dotenv").config(); // Load environment variables from .env file
isLocal ? whiteList.push("http://localhost:" + port) : "";
const corsOptions = {
  optionsSuccessStatus: 200,
  preflightContinue: true,
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

// Middleware to parse JSON request bodies
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../public/main'))); // Serve static files from /public/main  
if (isLocal) {
  open("http://localhost:3000");
}

// Admin Page Route - Serve HTML
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// Admin API Router
app.use("/admin", adminRouter);


const ai = new GoogleGenAI({
  apiKey: process.env.TRASH,
});

/**
 * Google OAuth callback endpoint for app authentication
 * Exchanges authorization code for user information
 */
app.post("/auth/google", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = "http://localhost:5612/auth";
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange failed:", error.red);
      return res.status(400).json({ error: "Failed to exchange authorization code" });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info using access token
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      console.error("User info fetch failed".red);
      return res.status(400).json({ error: "Failed to fetch user information" });
    }

    const userInfo = await userInfoResponse.json();

    // Return user info
    res.json({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      id: userInfo.id,
    });
  } catch (error) {
    console.error("Google OAuth error:", error.red);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Endpoint to handle streaming content generation.
 * It expects a POST request with a 'history' array in the body.
 */
app.post("/generate", async (req, res) => {
  try {
    const { requestOptions } = req.body;

    // Basic validation for the requestOptions object
    if (!requestOptions || !Array.isArray(requestOptions.contents)) {
      return res.status(400).json({
        error:
          'The "requestOptions" property is required and must be an array.',
      });
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Flush the headers to establish the connection

    // Generate the content stream
    const result = await ai.models.generateContentStream(requestOptions);

    // Stream the response to the client
    for await (const chunk of result) {
      res.write(`${escapeJsonString(JSON.stringify(chunk))}`);
    }

    // End the response stream
    res.end();
  } catch (error) {
    res.status(500).end('{"error": "Internal Server Error"}');
    console.log(`Error generating content: ${error}`.red);
  }
});

// --- Chat history (per-session) API: only send new message; backend merges with history ---

app.get("/chat/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const history = await getHistory(sessionId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error getting chat history: ${error}`.red);
  }
});

app.put("/chat/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { history } = req.body;
    await setHistory(sessionId, history);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error saving chat history: ${error}`.red);
  }
});

app.delete("/chat/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    await deleteHistory(sessionId);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error deleting chat history: ${error}`.red);
  }
});

// --- AI Memory API ---

app.get("/memory", async (req, res) => {
  try {
    const { username } = req.body;
    const memory = await getMemory(username);
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memory" });
  }
});

app.put("/memory", async (req, res) => {
  try {
    const { username, memory } = req.body;
    if (!Array.isArray(memory)) return res.status(400).json({ error: "Memory must be an array" });
    if (!username) return res.status(400).json({ error: "User Email must be provided" })
    await setMemory(username, memory);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save memory" });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await getUser(username);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/user/sessions", async (req, res) => {
  try {
    const { user, sessions } = req.body;
    if (!user) {
      return res.status(400).json({ error: "User email is required" });
    }
    await setSessions(user, sessions);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e })
  }
})

/**
 * POST /chat - Send only the new user message; backend merges with stored history and streams response.
 * Body: { sessionId, newMessage: { role, parts }, config: { systemInstruction?, tools?, thinkingConfig? } }
 */
app.post("/chat", async (req, res) => {
  try {
    const { sessionId, newMessage, config } = req.body;

    if (!sessionId || !newMessage || !newMessage.parts) {
      return res.status(400).json({
        error: 'Required: sessionId and newMessage (with parts).',
      });
    }

    const history = await getHistory(sessionId);
    const contents = [...history, newMessage];

    const requestOptions = {
      model: config?.model || "gemini-2.5-flash",
      contents,
      config: config || {},
    };

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const result = await ai.models.generateContentStream(requestOptions);

    const modelParts = [];
    for await (const chunk of result) {
      const parts = chunk.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.text) modelParts.push({ text: part.text });
        if (part.functionCall) modelParts.push({ functionCall: part.functionCall });
      }
      res.write(escapeJsonString(JSON.stringify(chunk)));
    }

    res.end();
  } catch (error) {
    res.status(500).end('{"error": "Internal Server Error"}');
    console.error(`Error in /chat: ${error}`.red);
  }
});

app.post("/v1/generate", async (req, res) => {
  try {
    const { requestOptions } = req.body;

    // Basic validation for the requestOptions object
    if (!requestOptions || !Array.isArray(requestOptions.contents)) {
      return res.status(400).json({
        error:
          'The "requestOptions" property is required and must be an array.',
      });
    }

    res.setHeader("Content-Type", "application/json");

    // Generate the content
    const result = await ai.models.generateContent(requestOptions);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(`Error generating content: ${error}`.red);
  }
});


app.post("/mail", async (req, res) => {
  const { mail, subject, text, html } = req.body;
  try {
    let mailOptions = {
      from: process.env.FROM,
      to: mail,
      subject: subject,
    };

    if (html) {
      mailOptions.html = html
    }
    else if (text) {
      mailOptions.text = text
    }

    await sendEmail(mailOptions);
    return res.end();
  } catch (e) {
    return res.status(500).json({ error: e.message ? e.message : e });
  }
});


app.get("/", (req, res) => {
  const filePath = path.join(__dirname, './public/main/index.html');
  res.sendFile(filePath);
});

const sendEmail = async (mailDetails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.FROM,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    await transporter.sendMail(mailDetails);
  } catch (error) {
    throw new Error(error.message);
  }
};

app.listen(port, () => {
  console.log("Server is running on port:".green, port.toString().green);
});
module.exports = app;