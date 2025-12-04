# 🍽️ ShareBite – Food Redistribution Platform (MERN Stack)
A modern, lightweight platform that connects restaurants with surplus food to people/NGOs who need it, helping reduce food wastage through accessible technology.
ShareBite makes food donation fast, trackable, and transparent — with a simple interface for both restaurants and receivers.

## 🚀 Live Demo & Repo
👉 Demo Video: https://sharebite-d393.onrender.com

## 🌟 Key Features (No Admin Dashboard Yet)
### 🏪 For Restaurants
Add surplus food (name, quantity, category, expiry, pickup location)
Track the status of their donated food
Update or delete existing food donations
View feedback from receivers
Dashboard showing donation history & total food saved

### 🤝 For Receivers (NGOs/Individuals)
View all available donations in real-time
Sort by newest and oldest
Filter based on food type / urgency (optional)
View food details with map-based pickup location
Claim food donation
Give feedback after receiving food

### 🧭 Global Features
Secure login & signup using JWT
Interactive UI crafted with React
Role-based views (Restaurant vs Receiver)
Sorting, searching & real-time updates
Maps integration using Leaflet.js
Fully responsive for mobile & tablets

### 💻 Tech Stack

#### Frontend
React.js
React Router
Context API (Authentication)
Axios
Tailwind CSS / Custom CSS
Leaflet.js (Maps)

#### Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Auth
Multer (if images added later)

#### Others
Postman (API testing)
Render (Deployment)

## 📂 Project Structure (Simple & Understandable)
```
ShareBite/
├── client/                       # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/AuthContext.js
│   │   └── App.js
│   └── package.json
│
├── server/                       # Node / Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── config.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

1️⃣ Clone the repository
```
git clone https://github.com/your-username/sharebite.git
cd sharebite
```

2️⃣ Install dependencies
Backend:
```
cd server
npm install
```

Frontend:
```
cd ../client
npm install
```
3️⃣ Setup Environment Variables
Create a .env inside /server:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=secret_key
PORT=4000
```

Frontend (optional):
```
REACT_APP_API_URL=http://localhost:4000
```

4️⃣ Run the app
Backend:
```
cd server
npm start
```

Frontend:
```
cd client
npm start
```

## 🌱 Future Enhancements
Admin dashboard
Real-time notifications
Delivery partner module
AI-based food expiry prediction
Donor leaderboard
Food pickup tracking

## 🙌 Contributing
Pull requests are welcome!
Feel free to open issues or suggest improvements.

## 📄 License
MIT License
