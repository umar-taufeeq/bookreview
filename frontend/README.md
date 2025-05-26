
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
