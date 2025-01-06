async function fetchScore(playerName) {
    const response = await fetch(`/score/${playerName}`);
    const data = await response.json();
    return data.score;
}

async function updateScore(playerName, increment = true) {
    const response = await fetch('/score/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, increment })
    });
    const data = await response.json();
    return data.score;
}

async function resetScore(playerName) {
    return await updateScore(playerName, false);
}

// Gestion des actions dans le DOM
document.addEventListener('DOMContentLoaded', async () => {
    const playerName = 'longa16';
    const scoreDisplay = document.getElementById('score');
    const incrementButton = document.getElementById('increment');
    const resetButton = document.getElementById('reset');

    scoreDisplay.innerText = await fetchScore(playerName);

    incrementButton.addEventListener('click', async () => {
        scoreDisplay.innerText = await updateScore(playerName);
    });

    resetButton.addEventListener('click', async () => {
        scoreDisplay.innerText = await resetScore(playerName);
    });
});
