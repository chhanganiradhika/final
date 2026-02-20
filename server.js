// ============================================================
// RADHIKA CHHANGANI — LEGENDARY PORTFOLIO BACKEND
// Node.js + Express + MongoDB + Nodemailer
// ============================================================

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.static(path.join(__dirname, "public")));

// Rate limit — 5 submissions per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many messages sent. Please wait 15 minutes." },
});

// ── MONGODB ─────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rc-legendary")
  .then(() => console.log("✓ MongoDB connected"))
  .catch(err => console.error("✗ MongoDB:", err.message));

// ── SCHEMA ──────────────────────────────────────────────────
const msgSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
  subject: { type: String, required: true, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  ip:      String,
  read:    { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", msgSchema);

// ── NODEMAILER ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendEmails({ name, email, subject, message }) {
  if (!process.env.EMAIL_USER) return;
  const gradient = "background:linear-gradient(135deg,#4361ee,#7209b7,#f72585)";
  await transporter.sendMail({
    from: `"Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `[RC Portfolio] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0f4ff;border-radius:20px;overflow:hidden;">
        <div style="${gradient};padding:30px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:2rem;">⚡ New Message</h1>
        </div>
        <div style="padding:30px;color:#0f0f23;">
          <p><b>From:</b> ${name} (${email})</p>
          <p><b>Subject:</b> ${subject}</p>
          <hr style="border:none;border-top:1px solid #e0e8ff;margin:20px 0"/>
          <p style="line-height:1.8;">${message.replace(/\n/g,"<br>")}</p>
          <a href="mailto:${email}" style="${gradient};color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;display:inline-block;margin-top:20px;font-weight:700;">Reply to ${name}</a>
        </div>
      </div>`,
  });
  await transporter.sendMail({
    from: `"Radhika Chhangani" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name}! ⚡`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0f4ff;border-radius:20px;overflow:hidden;">
        <div style="${gradient};padding:30px;text-align:center;">
          <h1 style="color:#fff;margin:0;">Hey ${name}! ⚡</h1>
        </div>
        <div style="padding:30px;color:#0f0f23;">
          <p style="line-height:1.8;">Thanks for reaching out! I've received your message and will get back to you very soon.</p>
          <p style="line-height:1.8;color:#7b7ba0;">— Radhika Chhangani<br/>CS Student · General Secretary · Tech Committee Head</p>
        </div>
      </div>`,
  });
}

// ── ROUTES ───────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "⚡ legendary", ts: new Date().toISOString() }));

app.post("/api/contact", limiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const errors = [];
    if (!name?.trim() || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email required.");
    if (!subject?.trim() || subject.trim().length < 3) errors.push("Subject too short.");
    if (!message?.trim() || message.trim().length < 10) errors.push("Message too short (min 10 chars).");
    if (message?.length > 2000) errors.push("Message too long.");
    if (errors.length) return res.status(400).json({ success: false, message: errors.join(" ") });

    await new Message({ name: name.trim(), email: email.trim().toLowerCase(), subject: subject.trim(), message: message.trim(), ip: req.ip }).save();
    sendEmails({ name, email, subject, message }).catch(e => console.error("Email error:", e.message));
    res.status(201).json({ success: true, message: "Message sent! ⚡" });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(" ") });
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

app.get("/api/messages", async (_req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: msgs.length, messages: msgs });
  } catch { res.status(500).json({ success: false }); }
});

// Serve frontend
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => {
  console.log(`\n⚡ Legendary server running → http://localhost:${PORT}`);
  console.log(`📦 DB: ${process.env.MONGO_URI || "mongodb://localhost/rc-legendary"}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER || "not configured"}\n`);
});
