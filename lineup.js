// Standaard opstelling (positie -> speler id)
// Pas deze aan naar de echte opstelling van HO25-1
const lineup = {
    // Aanval
    lw: 10,   // Linksbuiten - Jay Schoppink
    cf: 13,   // Spits - Stein Visser
    rw: 9,    // Rechtsbuiten - Jord Roest

    // Middenveld
    lm: 6,    // Links midden - Daan Loose
    lcm: 7,   // Links centraal - Pim van der Moolen
    rcm: 15,  // Rechts centraal - Joppe Pronk (C)
    rm: 12,   // Rechts midden - Maurick Veldman

    // Verdediging
    lb: 3,    // Links achter - Lucas van den Berg
    cb: 11,   // Centraal achter - Dirk Swart
    rb: 14,   // Rechts achter - Hylke van der Wal

    // Keeper
    gk: 8     // Keeper - Bas van Neer
};

// Standaard spelerslijst (voor als localStorage leeg is)
const defaultPlayers = [
    { id: 1, name: 'Max van Aalst', goals: 0, matches: 0, photo: 'photos/max-van-aalst.jpg' },
    { id: 2, name: 'Tom van Aalst', goals: 0, matches: 0, photo: 'photos/tom-van-aalst.jpg' },
    { id: 3, name: 'Lucas van den Berg', goals: 0, matches: 0, photo: 'photos/lucas-van-den-berg.jpg' },
    { id: 4, name: 'Willem van Diemen', goals: 0, matches: 0, photo: 'photos/willem-van-diemen.jpg' },
    { id: 5, name: 'Joris Kortenaar', goals: 0, matches: 0, photo: 'photos/joris-kortenaar.jpg' },
    { id: 6, name: 'Daan Loose', goals: 0, matches: 0, photo: 'photos/daan-loose.jpg' },
    { id: 7, name: 'Pim van der Moolen', goals: 0, matches: 0, photo: 'photos/pim-van-der-moolen.jpg' },
    { id: 8, name: 'Bas van Neer', goals: 0, matches: 0, photo: 'photos/bas-van-neer.jpg' },
    { id: 9, name: 'Jord Roest', goals: 0, matches: 0, photo: 'photos/jord-roest.jpg' },
    { id: 10, name: 'Jay Schoppink', goals: 0, matches: 0, photo: 'photos/jay-schoppink.jpg' },
    { id: 11, name: 'Dirk Swart', goals: 0, matches: 0, photo: 'photos/dirk-swart.jpg' },
    { id: 12, name: 'Maurick Veldman', goals: 0, matches: 0, photo: 'photos/maurick-veldman.jpg' },
    { id: 13, name: 'Stein Visser', goals: 0, matches: 0, photo: 'photos/stein-visser.jpg' },
    { id: 14, name: 'Hylke van der Wal', goals: 0, matches: 0, photo: 'photos/hylke-van-der-wal.jpg' },
    { id: 15, name: 'Joppe Pronk', goals: 0, matches: 0, captain: true, photo: 'photos/joppe-pronk.jpg' }
];

// Spelers ophalen
const players = JSON.parse(localStorage.getItem('hockeyPlayers')) || defaultPlayers;

// Initialen maken
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

// Achternaam ophalen
function getLastName(name) {
    const parts = name.split(' ');
    // Skip tussenvoegels als "van", "de", "van der" etc.
    if (parts.length >= 2) {
        return parts[parts.length - 1];
    }
    return parts[0];
}

// Avatar HTML genereren
function getAvatarHtml(player) {
    const captainClass = player.captain ? ' captain' : '';

    if (player.photo) {
        return `<div class="player-avatar${captainClass}">
            <img src="${player.photo}" alt="${player.name}"
                onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">
        </div>`;
    }
    return `<div class="player-avatar${captainClass}">${getInitials(player.name)}</div>`;
}

// Wissel avatar HTML
function getSubAvatarHtml(player) {
    if (player.photo) {
        return `<div class="sub-avatar">
            <img src="${player.photo}" alt="${player.name}"
                onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">
        </div>`;
    }
    return `<div class="sub-avatar">${getInitials(player.name)}</div>`;
}

// Opstelling renderen
function render() {
    // Spelers in opstelling
    const lineupPlayerIds = Object.values(lineup);

    // Veld posities vullen
    Object.entries(lineup).forEach(([position, playerId]) => {
        const player = players.find(p => p.id === playerId);
        const element = document.querySelector(`[data-position="${position}"]`);

        if (player && element) {
            element.innerHTML = `
                ${getAvatarHtml(player)}
                <div class="player-label">
                    <span class="player-number">${player.id}</span>
                    <span class="player-name">${getLastName(player.name)}</span>
                </div>
            `;
        }
    });

    // Wissels (spelers niet in opstelling)
    const substitutes = players.filter(p => !lineupPlayerIds.includes(p.id));
    const subsList = document.getElementById('subsList');

    if (substitutes.length === 0) {
        subsList.innerHTML = '<span style="color: #999; font-size: 12px;">Geen wissels</span>';
    } else {
        subsList.innerHTML = substitutes.map(player => `
            <div class="sub-player">
                ${getSubAvatarHtml(player)}
                <div class="sub-label">
                    <span class="sub-number">${player.id}</span>
                    <span class="sub-name">${getLastName(player.name)}</span>
                </div>
            </div>
        `).join('');
    }
}

// Start
render();
