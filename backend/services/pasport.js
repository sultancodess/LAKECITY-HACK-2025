const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const axios = require("axios");
const User = require("../models/User.js");
require("dotenv").config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        

       
        let email =
          profile.emails?.[0]?.value || `no-email-${profile.id}@example.com`;
        if (!profile.emails || profile.emails.length === 0) {
          const emailResponse = await axios.get(
            "https://api.github.com/user/emails",
            {
              headers: { Authorization: `token ${accessToken}` },
            }
          );

          const primaryEmail = emailResponse.data.find(
            (email) => email.primary && email.verified
          );
          if (primaryEmail) {
            email = primaryEmail.email;
          }
        }

        // Use GitHub username if displayName is missing
        const name =
          profile.displayName?.trim() ||
          profile.username ||
          `GitHub User ${profile.id}`;

        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = new User({
            githubId: profile.id,
            name,
            email,
            avatar:
              profile.photos?.[0]?.value || "https://via.placeholder.com/150",
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("GitHub OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Deserialization Error:", error);
    done(error, null);
  }
});

module.exports = passport;
