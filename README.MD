umar-taufeeq: create docs for profile logout and updae profile route

GitHub Copilot: Here’s documentation for the `/profile`, `/logout`, and `/profile` (PUT) routes:

---

## User Routes Documentation

### 1. Get User Profile

- **Endpoint:** `GET /api/users/profile`
- **Auth:** Requires authentication (JWT token in cookie or `Authorization` header)
- **Description:** Returns the authenticated user's profile information.
- **Response Example:**
    ```json
    {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      // ...other user fields
    }
    ```
- **Errors:**
    - `401 Unauthorized` if token is missing or invalid.

---

### 2. Logout User

- **Endpoint:** `GET /api/users/logout`
- **Auth:** Requires authentication
- **Description:** Logs out the user by clearing the authentication cookie.
- **Response Example:**
    ```json
    {
      "message": "User logged out successfully"
    }
    ```
- **Errors:**
    - `401 Unauthorized` if token is missing or invalid.

---

### 3. Update User Profile

- **Endpoint:** `PUT /api/users/profile`
- **Auth:** Requires authentication
- **Description:** Updates the authenticated user's profile information (full name, email, and/or password).
- **Request Body Example:**
    ```json
    {
      "fullName": "Jane Doe",
      "email": "jane@example.com",
      "password": "newpassword123"
    }
    ```
    - All fields are optional; only provided fields will be updated.
- **Response Example:**
    ```json
    {
      "message": "Profile updated successfully",
      "user": {
        "_id": "user_id",
        "fullName": "Jane Doe",
        "email": "jane@example.com"
        // ...other user fields
      }
    }
    ```
- **Errors:**
    - `401 Unauthorized` if token is missing or invalid.
    - `404 Not Found` if user does not exist.
    - `500 Server Error` for unexpected errors.

---

**Note:** All routes require a valid JWT token, either in the `token` cookie or as a Bearer token in the `Authorization` header.

umar-taufeeq: crete docs for book routes and reviw routes

GitHub Copilot: Here’s documentation for your **Book** and **Review** routes:

---

## Book Routes

### 1. Create Book  
- **Endpoint:** `POST /api/books/create`  
- **Auth:** Requires authentication and admin privileges  
- **Description:** Create a new book.  
- **Request Body Example:**  
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description",
      "genre": "Fiction",
      "coverImage": "https://example.com/image.jpg",
      "averageRating": 4.5
    }
    ```
- **Response:** Returns the created book object.  
- **Errors:**  
    - `401 Unauthorized` if not authenticated  
    - `403 Forbidden` if not admin  
    - `400 Bad Request` for validation errors  

---

### 2. Get All Books  
- **Endpoint:** `GET /api/books/all`  
- **Auth:** Public  
- **Description:** Get a paginated list of all books.  
- **Query Parameters:**  
    - `page` (optional, default: 1)  
    - `limit` (optional, default: 10)  
- **Response Example:**  
    ```json
    {
      "totalBooks": 100,
      "totalPages": 10,
      "currentPage": 1,
      "books": [ /* array of book objects */ ]
    }
    ```
- **Errors:**  
    - `500 Server Error` for unexpected errors  

---

### 3. Get Book by ID  
- **Endpoint:** `GET /api/books/:id`  
- **Auth:** Public  
- **Description:** Get details of a single book by its ID.  
- **Response:** Returns the book object.  
- **Errors:**  
    - `404 Not Found` if book does not exist  
    - `500 Server Error` for unexpected errors  

---

## Review Routes

### 1. Create Review  
- **Endpoint:** `POST /api/reviews/create`  
- **Auth:** Requires authentication  
- **Description:** Create a review for a book.  
- **Request Body Example:**  
    ```json
    {
      "book": "bookId",
      "rating": 5,
      "comment": "Great book!"
    }
    ```
- **Response:** Returns the created review object.  
- **Errors:**  
    - `401 Unauthorized` if not authenticated  
    - `400 Bad Request` for validation errors or duplicate review  
    - `404 Not Found` if book does not exist  

---

### 2. Get Reviews by Book  
- **Endpoint:** `GET /api/reviews/:bookId`  
- **Auth:** Public  
- **Description:** Get all reviews for a specific book.  
- **Response:** Array of review objects (with reviewer’s name).  
- **Errors:**  
    - `404 Not Found` if no reviews found  
    - `500 Server Error` for unexpected errors  

---

**Note:**  
- All endpoints are prefixed with `/api/books` or `/api/reviews` as per your route setup.  
- Authentication is via JWT token in cookie or `Authorization` header.  
- Admin-only routes require the user to have `isAdmin` set to `true`.

umar-taufeeq: ok create docs for the full frontend

GitHub Copilot: ```markdown
# Book Review Frontend

A React + Vite frontend for the Book Review application. Users can browse, search, and review books, as well as register, login, and manage their profiles. Admins can add new books.

---

## Features

- **User Authentication:** Register, login, logout, and profile management.
- **Book Browsing:** View all books, search by title/author, filter by genre, and paginate results.
- **Book Details:** View detailed info and reviews for each book.
- **Review System:** Authenticated users can add reviews (one per book).
- **Admin Panel:** Admin users can add new books.
- **Responsive UI:** Built with Tailwind CSS for modern, responsive design.

---

## Folder Structure

```
src/
  App.jsx                # Main app routes
  main.jsx               # Entry point
  index.css              # Tailwind CSS import
  assets/                # Static assets
  components/            # Reusable UI components (Loader, ReviewForm, ReviewList)
  contexts/              # React Contexts for Auth, Books, Reviews
  pages/                 # Page components (Home, BookDetails, CreateBook, Login, Register, Profile)
  utils/                 # Axios instance, ProtectedRoute
public/
  vite.svg               # Favicon
```

---

## Main Pages & Components

### Home (`/`)
- Lists all books with search, genre filter, and pagination.
- Header shows login/register or profile/logout/add book (if admin).

### Book Details (`/books/:id`)
- Shows book info and all reviews.
- Authenticated users can submit a review.

### Create Book (`/books/create`)
- **Admin only.**
- Form to add a new book.

### Profile (`/profile`)
- View and update user profile (name, email, password).

### Login/Register (`/login`, `/register`)
- User authentication forms.

---

## Contexts

- **AuthContext:** Handles user state, login, register, logout, and profile update.
- **BookContext:** Manages book list, search/filter, and pagination.
- **ReviewContext:** Manages reviews for books.

---

## Protected Routes

- Uses `ProtectedRoute` to restrict access to certain pages:
  - `/books/create` is admin-only.
  - `/books/:id` and `/profile` require login.

---

## API Integration

- Uses Axios (`src/utils/Axios.jsx`) with `baseURL` set to backend.
- Sends credentials (cookies) for authentication.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173
   ```

---

## Environment

- Expects backend running at `http://localhost:5000`
- Tailwind CSS for styling.

---

## Customization

- Update genres in `Home.jsx` as needed.
- Adjust API URLs in `src/utils/Axios.jsx` if backend URL changes.

---

## License

MIT

```


umar-taufeeq: OK NOW CREATE THE INTALLATIONSTEPS AND DOWNLAODING THE FILE TEPS FROM GITHUB TO LOCL ENVIRONMENT

GitHub Copilot: ```markdown
# Book Review App – Installation Guide

This guide will help you **download** the project from GitHub and **set it up locally** for development.

---

## 1. Clone the Repository

First, open your terminal and run:

```bash
git clone https://github.com/your-username/book-review-app.git
cd book-review-app
```

> Replace `your-username` and `book-review-app` with your actual GitHub username and repository name.

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