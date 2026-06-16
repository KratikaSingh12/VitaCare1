# VitaCare

A full-stack role-based healthcare platform built with React, Node.js, and MongoDB. Book appointments, analyze symptoms with AI, and connect with doctors instantly via emergency video calling.

**Live Demo:** [vita-care1.vercel.app](https://vita-care1.vercel.app/)

---

## Features

### Patient Panel
- **Authentication** — Register and login with JWT-based secure access
- **Appointment Booking** — Book appointments with available doctors by specialization
- **AI Symptom Analysis** — NLP-powered symptom checker with typo-tolerant prediction using TF-IDF
- **Emergency Video Call** — Instant real-time video calling with doctors
- **Payments** — Secure online payments via Razorpay
- **My Appointments** — View, track, and manage booked appointments
- **Profile** — Update personal details and avatar
- **Responsive** — Works on all screen sizes

### Admin Panel
- **Dashboard** — Real-time stats for appointments, doctors, and patients
- **Doctors** — Add, view, update, and delete doctor profiles
- **Appointments** — View and manage all appointments
- **Users** — View registered patients

### Doctor Panel
- **Appointments** — View and manage personal appointment schedule
- **Profile** — Update availability, fees, and personal info
- **Dashboard** — Personal stats and earnings overview

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS, Axios |
| Admin | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js, MongoDB, JWT |
| ML Service | Python, Flask, Scikit-learn, TF-IDF, NLP |
| Services | Cloudinary (images), Razorpay (payments), ZegoCloud (video calls) |

---

## Project Structure

```
VitaCare/
├── Frontend/       # React.js patient interface
├── admin/          # React.js admin & doctor panel
├── backend/        # Node.js + Express REST API
└── ml-service/     # Python Flask AI microservice
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB

### 1. Clone the Repository
```bash
git clone https://github.com/KratikaSingh12/VitaCare.git
cd VitaCare
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
node server.js
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Create `Frontend/.env`:
```
VITE_BACKEND_URL=http://localhost:4000
VITE_APP_ID=your_zegocloud_app_id
VITE_SERVER_SECRET=your_zegocloud_server_secret
```

```bash
npm run dev
```

### 4. Admin Panel Setup
```bash
cd admin
npm install
```

Create `admin/.env`:
```
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

### 5. ML Service Setup
```bash
cd ml-service
pip install -r requirements.txt
python train.py       # Train the model
python app.py         # Start Flask server
```

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| ML Service | Render |

---

Built by **Kratika Singh**