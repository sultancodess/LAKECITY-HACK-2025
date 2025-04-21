const express = require('express');
const connectDB = require('./Database/DB-connection');
require("dotenv").config();
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");

const app = express();
connectDB();

// ✅ Only use express.json() ONCE
app.use(express.json());

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "https://interviewmate-mu.vercel.app/",
  "http://localhost:5182",
];

// ✅ Setup CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  })
);

// ✅ Session and passport setup
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoute);
// app.use("/api", chatRoute); // uncomment when ready

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello, Interviewmate!');
});

// ✅ Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
