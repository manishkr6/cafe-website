# CAFÉ ZÉRO · GANGTOK, SIKKIM

> *A contemporary hospitality sanctuary tucked into the rhythm of Gangtok, Sikkim.*
> High-altitude specialty coffee, artisanal slow breakfast, Himalayan views, and quiet luxury.

---

## 1. Overview & Architecture

Café Zéro is a production-grade, highly visual hospitality web platform designed with an editorial aesthetic, GSAP motion design, offline-first sync capabilities, and a full-stack Node.js + Express backend with MongoDB persistence.

- **Frontend**: React 19, Vite, Tailwind CSS v4, GSAP 3 + ScrollTrigger, React Router v7, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB Atlas driver, Nodemailer email alerts.
- **Motion**: GSAP timeline reveals, horizontal multi-panel scroll, parallax imagery, custom magnetic cursor.
- **Accessibility & SEO**: WCAG AA contrast, Schema.org `Restaurant` JSON-LD, sitemap.xml, robots.txt, offline enquiry queueing.

---

## 2. Installation & Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Steps

```bash
# 1. Clone repository & install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env

# 3. Launch full-stack development server (Express + Vite on Port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Environment Variables Configuration

Configure your `.env` file based on `.env.example`:

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | HTTP port for Node.js Express server | `3000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/cafe_zero` |
| `MONGODB_DB_NAME` | MongoDB database name | `cafe_zero` |
| `ADMIN_PIN` | Security PIN for Staff Enquiries Vault | `zero737101` |
| `EMAIL_SERVICE` | Nodemailer service provider | `gmail` |
| `EMAIL_USER` | SMTP sending email address | `bonjour@cafezero.in` |
| `EMAIL_PASSWORD` | SMTP app password | *(your secret app password)* |
| `NOTIFICATION_RECIPIENT` | Target mailbox for new booking alerts | `bonjour@cafezero.in` |

*Note: If `MONGODB_URI` is not provided, the server automatically utilizes a persistent local JSON failover (`enquiries_backup.json`), ensuring seamless offline/local development without crashes.*

---

## 4. Local Development

- `npm run dev`: Starts the integrated Express server which mounts Vite in middleware mode.
- `npm run build`: Compiles production frontend bundle into `dist/`.
- `npm start`: Runs production server serving static assets and API routes.

---

## 5. MongoDB & Backend Setup

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, allow your IP or `0.0.0.0/0` (for cloud hosting).
3. Under **Database Access**, create a user with read/write permissions.
4. Copy the connection string and assign it to `MONGODB_URI` in `.env`.
5. The collections (e.g., `enquiries`) are provisioned automatically on the first enquiry submission.

### API Routes
- `POST /api/enquiries`: Submits a new guest enquiry or table reservation.
- `GET /api/enquiries`: Protected endpoint returning all guest enquiries (Requires `Bearer tok_admin_...` or `x-admin-pin` header).
- `POST /api/auth/login`: Verifies staff security PIN and returns access token.
- `GET /api/health`: Health status and MongoDB connectivity report.

---

## 6. Deployment Guide

### Frontend & Full-Stack Deployment on Render / Railway / Cloud Run
1. Connect your GitHub repository to Render or Railway.
2. Set Build Command: `npm run build`
3. Set Start Command: `node server.js`
4. Set Environment Variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `MONGODB_URI=...`
   - `ADMIN_PIN=...`
   - `EMAIL_USER=...`
   - `EMAIL_PASSWORD=...`

---

## 7. How to Modify Café Content

All café brand content is decoupled from UI code for straightforward client maintenance:

### A. Business Information (`src/data/site.js`)
Edit `src/data/site.js` to modify:
- Address, phone, email, WhatsApp link
- Opening hours and Google Maps embed URL
- Brand tagline and altitude elevation statistics
- 5 Story chapters for the Our Story narrative

### B. Curated Menu (`src/data/menu.js`)
Edit `src/data/menu.js` to add, update, or price items:
```javascript
{
  id: "c-9",
  category: "coffee", // 'coffee' | 'breakfast' | 'small-plates' | 'desserts'
  name: "Cascara Sparkling Soda",
  price: 240,
  isFeatured: true,
  tags: ["Refreshing", "Botanical"],
  description: "Sun-dried coffee cherry infusion with tonic and lime.",
  altitude: "Chilled",
  brewTime: "Sparkling"
}
```

### C. Photography Archive (`src/data/gallery.js`)
Edit `src/data/gallery.js` to update images:
```javascript
{
  id: "gal-13",
  title: "Terrace Cloud Inversion",
  category: "GANGTOK", // 'ALL' | 'CAFÉ' | 'COFFEE' | 'FOOD' | 'PEOPLE' | 'GANGTOK'
  src: "https://your-image-url.jpg",
  aspectRatio: "16:9",
  caption: "Early morning sea of clouds rolling into the valley.",
  location: "Terrace Bar",
  exif: "28mm · ƒ/4.0 · 1/200s · ISO 100",
  featured: true
}
```

---

## 8. License & Credits

© 2026 Café Zéro. Gangtok, Sikkim, India. All rights reserved.
