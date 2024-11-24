const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/scoresDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const scoreSchema = new mongoose.Schema({
    playerName: String,
    score: { type: Number, default: 0 }
});

const Score = mongoose.model('Score', scoreSchema);

// Endpoint : Récupérer le score d'un joueur
app.get('/score/:playerName', async (req, res) => {
    const { playerName } = req.params;
    let player = await Score.findOne({ playerName });
    if (!player) {
        player = new Score({ playerName });
        await player.save();
    }
    res.json({ score: player.score });
});

// Endpoint : Mettre à jour le score
app.post('/score/update', async (req, res) => {
    const { playerName, increment } = req.body;
    let player = await Score.findOne({ playerName });
    if (!player) {
        player = new Score({ playerName });
    }

    player.score = increment ? player.score + 1 : 0;
    await player.save();
    res.json({ score: player.score });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
