# User Registration Endpoint

## POST /users/register

This endpoint is used to register a new user.

### Request

- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
 {
  "fullName": "umar taufeeq",
  "email": "umar@example.com",
  "password": "test1234"
}
### RESPONSE 
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODMxOWQ1MDA5NTM0NzBjNjYwMTBlYTEiLCJpYXQiOjE3NDgwODIwMDEsImV4cCI6MTc0ODE2ODQwMX0.KDceqzgzh6RzN0aC7nsufugqHP7j_1fD7ZfR4yRttUY",
    "user": {
        "fullName": "umar taufeeq",
        "email": "umar@example.com",
        "password": "$2b$10$PnJt5ufsa6oLLBvI3PwbAuxt90h3vioDRcd3LNAjQpF1qrNWy/dti",
        "isAdmin": false,
        "_id": "68319d500953470c66010ea1",
        "createdAt": "2025-05-24T10:20:00.940Z",
        "updatedAt": "2025-05-24T10:20:00.940Z",
        "__v": 0
    }
}

***201 .Created A new resource was created successfully. ***

  User Login Endpoint
## POST /users/login
This endpoint is used to log in an existing user.

# Request
# URL: /users/login
# Method: POST
# Headers: Content-Type: application/json
# Body:
{
  "email": "umar@example.com",
  "password": "test1234"
}

# Response
Success Response:

## Code: 200 OK
## Content:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODMxYWJmMDQ0NjRmNGQwNDg2OTBkMTgiLCJpYXQiOjE3NDgwOTA1OTYsImV4cCI6MTc0ODE3Njk5Nn0.V1IG-H45v2ilstvHpSDMB9ITwCE-qEWUsuBO3PaE_lU",
    "user": {
        "_id": "6831abf04464f4d048690d18",
        "fullName": "umar taufeeq",
        "email": "umar@example11.com",
        "password": "$2b$10$Qzdgy11it0H2WyhkH2MtbuRle6Xr4vMxIDKORNKHWmzE3BBJHgfDu",
        "isAdmin": false,
        "createdAt": "2025-05-24T11:22:24.070Z",
        "updatedAt": "2025-05-24T11:22:24.070Z",
        "__v": 0
    }
}
umar-taufeeq: create docs for profile logout and updae profile route

GitHub Copilot: Here’s documentation for the `/profile`, `/logout`, and `/profile` (PUT) routes:

---

## User Routes Documentation

###  Get User Profile

- **Endpoint:** `GET /users/profile`
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

- **Endpoint:** `GET /users/logout`
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

###  Update User Profile

- **Endpoint:** `PUT /users/profile`
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
- **Endpoint:** `POST /books/create`  
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
- **Endpoint:** `GET /books/all`  
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
- **Endpoint:** `GET /books/:id`  
- **Auth:** Public  
- **Description:** Get details of a single book by its ID.  
- **Response:** Returns the book object.  
- **Errors:**  
    - `404 Not Found` if book does not exist  
    - `500 Server Error` for unexpected errors  

---

## Review Routes

### 1. Create Review  
- **Endpoint:** `POST /reviews/create`  
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
- **Endpoint:** `GET /reviews/:bookId`  
- **Auth:** Public  
- **Description:** Get all reviews for a specific book.  
- **Response:** Array of review objects (with reviewer’s name).  
- **Errors:**  
    - `404 Not Found` if no reviews found  
    - `500 Server Error` for unexpected errors  

---

**Note:**  
- All endpoints are prefixed with `/books` or `/reviews` as per your route setup.  
- Authentication is via JWT token in cookie or `Authorization` header.  
- Admin-only routes require the user to have `isAdmin` set to `true`.