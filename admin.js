// Standaard spelerslijst HO25-1
const defaultPlayers = [
    { id: 1,  nummer: 1,  name: 'Floris',              goals: 1, matches: 0, diensten: 2 },
    { id: 2,  nummer: 2,  name: 'Bas van Neer',        goals: 0, matches: 0, diensten: 0 },
    { id: 3,  nummer: 3,  name: 'Daan Loose',          goals: 1, matches: 0, diensten: 1 },
    { id: 4,  nummer: 4,  name: 'Willem van Diemen',   goals: 3, matches: 0, diensten: 3 },
    { id: 5,  nummer: 6,  name: 'Jord Roest',          goals: 5, matches: 0, diensten: 1 },
    { id: 6,  nummer: 7,  name: 'Wout',                goals: 0, matches: 0, diensten: 1 },
    { id: 7,  nummer: 8,  name: 'Dirk Swart',          goals: 2, matches: 0, diensten: 2 },
    { id: 8,  nummer: 9,  name: 'Stein Visser',        goals: 0, matches: 0, diensten: 1 },
    { id: 9,  nummer: 10, name: 'Joris Kortenaar',     goals: 2, matches: 0, diensten: 1 },
    { id: 10, nummer: 11, name: 'Pim van der Moolen',  goals: 2, matches: 0, diensten: 0 },
    { id: 11, nummer: 12, name: 'Jay Schoppink',       goals: 1, matches: 0, diensten: 2 },
    { id: 12, nummer: 14, name: 'Hylke van der Wal',   goals: 0, matches: 0, diensten: 0 },
    { id: 13, nummer: 15, name: 'Maurick Veldman',     goals: 0, matches: 0, diensten: 0 },
    { id: 14, nummer: 16, name: 'Lucas van den Berg',  goals: 2, matches: 0, diensten: 0 },
    { id: 15, nummer: 19, name: 'Tom van Aalst',       goals: 0, matches: 0, diensten: 0 },
    { id: 16, nummer: 19, name: 'Max van Aalst',       goals: 0, matches: 0, diensten: 2 },
    { id: 17, nummer: 25, name: 'Joppe Pronk',         goals: 0, matches: 0, diensten: 1, captain: true }
];

let players = [...defaultPlayers];

// PIN-check: redirect als geen admin PIN in sessie
if (!sessionStorage.getItem('adminPin')) {
    window.location.href = 'index.html';
}

// Data opslaan via API
async function savePlayerData() {
    await saveData('players', players);
}

// Statistiek updaten
async function updateStat(id, stat, value) {
    const player = players.find(p => p.id === id);
    if (player) {
        player[stat] = Math.max(0, parseInt(value) || 0);
        await savePlayerData();
    }
}

// Reset naar standaard
async function resetPlayers() {
    if (confirm('Weet je zeker dat je alle statistieken wilt resetten naar 0?')) {
        players = JSON.parse(JSON.stringify(defaultPlayers));
        await savePlayerData();
        render();
    }
}

// Render spelerlijst
function render() {
    const container = document.getElementById('playerList');

    container.innerHTML = players.map(player => {
        const captainBadge = player.captain ? ' <span class="captain">(C)</span>' : '';

        return `
            <div class="player-card">
                <div class="player-name">#${player.nummer} ${player.name}${captainBadge}</div>
                <div class="stats-row">
                    <div class="stat-input">
                        <label>Doelpunten</label>
                        <input type="number" min="0" value="${player.goals}"
                            onchange="updateStat(${player.id}, 'goals', this.value)">
                    </div>
                    <div class="stat-input">
                        <label>Wedstrijden</label>
                        <input type="number" min="0" value="${player.matches}"
                            onchange="updateStat(${player.id}, 'matches', this.value)">
                    </div>
                </div>
                <div class="stats-row" style="margin-top: 8px;">
                    <div class="stat-input">
                        <label>Diensten</label>
                        <input type="number" min="0" value="${player.diensten || 0}"
                            onchange="updateStat(${player.id}, 'diensten', this.value)">
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Init: haal data op van API
async function initAdmin() {
    const storedPlayers = await fetchData('players');
    if (storedPlayers && Array.isArray(storedPlayers)) {
        players = defaultPlayers.map(dp => {
            const stored = storedPlayers.find(p => p.id === dp.id);
            return stored ? { ...dp, ...stored } : { ...dp };
        });
        storedPlayers.forEach(sp => {
            if (!defaultPlayers.find(dp => dp.id === sp.id)) {
                players.push(sp);
            }
        });
    }
    render();
}

initAdmin();
