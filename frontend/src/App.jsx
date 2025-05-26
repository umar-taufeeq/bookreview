import React from "react";
import Home from "./pages/Home";
import BookList from "./pages/CreateBook";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateBook from "./pages/CreateBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/books" element={<BookList />} /> */}
      {/* <Route path="/books/:id" element={<BookDetails />} /> */}
      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <ProtectedRoute adminOnly={true}>
            <CreateBook />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
