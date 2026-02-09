// ===== SPELERS DATA =====
// Nummer/Naam/Goals/Diensten uit teamlijst
const defaultPlayers = [
    { id: 1,  nummer: 1,  name: 'Floris',              goals: 1, matches: 0, diensten: 2, photo: 'photos/floris.jpg' },
    { id: 2,  nummer: 2,  name: 'Bas van Neer',        goals: 0, matches: 0, diensten: 0, photo: 'photos/bas-van-neer.jpg' },
    { id: 3,  nummer: 3,  name: 'Daan Loose',          goals: 1, matches: 0, diensten: 1, photo: 'photos/daan-loose.jpg' },
    { id: 4,  nummer: 4,  name: 'Willem van Diemen',   goals: 3, matches: 0, diensten: 3, photo: 'photos/willem-van-diemen.jpg' },
    { id: 5,  nummer: 6,  name: 'Jord Roest',          goals: 5, matches: 0, diensten: 1, photo: 'photos/jord-roest.jpg' },
    { id: 6,  nummer: 7,  name: 'Wout',                goals: 0, matches: 0, diensten: 1, photo: 'photos/wout.jpg' },
    { id: 7,  nummer: 8,  name: 'Dirk Swart',          goals: 2, matches: 0, diensten: 2, photo: 'photos/dirk-swart.jpg' },
    { id: 8,  nummer: 9,  name: 'Stein Visser',        goals: 0, matches: 0, diensten: 1, photo: 'photos/stein-visser.jpg' },
    { id: 9,  nummer: 10, name: 'Joris Kortenaar',     goals: 2, matches: 0, diensten: 1, photo: 'photos/joris-kortenaar.jpg' },
    { id: 10, nummer: 11, name: 'Pim van der Moolen',  goals: 2, matches: 0, diensten: 0, photo: 'photos/pim-van-der-moolen.jpg' },
    { id: 11, nummer: 12, name: 'Jay Schoppink',       goals: 1, matches: 0, diensten: 2, photo: 'photos/jay-schoppink.jpg' },
    { id: 12, nummer: 14, name: 'Hylke van der Wal',   goals: 0, matches: 0, diensten: 0, photo: 'photos/hylke-van-der-wal.jpg' },
    { id: 13, nummer: 15, name: 'Maurick Veldman',     goals: 0, matches: 0, diensten: 0, photo: 'photos/maurick-veldman.jpg' },
    { id: 14, nummer: 16, name: 'Lucas van den Berg',  goals: 2, matches: 0, diensten: 0, photo: 'photos/lucas-van-den-berg.jpg' },
    { id: 15, nummer: 19, name: 'Tom van Aalst',       goals: 0, matches: 0, diensten: 0, photo: 'photos/tom-van-aalst.jpg' },
    { id: 16, nummer: 19, name: 'Max van Aalst',       goals: 0, matches: 0, diensten: 2, photo: 'photos/max-van-aalst.jpg' },
    { id: 17, nummer: 25, name: 'Joppe Pronk',         goals: 0, matches: 0, diensten: 1, captain: true, photo: 'photos/joppe-pronk.jpg' }
];

// Altijd defaultPlayers laden zodat de data actueel is
let players = defaultPlayers.map(dp => {
    const stored = (JSON.parse(localStorage.getItem('hockeyPlayers')) || []).find(p => p.id === dp.id);
    // Neem stored waarden over als ze bestaan, anders default
    return stored ? { ...dp, ...stored, nummer: dp.nummer, name: dp.name, photo: dp.photo, captain: dp.captain } : { ...dp };
});
localStorage.setItem('hockeyPlayers', JSON.stringify(players));

function savePlayersData() {
    localStorage.setItem('hockeyPlayers', JSON.stringify(players));
}

// ===== WEDSTRIJD DATA =====
const defaultMatch = {
    date: '',
    awayTeam: '',
    awayLogo: '',
    matchTime: '',
    gatherTime: ''
};

let matchData = JSON.parse(localStorage.getItem('hockeyMatch')) || { ...defaultMatch };

function saveMatchData() {
    localStorage.setItem('hockeyMatch', JSON.stringify(matchData));
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

function renderMatch() {
    const matchCard = document.querySelector('.match-card');
    const emptyState = document.getElementById('matchEmpty');
    const matchContent = document.getElementById('matchContent');

    // Check of er een wedstrijd is ingesteld
    const hasMatch = matchData.date && matchData.awayTeam;

    if (!hasMatch) {
        // Empty state tonen
        if (emptyState) emptyState.style.display = 'block';
        if (matchContent) matchContent.style.display = 'none';
    } else {
        // Wedstrijd info tonen
        if (emptyState) emptyState.style.display = 'none';
        if (matchContent) matchContent.style.display = 'block';

        document.getElementById('matchDate').textContent = formatDate(matchData.date);
        document.getElementById('awayTeam').textContent = matchData.awayTeam;
        document.getElementById('matchTime').textContent = matchData.matchTime || '--:--';
        document.getElementById('gatherTime').textContent = matchData.gatherTime || '--:--';

        // Away team badge
        const awayBadgeWrapper = document.getElementById('awayBadge');
        if (matchData.awayLogo) {
            awayBadgeWrapper.innerHTML = `<img src="${matchData.awayLogo}" alt="${matchData.awayTeam}" class="team-badge" onerror="this.parentElement.innerHTML='<div class=\\'team-badge team-badge-placeholder\\'>?</div>'">`;
        } else {
            awayBadgeWrapper.innerHTML = `<div class="team-badge team-badge-placeholder">?</div>`;
        }
    }

    // Match card klikbaar maken voor admin
    if (matchCard) {
        matchCard.onclick = isAdmin ? openMatchModal : null;
        matchCard.style.cursor = isAdmin ? 'pointer' : 'default';
    }
}

function openMatchModal() {
    document.getElementById('editMatchDate').value = matchData.date;
    document.getElementById('editAwayTeam').value = matchData.awayTeam;
    document.getElementById('editAwayLogo').value = matchData.awayLogo || '';
    document.getElementById('editMatchTime').value = matchData.matchTime;
    document.getElementById('editGatherTime').value = matchData.gatherTime;
    document.getElementById('matchModal').classList.add('show');
}

function closeMatchModal() {
    document.getElementById('matchModal').classList.remove('show');
}

function saveMatch() {
    matchData.date = document.getElementById('editMatchDate').value;
    matchData.awayTeam = document.getElementById('editAwayTeam').value.trim() || 'Tegenstander';
    matchData.awayLogo = document.getElementById('editAwayLogo').value.trim();
    matchData.matchTime = document.getElementById('editMatchTime').value;
    matchData.gatherTime = document.getElementById('editGatherTime').value;
    saveMatchData();
    renderMatch();
    closeMatchModal();
}

// Modal sluiten bij klik buiten
document.getElementById('matchModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeMatchModal();
});

// ===== COMPETITIE DATA =====
const defaultStand = [
    { pos: 1, team: 'Rood-Wit HO25-1-O', played: 8, points: 19, wins: 6, draws: 1, losses: 1, diff: 21 },
    { pos: 2, team: 'Reigers HO25-1', played: 8, points: 19, wins: 6, draws: 1, losses: 1, diff: 5 },
    { pos: 3, team: 'Pinoké HO25-3', played: 8, points: 9, wins: 3, draws: 0, losses: 5, diff: -3 },
    { pos: 4, team: 'Terriërs HO25-1', played: 8, points: 7, wins: 2, draws: 1, losses: 5, diff: -14, isUs: true },
    { pos: 5, team: 'Qui Vive HO25-2', played: 8, points: 4, wins: 1, draws: 1, losses: 6, diff: -9 }
];

const defaultUitslagen = [
    { id: 1, date: '2024-11-30', home: 'Qui Vive HO25-2', away: 'Rood-Wit HO25-1-O', scoreHome: 4, scoreAway: 5 },
    { id: 2, date: '2024-11-23', home: 'Terriërs HO25-1', away: 'Pinoké HO25-3', scoreHome: 2, scoreAway: 5, isOurs: true, scorers: [], dienpieten: [], processed: true },
    { id: 3, date: '2024-11-16', home: 'Pinoké HO25-3', away: 'Reigers HO25-1', scoreHome: 1, scoreAway: 3 },
    { id: 4, date: '2024-11-16', home: 'Rood-Wit HO25-1-O', away: 'Terriërs HO25-1', scoreHome: 8, scoreAway: 0, isOurs: true, scorers: [], dienpieten: [], processed: true },
    { id: 5, date: '2024-11-09', home: 'Qui Vive HO25-2', away: 'Pinoké HO25-3', scoreHome: 3, scoreAway: 2 },
    { id: 6, date: '2024-11-09', home: 'Reigers HO25-1', away: 'Terriërs HO25-1', scoreHome: 5, scoreAway: 4, isOurs: true, scorers: [], dienpieten: [], processed: true },
    { id: 7, date: '2024-11-02', home: 'Terriërs HO25-1', away: 'Qui Vive HO25-2', scoreHome: 4, scoreAway: 3, isOurs: true, scorers: [], dienpieten: [], processed: true },
    { id: 8, date: '2024-11-02', home: 'Reigers HO25-1', away: 'Rood-Wit HO25-1-O', scoreHome: 3, scoreAway: 2 }
];

let standData = JSON.parse(localStorage.getItem('hockeyStand')) || [...defaultStand];
let uitslagenData = JSON.parse(localStorage.getItem('hockeyUitslagen')) || [...defaultUitslagen];

function saveCompData() {
    localStorage.setItem('hockeyStand', JSON.stringify(standData));
    localStorage.setItem('hockeyUitslagen', JSON.stringify(uitslagenData));
}

// ===== HELPERS =====
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getFirstName(name) {
    return name.split(' ')[0];
}

function getAvatarContent(player) {
    if (player.photo) {
        return `<img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">`;
    }
    return getInitials(player.name);
}

// ===== ADMIN LOGIN =====
const ADMIN_PIN = '5153';
let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

function updateAdminUI(rerender) {
    document.getElementById('adminBtn').classList.toggle('logged-in', isAdmin);
    document.getElementById('selectieTab').style.display = isAdmin ? '' : 'none';
    document.body.classList.toggle('admin-mode', isAdmin);
    // Als admin uitlogt terwijl selectie tab open is, ga terug naar wedstrijd
    if (!isAdmin && document.getElementById('tab-selectie').classList.contains('active')) {
        document.querySelectorAll('.tab-nav .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelector('[data-tab="wedstrijd"]').classList.add('active');
        document.getElementById('tab-wedstrijd').classList.add('active');
    }
    if (rerender) {
        renderMatch();
        renderLineup();
        renderLeaderboard();
        renderDiensten();
        renderSelectie();
    }
}

function openLogin() {
    if (isAdmin) {
        if (confirm('Wil je uitloggen als admin?')) {
            isAdmin = false;
            sessionStorage.removeItem('isAdmin');
            updateAdminUI(true);
        }
        return;
    }
    document.getElementById('loginOverlay').classList.add('show');
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInput').classList.remove('error');
    document.getElementById('loginError').classList.remove('show');
    setTimeout(() => document.getElementById('pinInput').focus(), 100);
}

function closeLogin() {
    document.getElementById('loginOverlay').classList.remove('show');
}

function submitLogin() {
    const pin = document.getElementById('pinInput').value;
    if (pin === ADMIN_PIN) {
        isAdmin = true;
        sessionStorage.setItem('isAdmin', 'true');
        closeLogin();
        updateAdminUI(true);
    } else {
        document.getElementById('pinInput').classList.add('error');
        document.getElementById('loginError').classList.add('show');
        setTimeout(() => {
            document.getElementById('pinInput').classList.remove('error');
        }, 400);
    }
}

// Enter toets in pin input
document.getElementById('pinInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitLogin();
});

// Overlay sluiten bij klik buiten card
document.getElementById('loginOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLogin();
});

updateAdminUI();

// ===== TAB NAVIGATIE =====
document.querySelectorAll('.tab-nav .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-nav .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// ===== OPSTELLING =====
// Posities -> player id (null = lege positie)
const defaultLineup = {
    lw: 10, cf: 11, rw: 12,        // Aanval: Pim, Jay, Hylke
    lm: 17, lcm: 5, rcm: 2, rm: 8, // Middenveld: Joppe, Jord, Bas, Stein
    lb: 6, cb: 4, rb: 3,           // Verdediging: Wout, Willem, Daan
    gk: 1                           // Keeper: Floris
};

let lineup = JSON.parse(localStorage.getItem('hockeyLineup')) || { ...defaultLineup };

function saveLineup() {
    localStorage.setItem('hockeyLineup', JSON.stringify(lineup));
}

function renderLineup() {
    const lineupPlayerIds = Object.values(lineup).filter(id => id !== null);

    Object.entries(lineup).forEach(([position, playerId]) => {
        const el = document.querySelector(`[data-position="${position}"]`);
        if (!el) return;

        // Lege positie
        if (playerId === null) {
            el.innerHTML = `<div class="player-empty"></div>`;
            el.removeAttribute('data-player-id');
            return;
        }

        const player = players.find(p => p.id === playerId);
        if (!player) return;

        const captainClass = player.captain ? ' captain' : '';
        const avatarInner = player.photo
            ? `<img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">`
            : getInitials(player.name);

        el.setAttribute('data-player-id', player.id);
        el.innerHTML = `
            <div class="player-avatar${captainClass}">${avatarInner}</div>
            <div class="player-label">
                <span class="player-number">${player.nummer}</span>
                <span class="player-name">${getFirstName(player.name)}</span>
            </div>
        `;
    });

    // Wissels
    const subs = players.filter(p => !lineupPlayerIds.includes(p.id));
    const subsList = document.getElementById('subsList');

    if (subs.length === 0) {
        subsList.innerHTML = '<span style="color:#999;font-size:12px">Geen wissels</span>';
    } else {
        subsList.innerHTML = subs.map(p => {
            const avatarInner = p.photo
                ? `<img src="${p.photo}" alt="${p.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(p.name)}'">`
                : getInitials(p.name);
            return `
                <div class="sub-player" data-player-id="${p.id}">
                    <div class="sub-avatar">${avatarInner}</div>
                    <div class="sub-label">
                        <span class="sub-number">${p.nummer}</span>
                        <span class="sub-name">${getFirstName(p.name)}</span>
                    </div>
                </div>`;
        }).join('');
    }

    // Bind drag events als admin
    if (isAdmin) {
        bindDragEvents();
    }
}

// ===== RANGLIJST =====
let currentStat = 'goals';

document.querySelectorAll('#tab-ranglijst .segment').forEach(tab => {
    tab.addEventListener('click', () => {
        currentStat = tab.dataset.stat;
        document.querySelectorAll('#tab-ranglijst .segment').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('pageTitle').textContent =
            currentStat === 'goals' ? 'Topscorers' : 'Meeste Wedstrijden';
        renderLeaderboard();
    });
});

function adjustStat(playerId, stat, delta) {
    const player = players.find(p => p.id === playerId);
    if (player) {
        player[stat] = Math.max(0, (player[stat] || 0) + delta);
        savePlayersData();
        renderLeaderboard();
    }
}

function editButtons(playerId, stat) {
    if (!isAdmin) return '';
    return `<div class="edit-btns">
        <button class="edit-btn minus" onclick="adjustStat(${playerId},'${stat}',-1)">&minus;</button>
        <button class="edit-btn plus" onclick="adjustStat(${playerId},'${stat}',1)">+</button>
    </div>`;
}

function renderLeaderboard() {
    const sorted = [...players].sort((a, b) => b[currentStat] - a[currentStat]);
    const label = currentStat === 'goals' ? 'goals' : 'wedstrijden';

    // Podium tonen/verbergen op basis van admin status
    const podiumEl = document.getElementById('podium');
    if (podiumEl) {
        podiumEl.style.display = isAdmin ? 'none' : 'flex';
    }

    const listContainer = document.getElementById('leaderboardList');

    if (isAdmin) {
        // Admin: volledige lijst zoals diensten
        listContainer.innerHTML = sorted.map((player, i) => {
            const avatarInner = player.photo
                ? `<img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">`
                : getInitials(player.name);

            return `
                <div class="list-item">
                    <div class="list-rank">${i + 1}</div>
                    <div class="list-avatar">${avatarInner}</div>
                    <div class="list-info">
                        <div class="list-name">${player.name}</div>
                    </div>
                    <div class="list-stat">${player[currentStat]}${editButtons(player.id, currentStat)}</div>
                </div>`;
        }).join('');
    } else {
        // Normale gebruiker: podium + lijst vanaf 4
        // Top 3 in podium
        for (let i = 1; i <= 3; i++) {
            const player = sorted[i - 1];
            const avatarEl = document.getElementById(`avatar${i}`);
            const nameEl = document.getElementById(`name${i}`);
            const statEl = document.getElementById(`stat${i}`);
            if (player) {
                avatarEl.innerHTML = getAvatarContent(player);
                nameEl.textContent = getFirstName(player.name);
                statEl.innerHTML = `${player[currentStat]} ${label}`;
            }
        }

        // Lijst 4+
        const rest = sorted.slice(3);
        if (rest.length === 0) {
            listContainer.innerHTML = '';
            return;
        }

        listContainer.innerHTML = rest.map((player, index) => {
            const rank = index + 4;
            const captainBadge = player.captain ? ' <span class="captain">(C)</span>' : '';
            return `
                <div class="list-item">
                    <div class="list-rank">${rank}</div>
                    <div class="list-avatar">${getAvatarContent(player)}</div>
                    <div class="list-info">
                        <div class="list-name">${player.name}${captainBadge}</div>
                    </div>
                    <div class="list-stat">${player[currentStat]}</div>
                </div>`;
        }).join('');
    }
}

// ===== COMPETITIE =====
let currentCompView = 'stand';

document.querySelectorAll('#tab-competitie .segment').forEach(tab => {
    tab.addEventListener('click', () => {
        currentCompView = tab.dataset.comp;
        document.querySelectorAll('#tab-competitie .segment').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.comp-view').forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('comp-' + currentCompView).classList.add('active');
    });
});

function renderStand() {
    const container = document.getElementById('standList');

    container.innerHTML = standData.map(team => {
        const isUs = team.isUs ? ' stand-row-us' : '';
        const diffClass = team.diff > 0 ? 'positive' : (team.diff < 0 ? 'negative' : '');
        const diffStr = team.diff > 0 ? '+' + team.diff : team.diff;

        return `
            <div class="stand-row${isUs}">
                <span class="stand-pos">${team.pos}</span>
                <span class="stand-team">${team.team}</span>
                <span class="stand-col">${team.played}</span>
                <span class="stand-col stand-points">${team.points}</span>
                <span class="stand-col">${team.wins}</span>
                <span class="stand-col">${team.draws}</span>
                <span class="stand-col">${team.losses}</span>
                <span class="stand-col stand-diff ${diffClass}">${diffStr}</span>
            </div>`;
    }).join('');
}

function renderUitslagen() {
    const container = document.getElementById('uitslagenList');

    // Groepeer op datum
    const grouped = {};
    uitslagenData.forEach(match => {
        if (!grouped[match.date]) grouped[match.date] = [];
        grouped[match.date].push(match);
    });

    // Sorteer datums (nieuwste eerst)
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

    container.innerHTML = sortedDates.map(date => {
        const matches = grouped[date];
        const dateObj = new Date(date);
        const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const dateStr = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;

        const matchesHtml = matches.map(match => {
            const homeUs = match.home.includes('Terriërs') ? ' team-us' : '';
            const awayUs = match.away.includes('Terriërs') ? ' team-us' : '';

            // Admin knop voor onze wedstrijden
            let adminBtn = '';
            if (isAdmin && match.isOurs) {
                const icon = match.processed
                    ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
                    : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>';
                adminBtn = `<button class="uitslag-admin-btn${match.processed ? ' processed' : ''}" onclick="openMatchReport(${match.id})">${icon}</button>`;
            }

            return `
                <div class="uitslag-row${match.isOurs ? ' uitslag-ours' : ''}">
                    <span class="uitslag-team uitslag-home${homeUs}">${match.home}${homeUs ? ' <span class="heart">♥</span>' : ''}</span>
                    <span class="uitslag-score">${match.scoreHome} - ${match.scoreAway}</span>
                    <span class="uitslag-team uitslag-away${awayUs}">${awayUs ? '<span class="heart">♥</span> ' : ''}${match.away}</span>
                    ${adminBtn}
                </div>`;
        }).join('');

        return `
            <div class="uitslag-group">
                <div class="uitslag-date">${dateStr}</div>
                ${matchesHtml}
            </div>`;
    }).join('');
}

function renderCompetitie() {
    renderStand();
    renderUitslagen();
}

// ===== WEDSTRIJD RAPPORT =====
let currentReportMatch = null;
let reportScorers = [];
let reportDiensten = [];

function openMatchReport(matchId) {
    const match = uitslagenData.find(m => m.id === matchId);
    if (!match) return;

    currentReportMatch = match;
    reportScorers = match.scorers ? [...match.scorers] : [];
    reportDiensten = match.dienpieten ? [...match.dienpieten] : [];

    // Vul modal
    const dateObj = new Date(match.date);
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    document.getElementById('reportDate').textContent = `${days[dateObj.getDay()]} ${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
    document.getElementById('reportOpponent').textContent = match.home.includes('Terriërs') ? match.away : match.home;
    document.getElementById('reportScore').textContent = `${match.scoreHome} - ${match.scoreAway}`;

    // Bepaal of we thuis of uit speelden
    const weHome = match.home.includes('Terriërs');
    const ourScore = weHome ? match.scoreHome : match.scoreAway;
    const theirScore = weHome ? match.scoreAway : match.scoreHome;
    const resultText = ourScore > theirScore ? 'Gewonnen' : (ourScore < theirScore ? 'Verloren' : 'Gelijk');
    const resultClass = ourScore > theirScore ? 'win' : (ourScore < theirScore ? 'loss' : 'draw');
    document.getElementById('reportResult').textContent = resultText;
    document.getElementById('reportResult').className = 'report-result ' + resultClass;

    renderReportScorers();
    renderReportDiensten();

    document.getElementById('matchReportModal').classList.add('show');
}

function closeMatchReport() {
    document.getElementById('matchReportModal').classList.remove('show');
    currentReportMatch = null;
}

function renderReportScorers() {
    const container = document.getElementById('reportScorersList');
    const ourScore = currentReportMatch.home.includes('Terriërs')
        ? currentReportMatch.scoreHome
        : currentReportMatch.scoreAway;

    if (ourScore === 0) {
        container.innerHTML = '<div class="report-empty">Geen doelpunten</div>';
        return;
    }

    container.innerHTML = `
        <div class="report-player-grid">
            ${players.map(p => {
                const count = reportScorers.filter(id => id === p.id).length;
                return `
                    <div class="report-player-item${count > 0 ? ' active' : ''}" data-player="${p.id}">
                        <span class="report-player-name">${getFirstName(p.name)}</span>
                        <div class="report-player-controls">
                            <button class="report-btn minus" onclick="adjustReportScorer(${p.id}, -1)">−</button>
                            <span class="report-player-count">${count}</span>
                            <button class="report-btn plus" onclick="adjustReportScorer(${p.id}, 1)">+</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>
        <div class="report-total">Totaal: <strong>${reportScorers.length}</strong> / ${ourScore} goals</div>
    `;
}

function adjustReportScorer(playerId, delta) {
    if (delta > 0) {
        reportScorers.push(playerId);
    } else {
        const idx = reportScorers.lastIndexOf(playerId);
        if (idx > -1) reportScorers.splice(idx, 1);
    }
    renderReportScorers();
}

function renderReportDiensten() {
    const container = document.getElementById('reportDienstenList');

    container.innerHTML = `
        <div class="report-player-grid">
            ${players.map(p => {
                const hasDienst = reportDiensten.includes(p.id);
                return `
                    <div class="report-player-chip${hasDienst ? ' active' : ''}" onclick="toggleReportDienst(${p.id})">
                        ${getFirstName(p.name)}
                    </div>`;
            }).join('')}
        </div>
    `;
}

function toggleReportDienst(playerId) {
    const idx = reportDiensten.indexOf(playerId);
    if (idx > -1) {
        reportDiensten.splice(idx, 1);
    } else {
        reportDiensten.push(playerId);
    }
    renderReportDiensten();
}

function saveMatchReport() {
    if (!currentReportMatch) return;

    // Update goals voor scorers
    const oldScorers = currentReportMatch.scorers || [];

    // Verwijder oude goals (alleen als niet al processed)
    if (!currentReportMatch.processed) {
        // Eerste keer opslaan, voeg goals toe
        reportScorers.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.goals++;
        });

        // Voeg diensten toe
        reportDiensten.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.diensten = (player.diensten || 0) + 1;
        });
    } else {
        // Update: bereken verschil
        // Goals: verwijder oude, voeg nieuwe toe
        oldScorers.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.goals = Math.max(0, player.goals - 1);
        });
        reportScorers.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.goals++;
        });

        // Diensten: verwijder oude, voeg nieuwe toe
        const oldDiensten = currentReportMatch.dienpieten || [];
        oldDiensten.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.diensten = Math.max(0, (player.diensten || 0) - 1);
        });
        reportDiensten.forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (player) player.diensten = (player.diensten || 0) + 1;
        });
    }

    // Update match data
    currentReportMatch.scorers = [...reportScorers];
    currentReportMatch.dienpieten = [...reportDiensten];
    currentReportMatch.processed = true;

    // Save alles
    savePlayersData();
    saveCompData();

    // Re-render
    renderCompetitie();
    renderLeaderboard();
    renderDiensten();

    closeMatchReport();
}

// Modal sluiten bij klik buiten
document.getElementById('matchReportModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeMatchReport();
});

// ===== DIENSTEN =====
let dienstenAsc = false;

function toggleDienstenSort() {
    dienstenAsc = !dienstenAsc;
    document.getElementById('sortIcon').classList.toggle('asc', dienstenAsc);
    document.getElementById('sortLabel').textContent = dienstenAsc ? 'Minste eerst' : 'Meeste eerst';
    renderDiensten();
}

function adjustDiensten(playerId, delta) {
    const player = players.find(p => p.id === playerId);
    if (player) {
        player.diensten = Math.max(0, (player.diensten || 0) + delta);
        savePlayersData();
        renderDiensten();
    }
}

function renderDiensten() {
    const sorted = [...players]
        .sort((a, b) => dienstenAsc
            ? (a.diensten || 0) - (b.diensten || 0)
            : (b.diensten || 0) - (a.diensten || 0));

    const container = document.getElementById('dienstenList');

    if (sorted.every(p => (p.diensten || 0) === 0)) {
        container.innerHTML = '<div class="empty">Nog geen diensten geregistreerd</div>';
        return;
    }

    container.innerHTML = sorted.map((player, i) => {
        const avatarInner = player.photo
            ? `<img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">`
            : getInitials(player.name);

        const btns = isAdmin ? `<div class="edit-btns">
            <button class="edit-btn minus" onclick="adjustDiensten(${player.id},-1)">&minus;</button>
            <button class="edit-btn plus" onclick="adjustDiensten(${player.id},1)">+</button>
        </div>` : '';

        return `
            <div class="dienst-row">
                <div class="dienst-rank">${i + 1}</div>
                <div class="dienst-avatar">${avatarInner}</div>
                <div class="dienst-player-name">${player.name}</div>
                <div class="dienst-total">${player.diensten || 0}${btns}</div>
            </div>`;
    }).join('');
}

// ===== SELECTIE =====
function renderSelectie() {
    const sorted = [...players].sort((a, b) => a.nummer - b.nummer);
    const container = document.getElementById('selectieList');

    container.innerHTML = sorted.map(player => {
        const avatarInner = player.photo
            ? `<img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(player.name)}'">`
            : getInitials(player.name);
        const captainBadge = player.captain ? ' <span class="captain">(C)</span>' : '';

        return `
            <div class="selectie-row" onclick="openPlayerModal(${player.id})">
                <div class="selectie-nummer">${player.nummer}</div>
                <div class="selectie-avatar">${avatarInner}</div>
                <div class="selectie-name">${player.name}${captainBadge}</div>
                <div class="selectie-edit">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                </div>
            </div>`;
    }).join('');
}

// ===== SPELER MODAL =====
function openPlayerModal(playerId) {
    const modal = document.getElementById('playerModal');
    const titleEl = document.getElementById('modalTitle');
    const nummerInput = document.getElementById('editNummer');
    const nameInput = document.getElementById('editName');
    const playerIdInput = document.getElementById('editPlayerId');
    const deleteBtn = document.getElementById('deletePlayerBtn');

    if (playerId) {
        // Bewerken
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        titleEl.textContent = 'Speler bewerken';
        playerIdInput.value = playerId;
        nummerInput.value = player.nummer;
        nameInput.value = player.name;
        deleteBtn.style.display = 'block';
    } else {
        // Nieuwe speler
        titleEl.textContent = 'Nieuwe speler';
        playerIdInput.value = '';
        nummerInput.value = '';
        nameInput.value = '';
        deleteBtn.style.display = 'none';
    }

    modal.classList.add('show');
    nummerInput.focus();
}

function closePlayerModal() {
    document.getElementById('playerModal').classList.remove('show');
}

function savePlayer() {
    const playerId = document.getElementById('editPlayerId').value;
    const nummer = parseInt(document.getElementById('editNummer').value);
    const name = document.getElementById('editName').value.trim();

    if (!nummer || !name) {
        alert('Vul rugnummer en naam in');
        return;
    }

    if (playerId) {
        // Bestaande speler updaten
        const player = players.find(p => p.id === parseInt(playerId));
        if (player) {
            player.nummer = nummer;
            player.name = name;
        }
    } else {
        // Nieuwe speler toevoegen
        const newId = Math.max(...players.map(p => p.id)) + 1;
        players.push({
            id: newId,
            nummer: nummer,
            name: name,
            goals: 0,
            matches: 0,
            diensten: 0,
            photo: ''
        });
    }

    savePlayersData();
    closePlayerModal();
    renderSelectie();
    renderLeaderboard();
    renderDiensten();
    renderLineup();
}

function deletePlayer() {
    const playerId = parseInt(document.getElementById('editPlayerId').value);
    if (!playerId) return;

    const player = players.find(p => p.id === playerId);
    if (!player) return;

    if (!confirm(`Weet je zeker dat je ${player.name} wilt verwijderen?`)) return;

    // Verwijder uit players array
    players = players.filter(p => p.id !== playerId);

    // Verwijder uit lineup als die erin staat
    Object.keys(lineup).forEach(pos => {
        if (lineup[pos] === playerId) {
            lineup[pos] = null;
        }
    });

    savePlayersData();
    saveLineup();
    closePlayerModal();
    renderSelectie();
    renderLeaderboard();
    renderDiensten();
    renderLineup();
}

// Modal sluiten bij klik buiten
document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePlayerModal();
});

// ===== DRAG & DROP OPSTELLING =====
let dragState = null;

function bindDragEvents() {
    // Veld spelers
    document.querySelectorAll('.player[data-player-id]').forEach(el => {
        el.addEventListener('pointerdown', handlePointerDown);
    });
    // Wissels
    document.querySelectorAll('.sub-player[data-player-id]').forEach(el => {
        el.addEventListener('pointerdown', handlePointerDown);
    });
}

function handlePointerDown(e) {
    if (!isAdmin) return;
    e.preventDefault();

    const el = e.currentTarget;
    const playerId = parseInt(el.getAttribute('data-player-id'));
    const position = el.getAttribute('data-position') || null; // null = wissel

    // Maak ghost element
    const ghost = createGhost(el, position);
    document.body.appendChild(ghost);
    positionGhost(ghost, e.clientX, e.clientY);

    dragState = {
        playerId,
        sourcePosition: position,
        sourceElement: el,
        ghost
    };

    el.classList.add('dragging');
    document.body.classList.add('drag-active');

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
}

function createGhost(el, isFieldPlayer) {
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';

    if (isFieldPlayer) {
        // Kopieer avatar en label van veldspeler
        const avatar = el.querySelector('.player-avatar');
        const label = el.querySelector('.player-label');
        if (avatar) ghost.appendChild(avatar.cloneNode(true));
        if (label) ghost.appendChild(label.cloneNode(true));
    } else {
        // Kopieer wissel stijl
        const avatar = el.querySelector('.sub-avatar');
        const label = el.querySelector('.sub-label');
        if (avatar) ghost.appendChild(avatar.cloneNode(true));
        if (label) ghost.appendChild(label.cloneNode(true));
        ghost.classList.add('drag-ghost-sub');
    }

    return ghost;
}

function positionGhost(ghost, x, y) {
    ghost.style.left = (x - 30) + 'px';
    ghost.style.top = (y - 30) + 'px';
}

function handlePointerMove(e) {
    if (!dragState) return;
    e.preventDefault();
    positionGhost(dragState.ghost, e.clientX, e.clientY);
}

function handlePointerUp(e) {
    if (!dragState) return;

    // Verberg ghost tijdelijk voor elementFromPoint
    dragState.ghost.style.display = 'none';
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    dragState.ghost.style.display = '';

    // Bepaal drop zone
    const fieldPosition = dropTarget?.closest('[data-position]');
    const subsArea = dropTarget?.closest('.substitutes') || dropTarget?.closest('#subsList');

    if (fieldPosition) {
        const targetPosition = fieldPosition.getAttribute('data-position');
        handleDropOnField(targetPosition);
    } else if (subsArea && dragState.sourcePosition) {
        // Alleen veldspeler kan naar wissels
        handleDropOnSubs();
    }

    cleanupDrag();
}

function handleDropOnField(targetPosition) {
    const { playerId, sourcePosition } = dragState;

    if (sourcePosition === targetPosition) return; // Zelfde positie

    if (sourcePosition) {
        // Veld -> Veld: swap
        const targetPlayerId = lineup[targetPosition];
        lineup[targetPosition] = playerId;
        lineup[sourcePosition] = targetPlayerId; // kan null zijn
    } else {
        // Wissel -> Veld
        const existingPlayerId = lineup[targetPosition];
        lineup[targetPosition] = playerId;
        // Bestaande speler gaat automatisch naar wissels (niet meer in lineup)
    }

    saveLineup();
    renderLineup();
}

function handleDropOnSubs() {
    const { sourcePosition } = dragState;
    // Veldspeler naar wissels = positie wordt leeg
    lineup[sourcePosition] = null;
    saveLineup();
    renderLineup();
}

function cleanupDrag() {
    if (dragState) {
        dragState.sourceElement.classList.remove('dragging');
        dragState.ghost.remove();
        dragState = null;
    }
    document.body.classList.remove('drag-active');
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
}

// ===== INIT =====
renderMatch();
renderLineup();
renderCompetitie();
renderLeaderboard();
renderDiensten();
renderSelectie();
