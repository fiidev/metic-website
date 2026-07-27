<div align="center">
  <img src="https://res.cloudinary.com/u91ilidx/image/upload/v1785173949/metic-website/logo.png" alt="METIC Logo" width="100" height="100">
  <h1>METIC Website</h1>
  <p>
    <strong>Moklet Education of Technology and Informatics Club</strong><br>
    <em>SMK Telkom Malang</em>
  </p>
  <p>
    <a href="https://metic.moklet.org"><strong>metic.moklet.org</strong></a>
    ·
    <a href="https://instagram.com/meticmoklet">Instagram</a>
    ·
    <a href="https://tiktok.com/@meticmerangkulsemuaorang">TikTok</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js_15-000000?logo=next.js&style=flat-square" alt="Next.js 15">
    <img src="https://img.shields.io/badge/TypeScript_5-3178C6?logo=typescript&style=flat-square" alt="TypeScript 5">
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&style=flat-square" alt="Tailwind CSS v4">
    <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=flat-square" alt="Prisma">
    <img src="https://img.shields.io/badge/BetterAuth-111111?style=flat-square" alt="BetterAuth">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&style=flat-square" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&style=flat-square" alt="Cloudinary">
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&style=flat-square" alt="Framer Motion">
  </p>
</div>

---

## 📋 Tentang METIC

**METIC** (Moklet Education of Technology and Informatics Club) adalah organisasi teknologi di **SMK Telkom Malang** yang menjadi wadah eksplorasi, inovasi, dan kolaborasi siswa dalam bidang **teknologi digital**, **bisnis kreatif**, dan **media komunikasi**.

### Visi

Menciptakan generasi pemimpin muda yang inovatif, kolaboratif, dan berorientasi solusi di bidang teknologi untuk masa depan digital yang inklusif dan berkelanjutan.

### Misi

1. **Inovasi** — Mengembangkan solusi teknologi yang inovatif, aman, dan berdaya saing global
2. **Kolaborasi** — Mendorong kolaborasi antara talenta muda, industri, dan akademisi di bidang teknologi
3. **Kreativitas** — Menyediakan wadah bagi pengembangan riset, kreativitas, dan kewirausahaan berbasis teknologi
4. **Etika** — Menjunjung tinggi etika, profesionalisme, dan keberlanjutan dalam setiap pengembangan teknologi

---

## 🏢 Divisi

<table>
  <tr>
    <td align="center" width="200">
      <img src="/assets/image/logo-mokletdev.png" alt="MokletDev" width="80"><br>
      <strong>MokletDev</strong><br>
      <sub>Pengembangan teknologi<br>dan pusat inovasi</sub>
    </td>
    <td align="center" width="200">
      <img src="/assets/image/logo-medcom.png" alt="MedCom" width="80"><br>
      <strong>MedCom</strong><br>
      <sub>Edukasi, personal branding,<br>dan media partner</sub>
    </td>
    <td align="center" width="200">
      <img src="/assets/image/logo-meticmerch.png" alt="Metic Merch" width="80"><br>
      <strong>Metic Merch</strong><br>
      <sub>Bisnis kreatif dan<br>pengembangan produk</sub>
    </td>
  </tr>
</table>

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🏠 **Landing Page** | Informasi lengkap METIC — visi misi, divisi, track record, FAQ |
| 📄 **Divisi Pages** | Halaman detail tiap divisi: program kerja, portofolio, tim |
| 📝 **Open Registration** | Form pendaftaran anggota baru dengan database |
| 🔐 **Admin Dashboard** | Panel admin untuk manage konten dengan autentikasi BetterAuth |
| 📱 **Responsive** | Tampilan optimal di desktop & mobile |

---

## 🛠 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org) — App Router + Turbopack |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + Framer Motion |
| **Database** | [PostgreSQL](https://postgresql.org) via [Prisma](https://prisma.io) ORM |
| **Auth** | [BetterAuth](https://better-auth.com) |
| **Media** | [Cloudinary](https://cloudinary.com) — image hosting & delivery |
| **Deploy** | [Vercel](https://vercel.com) |

---

## 🚀 Memulai

### Prasyarat

- Node.js 18+
- PostgreSQL (atau [Neon](https://neon.tech) serverless)
- Akun [Cloudinary](https://cloudinary.com)

### Setup

```bash
# Clone
git clone https://github.com/fiidev/metic-website.git
cd metic-website

# Install
npm install

# Environment
cp .env.example .env
# Isi DATABASE_URL, CLOUDINARY_URL, BETTER_AUTH_SECRET, dll.

# Database
npm run db:generate
npm run db:migrate
npm run db:seed

# Development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) ✨

### Scripts

| Script | Fungsi |
|--------|--------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint check |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema to DB |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed initial data |
| `npm run db:reset` | Reset + re-migrate |
| `npm run assets:upload` | Upload assets to Cloudinary |

---

## 📁 Struktur

```
src/
├── app/
│   ├── _components/        # Shared (Navbar, Footer, FAQ, etc.)
│   ├── (dashboard)/        # Landing + divisi pages
│   │   ├── page.tsx        # Home
│   │   └── divisi/[id]/    # Detail divisi
│   ├── admin/              # Admin panel
│   ├── login/              # Login page
│   ├── registration/       # Registration form
│   └── api/auth/           # Auth API routes
├── lib/
│   ├── assets.ts           # Cloudinary image constants
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # BetterAuth config
│   └── queries/            # DB queries
├── generated/prisma/       # Prisma types
└── middleware.ts
```

---

## 🤝 Kontribusi

Baca [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan kontribusi.

---

## 📄 Lisensi

Proyek ini bersifat **private** — © 2025 MokletDev · SMK Telkom Malang

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/fiidev">MokletDev</a> Team</sub>
  <br>
  <sub><a href="https://smktelkom-mlg.sch.id">SMK Telkom Malang</a></sub>
</div>
