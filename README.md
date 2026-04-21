# Woobly & Friends — Website Setup Guide
## For Sachi 🌸

---

## 📁 Folder Structure

```
woobly-site/
├── index.html          ← Home page
├── about/
│   └── index.html      ← About / Whimsiverse lore / FAQ
├── story/
│   └── index.html      ← Blog / Stories page
├── admin/
│   ├── index.html      ← Your private CMS dashboard (write blogs here)
│   └── config.yml      ← CMS settings
├── posts/
│   └── index.json      ← Blog post index (auto-updated by CMS)
├── assets/
│   ├── style.css       ← Shared styles
│   ├── purplebg.jpg    ← Your purple background ← PUT THIS HERE
│   ├── hero_image.jpg  ← Your hero art          ← PUT THIS HERE
│   ├── logo.png        ← Your logo              ← PUT THIS HERE
│   ├── fluffyPFP.png   ← Fluffy's pfp           ← PUT THIS HERE
│   ├── bellabennyPFP.png                        ← PUT THIS HERE
│   ├── MimiPFP.png                              ← PUT THIS HERE
│   ├── greggyPfp.png                            ← PUT THIS HERE
│   ├── star_yellow.svg ← Star assets            ← PUT THESE HERE
│   ├── star_pink.svg
│   ├── star_blue.svg
│   └── star_white.svg
└── netlify.toml        ← Netlify deployment config
```

---

## 🚀 How to Deploy (Step by Step)

### Step 1 — Put your assets in the right place
Copy all your image files into the `assets/` folder:
- `purplebg.jpg` — your purple blob background
- `hero_image.jpg` — the hero artwork
- `logo.png` — your logo
- All 4 character PFP pngs
- All 4 star SVGs (`star_yellow.svg`, `star_pink.svg`, `star_blue.svg`, `star_white.svg`)

### Step 2 — Push to GitHub
1. Create a free account at github.com
2. Create a new repository called `wooblynfrens-website`
3. Upload this whole folder to that repo

### Step 3 — Deploy on Netlify
1. Go to netlify.com and sign up (free)
2. Click "Add new site" → "Import an existing project" → connect GitHub
3. Select your `wooblynfrens-website` repo
4. Click Deploy — it goes live in ~1 minute!
5. In Netlify settings, connect your custom domain: `wooblynfrens.com`

### Step 4 — Set up Admin Dashboard (for writing blogs)
1. In Netlify: go to **Site Settings → Identity → Enable Identity**
2. Under Identity → Registration: set to **Invite only** (so only you can log in)
3. Invite yourself by email
4. In `admin/config.yml`, replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
5. Visit `wooblynfrens.com/admin` → log in with your Netlify Identity email
6. You're in! Write blogs, manage content — all from your browser 🎉

---

## ✍️ How to Write a Blog Post

1. Go to `wooblynfrens.com/admin`
2. Log in
3. Click **Stories & Blog Posts** → **New Post**
4. Fill in: Title, Date, Tag (e.g. "Story" or "Behind the Scenes"), Excerpt, Cover image, Body
5. Click **Publish**
6. Your post appears on the Stories page automatically!

---

## 🛍️ Payhip Embed (Shop Section)

To show your products on the homepage:
1. Log into Payhip
2. Go to **Store Settings → Embed Store**
3. Copy the embed `<script>` code
4. Open `index.html`, find the comment `REPLACE THIS DIV WITH YOUR PAYHIP EMBED CODE`
5. Replace the placeholder div with your Payhip code

---

## 📬 Mailerlite Newsletter Embed

1. Log into Mailerlite
2. Go to **Forms → Embedded Forms** → create or select your form
3. Copy the embed HTML
4. Open `index.html`, find `REPLACE THIS BLOCK WITH YOUR MAILERLITE EMBED CODE`
5. Paste your Mailerlite code there

---

## 🌐 shop.wooblynfrens.com Subdomain

In your domain DNS settings (wherever you bought wooblynfrens.com):
- Add a **CNAME record**: `shop` pointing to your Payhip store URL

---

## 💜 Total Monthly Cost: $0

- Netlify hosting: **Free**
- Decap CMS: **Free**
- Netlify Identity (login): **Free** (up to 1000 users)
- GitHub: **Free**
- Domain: already paid (yearly only)

---

Made with ✦ imagination · Whimsiverse © 2025
