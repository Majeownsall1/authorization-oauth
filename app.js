/*
 * ==============================
 * Package Imports
 * ==============================
 */
const express = require("express");
const partials = require("express-partials");
const passport = require("passport");
const session = require("express-session");
const { Strategy: GitHubStrategy } = require("passport-github2"); // Correct import method
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

/*
 * ==============================
 * Variable Declarations
 * ==============================
 */
const PORT = 3000; // Port the server will listen on

// Ensure environment variables are loaded correctly
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.error("❌ Missing GitHub OAuth credentials. Check your .env file.");
  process.exit(1); // Stop execution if credentials are missing
}

/*
 * ==============================
 * Passport Configuration (GitHub OAuth)
 * ==============================
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Callback function executed on successful authentication
      done(null, profile);
    }
  )
);

// Serialize user data to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user data when retrieving from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

/*
 * ==============================
 * Express Project Setup
 * ==============================
 */
app.set("views", path.join(__dirname, "views")); // Set view directory
app.set("view engine", "ejs"); // Use EJS as templating engine

app.use(partials()); // Enable partial templates
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Session Middleware (Manages user sessions)
app.use(
  session({
    secret: "super-secret-key", // Change this to a secure value
    resave: false, // Do not save session if nothing has changed
    saveUninitialized: false, // Prevent storing empty sessions
  })
);

app.use(passport.initialize()); // Initialize Passport for authentication
app.use(passport.session()); // Enable session support for Passport

/*
 * ==============================
 * Authentication Routes
 * ==============================
 */
// Home route (Main page)
app.get("/", (req, res) => {
  res.render("index", { user: req.user }); // Pass user data to template
});

// Protected account route (Requires authentication)
app.get("/account", ensureAuthenticated, (req, res) => {
  res.render("account", { user: req.user });
});

// Login route
app.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// Logout route (Destroy session and redirect to home)
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// GitHub OAuth Login
app.get("/auth/github", passport.authenticate("github", { scope: ["user"] }));

// GitHub OAuth Callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login", // Redirect to login on failure
    successRedirect: "/", // Redirect to home on success
  })
);

/*
 * ==============================
 * Server Listener
 * ==============================
 */
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

/*
 * ==============================
 * Authentication Middleware
 * ==============================
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Proceed if user is authenticated
  }
  res.redirect("/login"); // Otherwise, redirect to login
}
