
const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: "Invalid data" });

  const token = Buffer.from(email).toString("base64");
  users.push({ email, password, token });
  res.status(201).send({ token });
});

router.get("/profile", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).send({ error: "Unauthorized" });

  const token = auth.split(" ")[1];
  const user = users.find(u => u.token === token);
  if (!user) return res.status(401).send({ error: "Unauthorized" });

  res.send({ email: user.email });
}); 
// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(404).json({ error: "Invalid credentials" });
  res.status(201).json({ token: user.token });
});


module.exports = router;
