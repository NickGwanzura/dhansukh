# Dhan Sukh House - Legacy of Heartfelt Hospitality

A high-conversion, luxury hospitality landing page for **Dhan Sukh House**, a premium estate in Belvedere, Harare, featuring a 4-bedroom villa and self-catering garden cottages.

## 🌿 Our Story
At Dhan-Sukh, our story is rooted in a 65-year tradition of open doors and open hearts. The name reflects our deepest values: **Dhan (Wealth)** and **Sukh (Happiness)**. To us, true wealth is the abundance of happiness we can share with others.

## ✨ Key Features
- **Premium Hero Slider**: A high-end, automatic cross-fade carousel with Ken Burns zoom effects and manual controls.
- **Legacy Hospitality**: Over 6 decades of hosting experience.
- **Eco-Friendly**: 10kVA Solar System & Borehole Water.
- **Vegetarian-Friendly**: Strictly vegetarian-only main villa kitchen (Outdoor Gazebo available for BBQ).
- **Advanced Admin Dashboard**: 
    - **Booking Manager**: Visual calendar to block or open dates for each unit.
    - **Hero Management**: Add, remove, and reorder slides for the main landing page.
    - **Content Engine**: Edit descriptions, prices, and features with real-time updates.
    - **Cloud Persistence**: Full state synchronization via Supabase.

## 📸 Content Management
The app now features a robust Admin Panel (`#admin`) for managing all content without touching code:
1. **Media Library**: All uploaded images are stored in a central library for easy reuse across different sections.
2. **Main vs. Gallery**: Clear distinction in the UI between the primary "Cover Photo" (used in listings) and the "Gallery Collection" (shown in the lightbox).
3. **Hero Slider**: Manage 3 or more images to create a dynamic first impression.

## ☁️ Cloud Setup & Persistence
To enable "sticky" changes that persist across devices:
1. Go to the **Cloud Settings** tab in the Admin Panel.
2. Enter your **Supabase URL** and **Anon Key**.
3. Run the provided **SQL Setup** script in your Supabase SQL Editor to create the necessary tables and storage buckets.
4. Once configured, all bookings and content updates will be saved to the cloud instantly.

## 🛠 Tech Stack
- **Frontend**: React 19 (ESM modules)
- **Styling**: Tailwind CSS with custom `ease-spring` transitions.
- **Backend/Persistence**: Supabase (PostgreSQL & Storage).
- **Icons**: Lucide React.
- **Type Safety**: TypeScript.

## 📞 Booking Information
All bookings are managed via WhatsApp: **+263 712 201 681**

---
*Created with heartfelt hospitality for the Dhan-Sukh Family.*