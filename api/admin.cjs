/*==================================================
# Sanatan AI

This script is powered and written by Sanatan AI Team.

No one, in any case, could use, view, edit, share,
 copy, sell or buy this software unless permitted
 by the owner.

copyright © 2025-26 Sanatan AI
===================================================*/
const express = require("express");
const path = require("path");
const router = express.Router();
const { getAllSessions, getHistory, setHistory } = require("./store.cjs");

// Middleware to check password for protected admin APIs
const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const password = process.env.ADMIN_PASSWORD || "shivam$"; // Default password if not set

  if (authHeader === password) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
};

// --- Public Admin Page (HTML) ---
// This route must remain public so that visiting /admin loads the dashboard UI.
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/index.html"));
});


// --- Login check (unprotected) ---
// Used by the admin HTML page to verify the password and store it client-side.
router.post("/auth", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "shivam$";
  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// Protect all other routes
router.use(checkAuth);

// Get all sessions (Users)
router.get("/users", async (req, res) => {
  const sessions = await getAllSessions();
  const sessionList = Object.keys(sessions).map(id => {
    const history = sessions[id];
    // Try to find a user name if it was ever stored in the history (unlikely but possible if we change frontend)
    // For now, return ID, message count, and preview
    const msgCount = history.length;
    const lastMessage = history.length > 0 ? history[history.length - 1] : null;
    let preview = "";
    if (lastMessage && lastMessage.parts && lastMessage.parts.length > 0) {
        preview = lastMessage.parts[0].text || "(Media/Function)";
    }
    
    return {
      id,
      messageCount: msgCount,
      lastActive: id, // Id is timestamp
      preview
    };
  });
  
  // Sort by newest first
  sessionList.sort((a, b) => b.id - a.id);
  
  res.json(sessionList);
});

// Get specific chat history
router.get("/chats/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const history = await getHistory(sessionId);
  res.json(history);
});

// Edit chat history
router.put("/chats/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const { history } = req.body;
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: "History must be an array" });
  }
  await setHistory(sessionId, history);
  res.json({ success: true });
});

module.exports = router;
