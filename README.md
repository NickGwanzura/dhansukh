# Dhan Sukh House - Legacy of Heartfelt Hospitality

A high-conversion, luxury hospitality landing page for **Dhan Sukh House**, a premium estate in Belvedere, Harare, featuring a 4-bedroom villa and self-catering garden cottages.

**Live Site:** https://dhansukh-main.vercel.app

---

## 🔐 Admin Panel Access

**URL:** https://dhansukh-main.vercel.app/#admin

**Password:** `dhansukh_2026$`

**📖 Image Upload Guide:** See [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) for detailed instructions on uploading and managing images.

---

## 🌿 Our Story
At Dhan-Sukh, our story is rooted in a 65-year tradition of open doors and open hearts. The name reflects our deepest values: **Dhan (Wealth)** and **Sukh (Happiness)**. To us, true wealth is the abundance of happiness we can share with others.

---

## ✨ Key Features
- **Premium Hero Slider**: A high-end, automatic cross-fade carousel with Ken Burns zoom effects and manual controls.
- **Legacy Hospitality**: Over 6 decades of hosting experience.
- **Eco-Friendly**: 10kVA Solar System & Borehole Water.
- **Vegetarian-Friendly**: Strictly vegetarian-only main villa kitchen (Outdoor Gazebo available for BBQ).
- **Advanced Admin Dashboard**: 
    - **Booking Manager**: Visual calendar to block or open dates for each unit.
    - **Hero Management**: Add, remove, and reorder slides for the main landing page.
    - **Content Engine**: Edit descriptions, prices, and features with real-time updates.
    - **Image Upload**: Direct upload or external URL support (Imgur, etc.).

---

## 📸 Managing Images

### Quick Start

1. Go to **Admin Panel** (`#admin`)
2. Enter password: `dhansukh_2026$`
3. Choose tab: **Hero Slider** or **Villa & Cottages**
4. Upload images or add URLs
5. Click **Save Changes**

### Two Upload Methods

| Method | Best For | Max Size |
|--------|----------|----------|
| **Direct Upload** | Small images (<500KB) | ~50MB total storage |
| **External URL** (Imgur) | Large/high-res images | Unlimited |

### 📖 Full Guide
See **[IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md)** for:
- Step-by-step upload instructions
- Imgur integration (works in Zimbabwe)
- Image compression tips
- Storage management
- Troubleshooting

---

## ☁️ Storage Information

The app uses **IndexedDB** for local browser storage:
- **Capacity:** ~50MB
- **Data Saved:** Images, bookings, content
- **Limitation:** Storage is per-browser (not shared across devices)

**Recommendation:** Use **external URLs** (Imgur) for large images to save space.

---

## 🛠 Tech Stack
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom transitions
- **Storage**: IndexedDB (browser-based)
- **Icons**: Lucide React
- **Build**: Vite

---

## 📞 Booking Information
All bookings are managed via WhatsApp: **+263 712 201 681**

---

## 📁 Project Structure

```
├── App.tsx                 # Main application
├── components/             # React components
│   ├── AdminPanel.tsx     # Admin dashboard
│   ├── Hero.tsx           # Hero slider
│   ├── MainHouse.tsx      # Villa section
│   ├── Cottages.tsx       # Cottages section
│   └── ...
├── lib/
│   └── storage.ts         # IndexedDB storage
├── api/
│   └── upload.js          # Image upload endpoint
├── IMAGE_UPLOAD_GUIDE.md  # 📖 Image upload manual
└── README.md              # This file
```

---

*Created with heartfelt hospitality for the Dhan-Sukh Family.*
