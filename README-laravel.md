<div align="center">

# 🔥 Phoenix Task Manager

### *Kelola Tugas dengan Efisien & Elegan*

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)

*Final Project Cloud Computing - Kelompok 9 Phoenix* 🚀

[Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Tentang Proyek

**Phoenix Task Manager** adalah aplikasi manajemen tugas modern yang dirancang untuk meningkatkan produktivitas tim. Dibangun dengan Laravel 12 dan Tailwind CSS, aplikasi ini menyediakan antarmuka yang intuitif dan fitur lengkap untuk mengelola tugas harian Anda.

---

## 🎯 Fitur Utama

<table>
<tr>
<td width="50%">

### 🔐 Authentication System
- ✅ Registrasi & Login
- ✅ Email Verification
- ✅ Password Reset
- ✅ Session Management

</td>
<td width="50%">

### 📋 Task Management
- ✅ Create, Read, Update, Delete
- ✅ Set Deadlines & Priorities
- ✅ Task Status Tracking
- ✅ Search & Filter

</td>
</tr>
<tr>
<td width="50%">

### 🏷️ Category Management
- ✅ Custom Categories
- ✅ Color-coded Labels
- ✅ Category-based Organization
- ✅ Bulk Operations

</td>
<td width="50%">

### 👤 Profile Management
- ✅ Update Personal Info
- ✅ Change Password
- ✅ Account Security
- ✅ Delete Account

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

```

Frontend         Backend          Database         Tools
────────         ───────          ────────         ─────
Blade            Laravel 12       MySQL            Vite
Tailwind CSS     PHP 8.2+         SQLite           Composer
Alpine.js        Laravel Breeze                    NPM

```

---

## 📦 Installation

### Prerequisites

```

✓ PHP >= 8.2
✓ Composer
✓ Node.js \& NPM
✓ MySQL Server

```

### Setup Steps

```


# 1️⃣ Clone Repository

git clone https://github.com/aidilsaputrakirsan-classroom/final-project-cloud-computing-a-cc-kelompok-9-phoenix.git
cd final-project-cloud-computing-a-cc-kelompok-9-phoenix
git checkout feature/authentication-system-and-task-management

# 2️⃣ Install Dependencies

composer install
npm install

# 3️⃣ Environment Configuration

cp .env.example .env
php artisan key:generate

# 4️⃣ Database Setup

# Edit .env file dengan konfigurasi database MySQL Anda

php artisan migrate

# 5️⃣ Build Assets

npm run build

```

---

## 🚀 Usage

### Development Mode

```


# 🔥 Run all services with hot reload

composer dev

```

<details>
<summary><b>📌 Manual Development</b></summary>

```


# Terminal 1 - Laravel Server

php artisan serve

# Terminal 2 - Vite Dev Server

npm run dev

# Terminal 3 - Queue Worker (Optional)

php artisan queue:listen

# Terminal 4 - Logs (Optional)

php artisan pail

```

</details>

### Production Build

```

npm run build
php artisan optimize
php artisan config:cache
php artisan route:cache

```

---

## 📁 Project Structure

```

📦 phoenix-task-manager
├── 📂 app
│   ├── 📂 Http/Controllers
│   │   ├── TaskController.php
│   │   ├── CategoryController.php
│   │   └── ProfileController.php
│   └── 📂 Models
│       ├── Task.php
│       ├── Category.php
│       └── User.php
├── 📂 database
│   └── 📂 migrations
│       ├── create_tasks_table.php
│       └── create_categories_table.php
├── 📂 resources
│   └── 📂 views
│       ├── tasks/
│       ├── categories/
│       └── profile/
└── 📂 routes
└── web.php

```

---

## 🤝 Contributing

Kontribusi sangat kami hargai! Untuk berkontribusi:

1. 🍴 Fork repository ini
2. 🌿 Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit perubahan (`git commit -m 'Add: Amazing Feature'`)
4. 📤 Push ke branch (`git push origin feature/AmazingFeature`)
5. 🔃 Buat Pull Request

---

## 📄 License

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 📞 Support

Jika Anda memiliki pertanyaan atau butuh bantuan:

- 📧 Email: phoenix@example.com
- 💬 Discord: [Join Our Server](#)
- 📝 Issues: [GitHub Issues](https://github.com/aidilsaputrakirsan-classroom/final-project-cloud-computing-a-cc-kelompok-9-phoenix/issues)

---

<div align="center">

**[⬆ Back to Top](#-phoenix-task-manager)**

Made with ❤️ by **Kelompok 9 Phoenix**

⭐ Star us on GitHub — it motivates us a lot!

</div>

