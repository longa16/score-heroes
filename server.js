const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Utilisé pour construire des chemins

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/scoreDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Servir les fichiers statiques (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, "public")));

// API REST pour les scores
app.get("/score/:playerName", async (req, res) => {
  const { playerName } = req.params;
  try {
    let player = await Score.findOne({ playerName });
    if (!player) {
      player = new Score({ playerName });
      await player.save();
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du score", error });
  }
});

app.post("/score/update", async (req, res) => {
  const { playerName, score } = req.body;
  try {
    const player = await Score.findOneAndUpdate(
      { playerName },
      { score },
      { new: true, upsert: true }
    );
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du score", error });
  }
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
