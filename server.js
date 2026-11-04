
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const db = require("./database");

const app = express();
const PORT = 3000;

// Allow the server to read JSON requests
app.use(express.json());
app.use(express.static("public"));

// Check that the session secret exists
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from .env");
}

// Configure login sessions
app.use(
  session({
    name: "secureaccess.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000
    }
  })
);

// PUBLIC ROUTE
app.get("/", (req, res) => {
  res.send("SecureAccess server is running!");
});

// REGISTER ROUTE
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body || {};

  // Validate input
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !email.trim() ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: "Valid username, email, and password (8+ characters) required."
    });
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the user in SQLite
    db.run(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')",
      [username.trim(), email.trim().toLowerCase(), hashedPassword],
      function (err) {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(409).json({
              message: "Unable to create account with these details."
            });
          }

          console.error("Registration database error:", err);
          return res.status(500).json({
            message: "Registration failed."
          });
        }

        return res.status(201).json({
          message: "Account created successfully!",
          userId: this.lastID
        });
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Registration failed."
    });
  }
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Find the user in the database
  db.get(
    "SELECT id, username, email, password, role FROM users WHERE email = ?",
    [normalizedEmail],
    async (err, user) => {
      if (err) {
        console.error("Login database error:", err);
        return res.status(500).json({
          message: "Login failed."
        });
      }

      // Do not reveal whether the email exists
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password."
        });
      }

      try {
        // Compare the password with the stored hash
        const passwordMatches = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatches) {
          return res.status(401).json({
            message: "Invalid email or password."
          });
        }

        // Create a fresh session after successful login
        req.session.regenerate((sessionError) => {
          if (sessionError) {
            console.error("Session creation error:", sessionError);
            return res.status(500).json({
              message: "Login failed."
            });
          }

          // Store only the user ID in the session
          req.session.userId = user.id;

          // Save the session before responding
          req.session.save((saveError) => {
            if (saveError) {
              console.error("Session save error:", saveError);
              return res.status(500).json({
                message: "Login failed."
              });
            }

            return res.status(200).json({
              message: "Login successful!",
              user: {
                id: user.id,
                username: user.username,
                role: user.role
              }
            });
          });
        });
      } catch (error) {
        console.error("Password verification error:", error);
        return res.status(500).json({
          message: "Login failed."
        });
      }
    }
  );
});

function requireAuth(req, res, next) {
  // Check whether the user has a login session
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Authentication required."
    });
  }

  // Verify that the user still exists in the database
  db.get(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [req.session.userId],
    (err, user) => {
      if (err) {
        console.error("Authentication database error:", err);
        return res.status(500).json({
          message: "Authentication failed."
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Authentication required."
        });
      }

      // Make the authenticated user available to the next handler
      req.user = user;
      next();
    }
  );
}

// Only authenticated users can access this endpoint
app.get("/dashboard", requireAuth, (req, res) => {
  res.status(200).json({
    message: `Welcome, ${req.user.username}!`,
    role: req.user.role
  });
});

function requireAdmin(req, res, next) {
  // requireAuth must run first to populate req.user
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required."
    });
  }

  next();
}

// Only administrators can view registered users
app.get("/admin/users", requireAuth, requireAdmin, (req, res) => {
  db.all(
    "SELECT id, username, email, role FROM users",
    [],
    (err, users) => {
      if (err) {
        console.error("Admin database error:", err);
        return res.status(500).json({
          message: "Unable to retrieve users."
        });
      }

      return res.status(200).json({ users });
    }
  );
});

app.post("/logout", requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({
        message: "Logout failed."
      });
    }

    res.clearCookie("secureaccess.sid");

    return res.status(200).json({
      message: "Logged out successfully."
    });
  });
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
