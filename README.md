# ⚡ RADHIKA CHHANGANI — LEGENDARY PORTFOLIO

> *Aisa portfolio banega na... Recruiter: "She's DIFFERENT." 👑*

A visually explosive, award-worthy personal portfolio with cinematic particle systems, awakening sequence, energy cursor trails, 3D card tilts, and a full Node.js + MongoDB backend.

---

## 🌈 Design Language

| Element | Choice |
|---------|--------|
| Palette | Electric Blue + Neon Purple + Hot Pink + Teal + Peach |
| Style | Bright Glassmorphism · Energy Aura Borders |
| Font Display | Syne (800 weight) |
| Font Body | Cabinet Grotesk |
| Font Mono | Fira Code |
| Theme | Bright · Energetic · Vibrant · Light |

---

## ✨ Features

- **⚡ Awakening Sequence** — POWER. LEADERSHIP. CREATION. word-by-word cinematic reveal on load
- **🎨 Particle Hero Canvas** — 80 connected particles that react to mouse movement
- **💫 Energy Cursor Trail** — colorful particle trail follows cursor with smooth laggy outer ring
- **🎬 Preloader** — spinning rings + animated progress bar + particle canvas
- **📊 Counter Animation** — stat numbers count up on scroll into view
- **🃏 3D Card Tilt** — project/achievement cards tilt in 3D toward mouse
- **🌊 Parallax Orbs** — glowing background orbs shift with mouse position
- **📜 Scroll Reveals** — staggered reveal animations as content enters viewport
- **👑 Leadership Timeline** — futuristic command-zone style with animated dots
- **🏆 Achievement Badges** — glassmorphism level-unlocked cards
- **📩 Contact Form** — live form with backend validation + auto-reply
- **📱 Fully Responsive** — hamburger nav, fluid layouts, mobile-optimized

---

## 📁 Folder Structure

```
rc-legendary/
├── index.html              ← Full portfolio HTML (6 sections)
├── style.css               ← Complete styles (~700 lines, bright vibrant)
├── script.js               ← All JS (particles, cursor, awakening, form)
├── README.md               ← This file
└── backend/
    ├── server.js           ← Express API + static serving
    ├── package.json        ← Dependencies
    └── .env.example        ← Config template
```

---

## 🚀 Running Locally

### ⚡ Option A — Frontend Only (instant)

Simply open `index.html` in your browser. Everything works except the contact form submission.

---

### 🔥 Option B — Full Stack

**Requirements:** Node.js 18+, MongoDB (local or Atlas)

```bash
# 1. Setup backend
cd backend
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and Gmail credentials

# 3. Move frontend files into backend's public folder
mkdir -p public
cp ../index.html ../style.css ../script.js public/

# 4. Start the server
npm run dev        # development (nodemon auto-restart)
npm start          # production

# 5. Open browser
open http://localhost:3000
```

---

## 🌐 Gmail App Password Setup

1. Go to your Google Account → Security
2. Enable 2-Step Verification
3. Search "App passwords" → Create new → Select "Mail"
4. Copy the 16-character password → Paste as `EMAIL_PASS` in `.env`

---

## 🌍 Deploying to Production

### Frontend → Vercel / Netlify
Upload `index.html`, `style.css`, `script.js`. Update the fetch URL in `script.js` from `/api/contact` to your backend URL.

### Backend → Railway / Render / Fly.io
1. Push `backend/` to GitHub
2. Connect on Railway/Render
3. Add environment variables
4. Deploy!

### MongoDB → Atlas (Free Tier)
1. Sign up at mongodb.com/atlas
2. Create free M0 cluster
3. Get connection string
4. Set as `MONGO_URI`

---

## 🎨 Customization

### Update personal info
Search in `index.html` for:
- `radhika@example.com` → your email
- `linkedin.com/in/radhika` → your LinkedIn URL
- `github.com/radhika` → your GitHub URL

### Add your photo
Find the `.av-inner` div and add:
```html
<img src="your-photo.jpg" alt="Radhika" style="width:100%;height:100%;object-fit:cover;border-radius:24px;"/>
```

### Add real projects
Update the `.pj-card` sections with your actual GitHub and live demo URLs.

### Change colors
Edit CSS variables at the top of `style.css`:
```css
:root {
  --blue:   #4361ee;    /* Primary accent */
  --pink:   #f72585;    /* Hot accent */
  --teal:   #4cc9f0;    /* Cool accent */
  ...
}
```

---

## 📡 API Reference

### POST `/api/contact`
Submit a contact form message.

**Body:**
```json
{
  "name": "Arjun Sharma",
  "email": "arjun@example.com",
  "subject": "Let's collaborate!",
  "message": "Hi Radhika, I loved your portfolio..."
}
```

**Success:**
```json
{ "success": true, "message": "Message sent! ⚡" }
```

**Rate limit:** 5 messages per IP per 15 minutes.

### GET `/api/health`
```json
{ "status": "⚡ legendary", "ts": "..." }
```

### GET `/api/messages`
Returns all stored messages (protect with auth in production).

---

## ⚡ Made with energy for Radhika Chhangani

*Power. Leadership. Creation.*
