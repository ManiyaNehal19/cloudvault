# 📂 CloudVault

A web app built with Next.js, Tailwind, and Appwrite. It includes authentication with OTP, file uploads, dynamic file routes, sharing, search, sorting, and a responsive dashboard.

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-13%2B-black">
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4">
  <img alt="Appwrite" src="https://img.shields.io/badge/Appwrite-Cloud%2FServer-F02E65">
</p>

---

## ✨ Features

- **Auth & OTP**
  - Appwrite authentication (signup/login)
  - OTP modal for 2FA-style verification
- **File Management**
  - Upload, view, rename, delete, share
  - File details panel (metadata)
  - Dynamic file routes (per-file pages)
- **Navigation & Layout**
  - App shell with navbar + sidebar
  - Mobile navigation & responsive UI
  - Dashboard overview
- **Search & Sort**
  - Global search, filters, sorting
- **UI/Dev Experience**
  - Tailwind-based design system & theme
  - Reusable components (AuthForm, FileCard, ActionsDropdown)
  - ESLint + Prettier

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, Shadcn/UI
- **Backend:** Appwrite (Auth, Storage, DB)
- **Tooling:** TypeScript, ESLint, Prettier

---

## 🚀 Getting Started

### 1) Clone & Install
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
