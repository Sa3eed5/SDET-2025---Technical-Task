// mock-auth-api/server.js
const express = require("express");
const app = express();
app.use(express.json());

let users = [];

// Helper function to validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Register
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid data" });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }
  if (password.length > 30) {
    return res
      .status(400)
      .json({ error: "Password must be at most 30 characters long" });
  }
  const token = Buffer.from(email).toString("base64");
  users.push({ email, password, token });
  res.status(201).json({ token });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(404).json({ error: "Invalid credentials" });
  res.status(201).json({ token: user.token });
});

// Profile (GET)
app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = auth.split(" ")[1];
  const user = users.find((u) => u.token === token);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  res.status(200).json({ email: user.email });
});

// Profile (PATCH)
app.patch("/profile", (req, res) => {
  const auth = req.headers.authorization;
  const { password, email } = req.body;

  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = auth.split(" ")[1];
  const user = users.find((u) => u.token === token);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  // Check email if provided
  if (email) {
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (users.some((u) => u.email === email && u.token !== token)) {
      return res.status(400).json({ error: "Email already in use" });
    }
    user.email = email;
  }

  // Update password if provided
  if (password) {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    if (password.length > 30) {
      return res
        .status(400)
        .json({ error: "Password must be at most 30 characters long" });
    }
    user.password = password;
  }

  //  Return success if at least one field is updated
  if (email || password) {
    return res.status(200).json({ message: "Profile updated successfully" });
  }

  return res.status(400).json({ error: "No valid fields to update" });
});



// Profile (DELETE)
app.delete("/profile", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = auth.split(" ")[1];
  const index = users.findIndex((u) => u.token === token);
  if (index === -1) return res.status(401).json({ error: "Unauthorized" });

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted" });
});

// Admin Delete All Users
app.delete("/all-users", express.json(), (req, res) => {
  try {
    const { key_admin } = req.body || {};
    if (key_admin !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    users = [];
    res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    console.error("Delete All Users Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});


// Admin View All Users
app.get("/all-users", (req, res) => {
  const { key_admin } = req.body;
  if (key_admin !== "admin") return res.status(401).json({ error: "Unauthorized" });
  res.status(200).json({ users });
});

const PORT = 3000;
app.listen(3000, () => console.log(`Mock API running on http://localhost:3000`));
