# **GameFinder 🎮**
A full-stack MERN app that lets users search games, manage collections/wishlists, write reviews, and authenticate via Google or email/password.  
Fast React frontend, clean Express backend, and MongoDB for persistence.

--- 
## Screenshots

### Home Page
![Home Page](./screenshots/mainpage.png)

### Game Page
![Game Details](./screenshots/gamepage.png)

### Profile Page
![Login Page](./screenshots/profilepage.png)

---

## **Features**
- 🔍 Game search with genre, platform, sorting, and text filters  
- 👤 User accounts (Google OAuth + email/password)  
- 🎮 Collections & wishlists (add/remove games)  
- 📝 Review system with rating, comment, author  
- 👥 Friends system (add/remove, list other users)  
- 🔐 JWT authentication  
- 🗄️ MongoDB models: Login, User, Review  

---

## **Tech Stack**

### **Frontend**
- React + TypeScript  
- Vite  
- Chakra UI  
- Axios  

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- Passport.js (Google OAuth)  
- bcrypt  
- JSON Web Tokens  
- CORS  

---

## Project Structure

```text
GameFinder/
│
├── client/              # Frontend (React + Vite)
│   ├── src/
│   └── ...
│
├── server/              # Backend (Express, MongoDB)
│   ├── models/
│   ├── auth/
│   ├── server.cjs
│   ├── secret.js
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

## Docker Quick Start

Start the entire stack (MongoDB + backend + frontend):

```bash
docker compose up --build
```

Then open:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: mongodb://localhost:27017

To stop everything:

```bash
docker compose down
```

To remove the database volume as well:

```bash
docker compose down -v
```

The backend receives these environment variables automatically from Docker Compose:

- `MONGO_DB_URL=mongodb://mongodb:27017/gamefinder`
- `JWT_SECRET=change-this-in-production`
- `FRONTEND_URL=http://localhost:5173`

---

## API Overview

### Auth

```text
GET  /auth/google               → Google OAuth login
POST /signup                    → Create account
POST /login                     → Email/password login
GET  /userByToken/:token        → Fetch logged-in user
```

### Users

```text
GET  /allUsers/:userId          → Get all users except self/friends
POST /changeFriendStatus        → Add/remove friends
```

### Games

```text
GET  /gameStatus?userId&gameId  → Collection/wishlist status
POST /changeGameStatus          → Add/remove from collection/wishlist
```

### Reviews

```text
GET  /reviews/:gameId           → Get reviews for a game
POST /addReview                 → Add review
POST /deleteReview              → Delete review
```

---

## Manual Development Setup

If you prefer running frontend and backend separately:

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```
