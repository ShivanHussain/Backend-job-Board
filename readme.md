# 🧠 Job Board Backend – Internship Assignment

A fully functional **Job Board Backend API** built using the JavaScript stack:  
Node.js + Express.js + MongoDB + Cloudinary.

This project satisfies all requirements in the assignment image and adds extras for bonus points:
- Admin dashboard
- Resume/profile upload
- Application tracking
- Analytics & role-based access

---

## 📦 Features

### 👤 Authentication
- Register (with profile picture + resume upload to Cloudinary)
- Login / Logout
- Role-based: `user` or `admin`

### 💼 Job Management
- Create / Update / Delete Jobs (admin only)
- View all jobs
- Filter jobs by company and location

### 📄 Job Applications
- Apply to jobs
- View your applications

### 📊 Admin Panel (Bonus)
- View total users, jobs, and applications
- See Top 5 most applied jobs
- Manage users, jobs, and applications

---

## 🚀 Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** + **Mongoose**
- **Cloudinary** (image and resume uploads)
- **jsonwebtoken** for auth
- **Multer** & `express-fileupload`
- **Cookie-Parser**, `dotenv`, `cors`

---

## 📂 Folder Structure

Job-Board-Backend/
├── config/
│ └── db.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── uploads/
├── .env
├── app.js
└── server.js




---

## 🛠️ Setup & Run

### 1. Clone repo
```bash
git clone <repo-url>
cd Job-Board-Backend



### 2. install Dependencies 
    npm install

### 3. Create .env file in root
    PORT=5000
    MONGODB_URI=your_mongodb_url
    JWT_SECRET_KEY=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

### 4. Start server

    npm run dev



| Role  | Can Register | Can Login | Can Create Job | Access Admin Routes |
| ----- | ------------ | --------- | -------------- | ------------------- |
| user  | ✅            | ✅         | ❌              | ❌                   |
| admin | ✅            | ✅         | ✅              | ✅                   |


