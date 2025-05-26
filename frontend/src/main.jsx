import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ToastContainer } from 'react-toastify';
import { BooksProvider } from './contexts/BookContext.jsx';
import { ReviewProvider } from './contexts/ReviewContext.jsx';

createRoot(document.getElementById('root')).render(
  
     <BrowserRouter>
    <AuthProvider>
     <BooksProvider>
      <ReviewProvider>
          <App />
          <ToastContainer position="top-center" autoClose={2000} />
          </ReviewProvider>
        </BooksProvider>
    </AuthProvider>
    </BrowserRouter>

)
