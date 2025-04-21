const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const authMiddleware = require("../middleWares/authMiddleware.js");
require("../services/pasport.js")

const router = express.Router();

// React OAuth/Google
router.post("/google-login", async (req, res) => {
  const { sub, name, email, picture } = req.body;

  try {
  
    let user = await User.findOne({ email });

    if (!user) {
  
      user = new User({
        googleId: sub,
        name,
        email,
        avatar: picture,
      });
      await user.save();
    } else if (!user.googleId) {
  
      user.googleId = sub;
      await user.save();
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

 
 res.status(200).json({
   message: "Login successful",
   user,
   token,
 });


  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// GitHub OAuth


router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback route
router.get("/github/callback", async (req, res, next) => {
  passport.authenticate(
    "github",
    { failureRedirect: `${process.env.CLIENT_URL}/login` },
    async (err, user) => {
      if (err || !user) {
        console.error("GitHub login failed:", err);
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }

      try {
        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure only in production
          sameSite: "strict",
        });

        // Redirect user to frontend with encoded user data
        const redirectUrl = `${
          process.env.CLIENT_URL
        }/auth-success?token=${token}&userId=${encodeURIComponent(
          user.id
        )}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(
          user.email
        )}&avatar=${encodeURIComponent(user.avatar)}`;

        res.redirect(redirectUrl);
      } catch (error) {
        console.error("GitHub login error:", error);
        res.redirect(`${process.env.CLIENT_URL}/login`);
      }
    }
  )(req, res, next);
});

// Local sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Local sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
      res.json({
        message: "Login successful",
        token,
        userId: user.id,
        user: {
          _id: user.id,
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
});

router.get("/user", async (req, res) => {
  try {
    const id = req.headers["userid"];

    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required in headers" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
