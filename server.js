require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (⚠️ Pour production → utiliser connect-pg-simple ou Redis)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
  })
);

// Fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Routes API
app.use("/api/members", require("./routes/members"));
app.use("/api/dimes", require("./routes/dimes"));
app.use("/api/report", require("./routes/report"));
app.use("/api/receipts", require("./routes/receipts"));
app.use("/api/auth", require("./routes/auth"));

// Route fallback : envoyer index.html pour toutes les autres requêtes
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("404 Not Found - index.html introuvable");
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
