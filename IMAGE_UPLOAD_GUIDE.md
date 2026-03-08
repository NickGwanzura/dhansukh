# Dhan Sukh House - Image Upload Guide

## Admin Access

**URL:** `https://dhansukh-main.vercel.app/#admin`

**Password:** `dhansukh_2026$`

---

## Upload Methods

### ✅ Method 1: Supabase Storage (Recommended)

**Best for:** All image sizes, permanent storage, fast CDN

1. Go to **Admin Panel** → Enter password `dhansukh_2026$`
2. Select tab: **Hero Slider** or **Villa & Cottages**
3. Click **"Supabase"** (blue button)
4. Select your image (up to 50MB)
5. Wait for upload to complete
6. Click **"Save Changes"**

**Features:**
- ✅ 1GB free storage
- ✅ Fast global CDN
- ✅ Permanent URLs (won't expire)
- ✅ Works in Zimbabwe
- ✅ Up to 50MB per file

**Requirements:**
- Must create `property-images` bucket in Supabase dashboard

---

### Method 2: Local Storage (Fallback)

**Best for:** Small images under 500KB, offline use

1. Go to **Admin Panel** → Enter password `dhansukh_2026$`
2. Select tab: **Hero Slider** or **Villa & Cottages**
3. Click **"Local"** (brand/pink button)
4. Select your image (under 500KB recommended)
5. Click **"Save Changes"**

**Storage Limit:** ~50MB total (browser IndexedDB)

**When to use:** When Supabase is not configured or for quick temporary uploads

---

### Method 3: External Image URL

**Best for:** Images already hosted elsewhere

1. Copy the direct image URL (must end in .jpg, .png, .webp)
2. Click **"Add URL"**
3. Paste the URL
4. Click **"Save Changes"**

**Works with:**
- Any direct image link
- Third-party image hosting
- Your own CDN

---

## Image Locations

### Hero Slider (Homepage Banner)
- **Tab:** Hero Slider
- **Recommended Size:** 1920x1080 pixels (16:9)
- **Max Images:** Unlimited with Supabase
- **Display:** Full-screen rotating slideshow
- **Best for:** Stunning exterior shots, pool views, gardens

### Main House (Villa)
- **Tab:** Villa & Cottages → Select "Main House Villa"
- **Main Image:** Displayed on the main card
- **Gallery Images:** Shown when clicking "View Gallery"
- **Recommended Size:** 1200x800 pixels (3:2)

### Garden Cottages
- **Tab:** Villa & Cottages → Select cottage name
- **Main Image:** Displayed on the cottage card
- **Gallery Images:** Shown when clicking "Gallery"
- **Recommended Size:** 800x600 pixels (4:3)

---

## Setting Up Supabase Storage

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up / Log in
3. Create a new project

### Step 2: Get Your Credentials
In your Supabase project dashboard:

**Project URL:**
- Go to **Project Settings** → **API**
- Copy **Project URL**

**API Keys:**
- Copy **anon public** key

### Step 3: Create Storage Bucket
1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name: `property-images`
4. ✅ Check **Public bucket**
5. Click **Save**

### Step 4: Configure Environment Variables
Add to your Vercel project:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Or if using the provided database:
```
SUPABASE_URL=https://hoopumlubrgtodlyfkqi.supabase.co
SUPABASE_ANON_KEY=sb_publishable_qLTQVH58nPOM34aPLB79bQ_LiYnVhpm
```

---

## Recommended Workflow

### For Best Results:

1. **Take photos** in good lighting
2. **Use Supabase Upload** for all images (best quality & speed)
3. **Add multiple images** to each section
4. **Click Save Changes** after each section

### Quick Tips:

| Tip | Why It Helps |
|-----|--------------|
| Use Supabase | Permanent storage, fast loading |
| Use JPG format | Smaller file sizes |
| Landscape orientation | Better for website display |
| Good lighting | Professional appearance |

---

## Storage Management

### Check Storage Usage

Look at the **Storage** meter in the left sidebar of the Admin Panel:

```
Storage: 12.5MB / 50MB [==========          ]
```

- **Green:** Plenty of space
- **Yellow:** Consider using Supabase for new uploads
- **Red:** Use Supabase only (local storage full)

### Free Up Local Space

1. Go to **Hero Slider** or **Villa & Cottages**
2. Click the **trash icon** on old images
3. Re-upload using **Supabase** for permanent storage
4. Click **"Save Changes"**

---

## Troubleshooting

### "Upload Failed" Error

**Try these solutions:**

1. **Check Supabase connection** - Look for blue "Supabase" button in admin
2. **Verify bucket exists** - Check Supabase dashboard for `property-images` bucket
3. **Check file size** - Max 50MB for Supabase, 500KB recommended for Local
4. **Try Local upload** - Use pink "Local" button as fallback

### Images Not Showing on Website

1. **Check if save was successful** - Look for success message
2. **Refresh the page** - Sometimes images need a refresh
3. **Check console** - Press F12 and look for red errors
4. **Verify URL** - Right-click image → "Copy image address" should work

### "Supabase Not Configured"

If you see this message:
1. Check environment variables are set in Vercel
2. Redeploy the project
3. Refresh the admin page

---

## Method Comparison

| Feature | Supabase | Local |
|---------|----------|-------|
| **Storage** | 1GB free | 50MB browser |
| **File Size** | Up to 50MB | Recommended <500KB |
| **URL Type** | Permanent | Base64 (page only) |
| **Speed** | Fast CDN | Instant |
| **Offline** | No | Yes |
| **Setup** | Bucket required | None |

---

## Quick Reference

### Admin Access
```
URL: https://dhansukh-main.vercel.app/#admin
Password: dhansukh_2026$
```

### Recommended Image Sizes

| Section | Resolution | Format |
|---------|-----------|--------|
| Hero Slider | 1920x1080 | JPG |
| Villa Main | 1200x800 | JPG |
| Cottage Cards | 800x600 | JPG |
| Gallery | 1200x800 | JPG |

### Supported Formats
- JPG / JPEG ✅
- PNG ✅
- WebP ✅
- GIF ✅ (not recommended)

---

## Support

If you encounter issues:
1. Check browser console (F12) for error messages
2. Verify Supabase bucket exists
3. Check environment variables are configured
4. Try Local upload as fallback
5. Contact support with screenshots

---

## Tips for Great Photos

### Hero Slider Photos
- Wide landscape shots of the property
- Golden hour lighting (sunrise/sunset)
- Include pool, garden, exterior
- Professional, welcoming atmosphere

### Villa/Cottage Photos
- Clean, tidy rooms
- Natural lighting
- Multiple angles
- Show amenities (kitchen, bathroom, bedroom)

---

*Last updated: March 2026*
