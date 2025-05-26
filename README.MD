# Live Demo : https: //bookreview-frontend-yjpw.onrender.com
# Book Review App – Installation Guide

This guide will help you **download** the project from GitHub and **set it up locally** for development.

---

## 1. Clone the Repository

First, open your terminal and run:

```bash
git clone https://github.com/umar-taufeeq/bookreview.git
cd book-review-app
```



---

## 2. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

- Copy the `.env.example` file (if present) to `.env`:
  ```bash
  cp .env.example .env
  ```
- Edit `.env` and set your MongoDB URI and JWT secret:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

---

## 4. Start the Backend Server

```bash
npm run dev
```
or
```bash
node server.js
```
The backend will run on [http://localhost:5000](http://localhost:5000).

---

## 5. Install Frontend Dependencies

Open a new terminal, then:

```bash
cd ../frontend
npm install
```

---

## 6. Start the Frontend

```bash
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## 7. Access the App

- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- Register a new user or login with existing credentials.

---

## Notes

- Make sure MongoDB is running locally or use a cloud MongoDB service.
- The backend must be running before using the frontend.
- For any issues, check the terminal output for errors.

---

## Project Structure

```
book-review-app/
  backend/
  frontend/
```

---

You're all set! 🎉
```
