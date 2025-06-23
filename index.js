const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const studentRoutes = require('./routes/api');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

// ✅ CORS config
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// ✅ Custom headers for Safari, mobile, strict CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());

// ✅ Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour!'
});
app.use('/api', limiter);

// ✅ Routes
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

// 404 Not Found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Global Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// ✅ Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Now listening for requests on: http://localhost:${PORT}`);
});
