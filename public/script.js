const playerName = "zizou"; // Nom du joueur (modifiable)
const apiUrl = "http://localhost:5000";

// Éléments du DOM
const scoreElement = document.getElementById("score");
const incrementButton = document.getElementById("increment");
const resetButton = document.getElementById("reset");

// Charger le score initial depuis le serveur
const loadScore = async () => {
  try {
    const response = await fetch(`${apiUrl}/score/${playerName}`);
    const data = await response.json();
    scoreElement.textContent = data.score;
  } catch (error) {
    console.error("Erreur lors du chargement du score :", error);
  }
};

// Mettre à jour le score sur le serveur
const updateScore = async (newScore) => {
  try {
    const response = await fetch(`${apiUrl}/score/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerName, score: newScore }),
    });
    const data = await response.json();
    scoreElement.textContent = data.score;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score :", error);
  }
};

// Événements pour les boutons
incrementButton.addEventListener("click", () => {
  const currentScore = parseInt(scoreElement.textContent, 10);
  updateScore(currentScore + 1);
});

resetButton.addEventListener("click", () => {
  updateScore(0);
});

// Charger le score au démarrage
loadScore();
