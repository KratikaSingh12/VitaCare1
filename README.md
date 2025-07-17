# 🩺 HealHub – AI-powered Healthcare Appointment System

**HealHub** is a smart, full-stack healthcare platform designed to simplify doctor appointment booking, AI-assisted medical guidance, secure online payments, and prescription analysis — all in one place. It offers dedicated panels for Users, Doctors, and Admins, with secure JWT-based authentication and a built-in AI assistant: **PharmaMate**.

---

## 🌐 Live Preview

- 👤 **User Portal**: [https://heal-hub-user.vercel.app](https://heal-hub-user.vercel.app)


---

## 🚀 Key Features

### 👨‍⚕️ User Panel
- Search doctors by specialization
- View doctor details and book appointments
- Upload prescriptions for AI-based analysis (PharmaMate)
- Online payment integration with PhonePe 
- Secure signup/login using JWT
- View and manage appointment history

### 🩺 Doctor Panel
- Login securely using email & password
- View upcoming appointments
- Track patient count and earnings
- Manage profile and availability

### 🛠️ Admin Dashboard
- Admin login with protected access
- Add/edit/delete doctors
- Monitor all appointments and earnings
- View system-wide analytics

### 🧠 PharmaMate – AI Assistant
- Python FastAPI backend for medical NLP
- Understands prescription data
- Uses Spacy/ClinicalBERT for predictions

---

## 🧩 Tech Stack

| Layer        | Technologies Used                             |
|--------------|-----------------------------------------------|
| **Frontend** | React.js, Tailwind CSS, React Router, Axios   |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose        |
| **AI Server**| Python, FastAPI                               |
| **Cloud**    | Cloudinary (file uploads), MongoDB Atlas      |
| **Payment**  | PhonePe APIs (payment gateway)                |
| **Auth**     | JWT, LocalStorage                             |

---

## 🔐 Authentication & Authorization
- User and Admin login
- Admin can access and control dashboard routes
- Protected routes for sensitive pages

---

## 📁 Environment Variables Setup

To run this project, you need to set up environment variables in all three folders: `/backend`, `/frontend`, and `/admin`.

### 🗂️ 1. Backend `.env` (inside `/backend` folder)
```
MONGODB_URI='your-mongodb-uri'
CLOUDINARY_NAME='your-cloudinary-cloud-name'
CLOUDINARY_API_KEY='your-cloudinary-api-key'
CLOUDINARY_SECRET_KEY='your-cloudinary-secret-key'
ADMIN_EMAIL='your-admin-email'
ADMIN_PASSWORD='your-admin-password'
JWT_SECRET='your-jwt-secret'
PYTHON_BACKEND_URL='http://localhost:8000'
PHONEPE_MERCHANT_ID='your-merchant-id'
PHONEPE_SALT_KEY='your-salt-key'
PHONEPE_SALT_INDEX='your-salt-index'
PHONEPE_API_ENDPOINT='https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'
CALLBACK_URL='https://your-ngrok-or-cloudflare-url/api/user/payment-callback'
FRONTEND_URL='http://localhost:5173'
REDIRECT_URL='https://your-public-url'
VITE_BACKEND_URL='http://localhost:4000'
```

### 🌐 2. Frontend `.env` (inside `/frontend` folder)
```
VITE_BACKEND_URL=http://localhost:4000

```

### 🛠️ 3. Admin `.env` (inside `/admin` folder)
```
VITE_BACKEND_URL=http://localhost:4000
```

---


## ⚙️ Installation Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Shrashti-yadav/Heal-Hub.git
cd Heal-Hub
```

### 2. Set up Environment Files
Create `.env` files inside each of the following folders: `backend`, `frontend`, and `admin`, as shown above.

### 3. Install Dependencies and Run Project

#### 🔧 Backend
```bash
cd backend
npm install
npm run dev
```
#### 💻 Frontend (User Interface)
```bash
cd frontend
npm install
npm run dev
```

#### 🛡️ Admin Panel
```bash
cd admin
npm install
npm run dev
```

### ✅ Project is now running locally!
- User Panel: http://localhost:5173
- Admin Panel: http://localhost:5174
- Backend: http://localhost:4000

---
