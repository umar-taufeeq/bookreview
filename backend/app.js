const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
//  const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON
app.use(cookieparser());

// Routes
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

// Error handling
// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
