// ===== HELPERS =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function isValidUrl(str) {
    if (!str) return true;
    try {
        const url = new URL(str, window.location.origin);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function safeJsonParse(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        if (data === null) return fallback;
        return JSON.parse(data);
    } catch {
        return fallback;
    }
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getFirstName(name) {
    return name.split(' ')[0];
}

function renderAvatar(player, cssClass) {
    const initials = escapeHtml(getInitials(player.name));
    const name = escapeHtml(player.name);
    if (player.photo && isValidUrl(player.photo)) {
        const photo = escapeHtml(player.photo);
        return `<div class="${cssClass}">`
            + `<img src="${photo}" alt="${name}" onerror="this.style.display='none'; this.parentElement.textContent='${initials}'">`
            + `</div>`;
    }
    return `<div class="${cssClass}">${initials}</div>`;
}

function renderAvatarInner(player) {
    const initials = escapeHtml(getInitials(player.name));
    const name = escapeHtml(player.name);
    if (player.photo && isValidUrl(player.photo)) {
        const photo = escapeHtml(player.photo);
        return `<img src="${photo}" alt="${name}" onerror="this.style.display='none'; this.parentElement.textContent='${initials}'">`;
    }
    return initials;
}

// ===== SPELERS DATA =====
const defaultPlayers = [
    { id: 1,  nummer: 1,  name: 'Floris',              goals: 1, assists: 0, matches: 0, diensten: 2, photo: 'photos/floris.jpg' },
    { id: 2,  nummer: 2,  name: 'Bas van Neer',        goals: 0, assists: 0, matches: 0, diensten: 0, photo: 'photos/bas-van-neer.jpg' },
    { id: 3,  nummer: 3,  name: 'Daan Loose',          goals: 1, assists: 0, matches: 0, diensten: 1, photo: 'photos/daan-loose.jpg' },
    { id: 4,  nummer: 4,  name: 'Willem van Diemen',   goals: 3, assists: 0, matches: 0, diensten: 3, photo: 'photos/willem-van-diemen.jpg' },
    { id: 5,  nummer: 6,  name: 'Jord Roest',          goals: 5, assists: 0, matches: 0, diensten: 1, photo: 'photos/jord-roest.jpg' },
    { id: 6,  nummer: 7,  name: 'Wout',                goals: 0, assists: 0, matches: 0, diensten: 1, photo: 'photos/wout.jpg' },
    { id: 7,  nummer: 8,  name: 'Dirk Swart',          goals: 2, assists: 0, matches: 0, diensten: 2, photo: 'photos/dirk-swart.jpg' },
    { id: 8,  nummer: 9,  name: 'Stein Visser',        goals: 0, assists: 0, matches: 0, diensten: 1, photo: 'photos/stein-visser.jpg' },
    { id: 9,  nummer: 10, name: 'Joris Kortenaar',     goals: 2, assists: 0, matches: 0, diensten: 1, photo: 'photos/joris-kortenaar.jpg' },
    { id: 10, nummer: 11, name: 'Pim van der Moolen',  goals: 2, assists: 0, matches: 0, diensten: 0, photo: 'photos/pim-van-der-moolen.jpg' },
    { id: 11, nummer: 12, name: 'Jay Schoppink',       goals: 1, assists: 0, matches: 0, diensten: 2, photo: 'photos/jay-schoppink.jpg' },
    { id: 12, nummer: 14, name: 'Hylke van der Wal',   goals: 0, assists: 0, matches: 0, diensten: 0, photo: 'photos/hylke-van-der-wal.jpg' },
    { id: 13, nummer: 15, name: 'Maurick Veldman',     goals: 0, assists: 0, matches: 0, diensten: 0, photo: 'photos/maurick-veldman.jpg' },
    { id: 14, nummer: 16, name: 'Lucas van den Berg',  goals: 2, assists: 0, matches: 0, diensten: 0, photo: 'photos/lucas-van-den-berg.jpg' },
    { id: 15, nummer: 19, name: 'Tom van Aalst',       goals: 0, assists: 0, matches: 0, diensten: 0, photo: 'photos/tom-van-aalst.jpg' },
    { id: 16, nummer: 19, name: 'Max van Aalst',       goals: 0, assists: 0, matches: 0, diensten: 2, photo: 'photos/max-van-aalst.jpg' },
    { id: 17, nummer: 25, name: 'Joppe Pronk',         goals: 0, assists: 0, matches: 0, diensten: 1, captain: true, photo: 'photos/joppe-pronk.jpg' }
];

let players = defaultPlayers.map(dp => {
    const stored = safeJsonParse('hockeyPlayers', []).find(p => p.id === dp.id);
    return stored ? { ...dp, ...stored, nummer: dp.nummer, name: dp.name, photo: dp.photo, captain: dp.captain } : { ...dp };
});
localStorage.setItem('hockeyPlayers', JSON.stringify(players));

function savePlayersData() {
    localStorage.setItem('hockeyPlayers', JSON.stringify(players));
}

// ===== WEDSTRIJDSCHEMA =====
const schedule = [
    { date: '2026-03-08', opponent: 'Pinoké HO25-2',    home: true,  logo: 'logos/Pinoke.jpeg' },
    { date: '2026-03-15', opponent: 'Amsterdam HO25-5',  home: false, logo: 'logos/Amsterdam.png' },
    { date: '2026-03-22', opponent: 'Hoorn HO25-1-O',    home: true,  logo: 'logos/Hoorn.webp' },
    { date: '2026-03-29', opponent: 'Reigers HO25-1',    home: true,  logo: 'logos/Reigers.webp' },
    { date: '2026-04-12', opponent: 'Kraaien HO25-1',    home: false, logo: 'logos/Kraaien.png' },
    { date: '2026-04-19', opponent: 'Pinoké HO25-2',     home: false, logo: 'logos/Pinoke.jpeg' },
    { date: '2026-05-10', opponent: 'Amsterdam HO25-5',  home: true,  logo: 'logos/Amsterdam.png' },
    { date: '2026-05-17', opponent: 'Hoorn HO25-1-O',    home: false, logo: 'logos/Hoorn.webp' },
    { date: '2026-05-31', opponent: 'Reigers HO25-1',    home: false, logo: 'logos/Reigers.webp' },
    { date: '2026-06-07', opponent: 'Kraaien HO25-1',    home: true,  logo: 'logos/Kraaien.png' }
];

function getNextMatch() {
    const today = new Date().toISOString().slice(0, 10);
    return schedule.find(m => m.date >= today) || null;
}

// Admin-ingestelde tijden per wedstrijddatum
function getMatchTimes(date) {
    return safeJsonParse('hockeyMatchTimes_' + date, { matchTime: '', gatherTime: '', awayLogo: '' });
}

function saveMatchTimes(date, times) {
    localStorage.setItem('hockeyMatchTimes_' + date, JSON.stringify(times));
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

    const nextMatch = getNextMatch();

    if (!nextMatch) {
        if (emptyState) emptyState.style.display = 'block';
        if (matchContent) matchContent.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (matchContent) matchContent.style.display = 'block';

        const times = getMatchTimes(nextMatch.date);
        const homeAway = nextMatch.home ? 'Thuis' : 'Uit';

        const matchDateEl = document.getElementById('matchDate');
        const awayTeamEl = document.getElementById('awayTeam');
        const matchTimeEl = document.getElementById('matchTime');
        const gatherTimeEl = document.getElementById('gatherTime');

        const matchHomeAwayEl = document.getElementById('matchHomeAway');

        if (matchDateEl) matchDateEl.textContent = formatDate(nextMatch.date);
        if (matchHomeAwayEl) matchHomeAwayEl.textContent = homeAway;
        if (awayTeamEl) awayTeamEl.textContent = nextMatch.opponent;
        const matchInfoEl = document.getElementById('matchInfo');
        const matchTimeItemEl = document.getElementById('matchTimeItem');
        const gatherTimeItemEl = document.getElementById('gatherTimeItem');

        const hasMatchTime = !!times.matchTime;
        const hasGatherTime = !!times.gatherTime;

        if (matchInfoEl) matchInfoEl.style.display = (hasMatchTime || hasGatherTime) ? '' : 'none';
        if (matchTimeItemEl) matchTimeItemEl.style.display = hasMatchTime ? '' : 'none';
        if (gatherTimeItemEl) gatherTimeItemEl.style.display = hasGatherTime ? '' : 'none';

        if (matchTimeEl && hasMatchTime) matchTimeEl.textContent = times.matchTime;
        if (gatherTimeEl && hasGatherTime) gatherTimeEl.textContent = times.gatherTime;

        const awayBadgeWrapper = document.getElementById('awayBadge');
        if (awayBadgeWrapper) {
            if (nextMatch.logo) {
                const logoUrl = escapeHtml(nextMatch.logo);
                const teamName = escapeHtml(nextMatch.opponent);
                awayBadgeWrapper.innerHTML = `<img src="${logoUrl}" alt="${teamName}" class="team-badge" onerror="this.parentElement.innerHTML='<div class=\\'team-badge team-badge-placeholder\\'>?</div>'">`;
            } else {
                awayBadgeWrapper.innerHTML = `<div class="team-badge team-badge-placeholder">?</div>`;
            }
        }
    }

    if (matchCard) {
        matchCard.onclick = isAdmin ? openMatchModal : null;
        matchCard.style.cursor = isAdmin ? 'pointer' : 'default';
    }
}

function openMatchModal() {
    const nextMatch = getNextMatch();
    if (!nextMatch) return;

    const times = getMatchTimes(nextMatch.date);

    document.getElementById('editMatchDate').value = nextMatch.date;
    document.getElementById('editMatchDate').disabled = true;
    document.getElementById('editAwayTeam').value = nextMatch.opponent;
    document.getElementById('editAwayTeam').disabled = true;
    document.getElementById('editAwayLogo').value = times.awayLogo || '';
    document.getElementById('editMatchTime').value = times.matchTime;
    document.getElementById('editGatherTime').value = times.gatherTime;
    document.getElementById('matchModal').classList.add('show');
}

function closeMatchModal() {
    document.getElementById('matchModal').classList.remove('show');
}

function saveMatch() {
    const nextMatch = getNextMatch();
    if (!nextMatch) return;

    const logoUrl = document.getElementById('editAwayLogo').value.trim();
    if (logoUrl && !isValidUrl(logoUrl)) {
        alert('Ongeldige logo URL');
        return;
    }

    const times = {
        matchTime: document.getElementById('editMatchTime').value,
        gatherTime: document.getElementById('editGatherTime').value,
        awayLogo: logoUrl
    };
    saveMatchTimes(nextMatch.date, times);
    renderMatch();
    closeMatchModal();
}

document.getElementById('matchModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeMatchModal();
});

// ===== ADMIN LOGIN =====
const ADMIN_PIN_HASH = '2c52330077a08ea7f0795ff8786dc5c50f160359cbb1c0fe6708ea026cfd34e3';
const ADMIN_TIMEOUT_MS = 30 * 60 * 1000; // 30 minuten
let isAdmin = false;
let adminTimeoutId = null;

async function hashPin(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function resetAdminTimeout() {
    if (adminTimeoutId) clearTimeout(adminTimeoutId);
    if (isAdmin) {
        adminTimeoutId = setTimeout(() => {
            isAdmin = false;
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('adminLoginTime');
            updateAdminUI(true);
        }, ADMIN_TIMEOUT_MS);
    }
}

// Herstel admin sessie als die recent genoeg is
(function restoreAdminSession() {
    if (sessionStorage.getItem('isAdmin') === 'true') {
        const loginTime = parseInt(sessionStorage.getItem('adminLoginTime') || '0', 10);
        if (Date.now() - loginTime < ADMIN_TIMEOUT_MS) {
            isAdmin = true;
            resetAdminTimeout();
        } else {
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('adminLoginTime');
        }
    }
})();

// Reset timeout bij user activiteit
['click', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (isAdmin) resetAdminTimeout();
    }, { passive: true });
});

function updateAdminUI(rerender) {
    const adminBtn = document.getElementById('adminBtn');
    const selectieTab = document.getElementById('selectieTab');
    if (adminBtn) adminBtn.classList.toggle('logged-in', isAdmin);
    if (selectieTab) selectieTab.style.display = isAdmin ? '' : 'none';
    document.body.classList.toggle('admin-mode', isAdmin);

    const selectieContent = document.getElementById('tab-selectie');
    if (!isAdmin && selectieContent && selectieContent.classList.contains('active')) {
        document.querySelectorAll('.tab-nav .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const wedstrijdTab = document.querySelector('[data-tab="wedstrijd"]');
        const wedstrijdContent = document.getElementById('tab-wedstrijd');
        if (wedstrijdTab) wedstrijdTab.classList.add('active');
        if (wedstrijdContent) wedstrijdContent.classList.add('active');
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
            sessionStorage.removeItem('adminLoginTime');
            if (adminTimeoutId) clearTimeout(adminTimeoutId);
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

async function submitLogin() {
    const pin = document.getElementById('pinInput').value;
    const pinHash = await hashPin(pin);
    if (pinHash === ADMIN_PIN_HASH) {
        isAdmin = true;
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('adminLoginTime', Date.now().toString());
        resetAdminTimeout();
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

document.getElementById('pinInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitLogin();
});

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
        const tabContent = document.getElementById('tab-' + tab.dataset.tab);
        if (tabContent) tabContent.classList.add('active');
    });
});

// ===== OPSTELLING =====
const defaultLineup = {
    lw: 10, cf: 11, rw: 12,
    lm: 17, lcm: 5, rcm: 2, rm: 8,
    lb: 6, cb: 4, rb: 3,
    gk: 1
};

let lineup = safeJsonParse('hockeyLineup', { ...defaultLineup });

function saveLineup() {
    localStorage.setItem('hockeyLineup', JSON.stringify(lineup));
}

function renderLineup() {
    const lineupPlayerIds = Object.values(lineup).filter(id => id !== null);

    Object.entries(lineup).forEach(([position, playerId]) => {
        const el = document.querySelector(`[data-position="${position}"]`);
        if (!el) return;

        if (playerId === null) {
            el.innerHTML = `<div class="player-empty"></div>`;
            el.removeAttribute('data-player-id');
            return;
        }

        const player = players.find(p => p.id === playerId);
        if (!player) return;

        const captainClass = player.captain ? ' captain' : '';

        el.setAttribute('data-player-id', player.id);
        el.innerHTML = `
            <div class="player-avatar${captainClass}">${renderAvatarInner(player)}</div>
            <div class="player-label">
                <span class="player-number">${player.nummer}</span>
                <span class="player-name">${escapeHtml(getFirstName(player.name))}</span>
            </div>
        `;
    });

    // Wissels
    const subs = players.filter(p => !lineupPlayerIds.includes(p.id));
    const subsList = document.getElementById('subsList');
    if (!subsList) return;

    if (subs.length === 0) {
        subsList.innerHTML = '<span style="color:#999;font-size:12px">Geen wissels</span>';
    } else {
        subsList.innerHTML = subs.map(p => `
            <div class="sub-player" data-player-id="${p.id}">
                <div class="sub-avatar">${renderAvatarInner(p)}</div>
                <div class="sub-label">
                    <span class="sub-number">${p.nummer}</span>
                    <span class="sub-name">${escapeHtml(getFirstName(p.name))}</span>
                </div>
            </div>`).join('');
    }

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
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent =
                currentStat === 'goals' ? 'Topscorers' : currentStat === 'assists' ? 'Meeste Assists' : 'Meeste Wedstrijden';
        }
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
        <button class="edit-btn minus" onclick="adjustStat(${playerId},'${escapeHtml(stat)}',-1)">&minus;</button>
        <button class="edit-btn plus" onclick="adjustStat(${playerId},'${escapeHtml(stat)}',1)">+</button>
    </div>`;
}

function renderLeaderboard() {
    const sorted = [...players].sort((a, b) => b[currentStat] - a[currentStat]);
    const label = currentStat === 'goals' ? 'goals' : currentStat === 'assists' ? 'assists' : 'wedstrijden';

    const podiumEl = document.getElementById('podium');
    if (podiumEl) {
        podiumEl.style.display = isAdmin ? 'none' : 'flex';
    }

    const listContainer = document.getElementById('leaderboardList');
    if (!listContainer) return;

    if (isAdmin) {
        listContainer.innerHTML = sorted.map((player, i) => `
            <div class="list-item">
                <div class="list-rank">${i + 1}</div>
                <div class="list-avatar">${renderAvatarInner(player)}</div>
                <div class="list-info">
                    <div class="list-name">${escapeHtml(player.name)}</div>
                </div>
                <div class="list-stat">${player[currentStat]}${editButtons(player.id, currentStat)}</div>
            </div>`).join('');
    } else {
        // Top 3 in podium
        for (let i = 1; i <= 3; i++) {
            const player = sorted[i - 1];
            const avatarEl = document.getElementById(`avatar${i}`);
            const nameEl = document.getElementById(`name${i}`);
            const statEl = document.getElementById(`stat${i}`);
            if (player && avatarEl && nameEl && statEl) {
                avatarEl.innerHTML = renderAvatarInner(player);
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
            const captainBadge = player.captain ? ` <span class="captain">(C)</span>` : '';
            return `
                <div class="list-item">
                    <div class="list-rank">${rank}</div>
                    <div class="list-avatar">${renderAvatarInner(player)}</div>
                    <div class="list-info">
                        <div class="list-name">${escapeHtml(player.name)}${captainBadge}</div>
                    </div>
                    <div class="list-stat">${player[currentStat]}</div>
                </div>`;
        }).join('');
    }
}

// ===== DIENSTEN =====
let dienstenAsc = false;

function toggleDienstenSort() {
    dienstenAsc = !dienstenAsc;
    const sortIcon = document.getElementById('sortIcon');
    const sortLabel = document.getElementById('sortLabel');
    if (sortIcon) sortIcon.classList.toggle('asc', dienstenAsc);
    if (sortLabel) sortLabel.textContent = dienstenAsc ? 'Minste eerst' : 'Meeste eerst';
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
    if (!container) return;

    if (sorted.every(p => (p.diensten || 0) === 0)) {
        container.innerHTML = '<div class="empty">Nog geen diensten geregistreerd</div>';
        return;
    }

    container.innerHTML = sorted.map((player, i) => {
        const btns = isAdmin ? `<div class="edit-btns">
            <button class="edit-btn minus" onclick="adjustDiensten(${player.id},-1)">&minus;</button>
            <button class="edit-btn plus" onclick="adjustDiensten(${player.id},1)">+</button>
        </div>` : '';

        return `
            <div class="dienst-row">
                <div class="dienst-rank">${i + 1}</div>
                <div class="dienst-avatar">${renderAvatarInner(player)}</div>
                <div class="dienst-player-name">${escapeHtml(player.name)}</div>
                <div class="dienst-total">${player.diensten || 0}${btns}</div>
            </div>`;
    }).join('');
}

// ===== SELECTIE =====
function renderSelectie() {
    const sorted = [...players].sort((a, b) => a.nummer - b.nummer);
    const container = document.getElementById('selectieList');
    if (!container) return;

    container.innerHTML = sorted.map(player => {
        const captainBadge = player.captain ? ` <span class="captain">(C)</span>` : '';

        return `
            <div class="selectie-row" onclick="openPlayerModal(${player.id})">
                <div class="selectie-nummer">${player.nummer}</div>
                <div class="selectie-avatar">${renderAvatarInner(player)}</div>
                <div class="selectie-name">${escapeHtml(player.name)}${captainBadge}</div>
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

    if (!modal || !titleEl || !nummerInput || !nameInput || !playerIdInput || !deleteBtn) return;

    if (playerId) {
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        titleEl.textContent = 'Speler bewerken';
        playerIdInput.value = playerId;
        nummerInput.value = player.nummer;
        nameInput.value = player.name;
        deleteBtn.style.display = 'block';
    } else {
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
        const player = players.find(p => p.id === parseInt(playerId));
        if (player) {
            player.nummer = nummer;
            player.name = name;
        }
    } else {
        const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
        players.push({
            id: newId,
            nummer: nummer,
            name: name,
            goals: 0,
            assists: 0,
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

    players = players.filter(p => p.id !== playerId);

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

document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePlayerModal();
});

// ===== DRAG & DROP OPSTELLING =====
let dragState = null;

function bindDragEvents() {
    document.querySelectorAll('.player[data-player-id]').forEach(el => {
        el.addEventListener('pointerdown', handlePointerDown);
    });
    document.querySelectorAll('.sub-player[data-player-id]').forEach(el => {
        el.addEventListener('pointerdown', handlePointerDown);
    });
}

function handlePointerDown(e) {
    if (!isAdmin) return;
    e.preventDefault();

    const el = e.currentTarget;
    const playerId = parseInt(el.getAttribute('data-player-id'));
    const position = el.getAttribute('data-position') || null;

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
        const avatar = el.querySelector('.player-avatar');
        const label = el.querySelector('.player-label');
        if (avatar) ghost.appendChild(avatar.cloneNode(true));
        if (label) ghost.appendChild(label.cloneNode(true));
    } else {
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

    dragState.ghost.style.display = 'none';
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    dragState.ghost.style.display = '';

    const fieldPosition = dropTarget?.closest('[data-position]');
    const subsArea = dropTarget?.closest('.substitutes') || dropTarget?.closest('#subsList');

    if (fieldPosition) {
        const targetPosition = fieldPosition.getAttribute('data-position');
        handleDropOnField(targetPosition);
    } else if (subsArea && dragState.sourcePosition) {
        handleDropOnSubs();
    }

    cleanupDrag();
}

function handleDropOnField(targetPosition) {
    const { playerId, sourcePosition } = dragState;

    if (sourcePosition === targetPosition) return;

    if (sourcePosition) {
        const targetPlayerId = lineup[targetPosition];
        lineup[targetPosition] = playerId;
        lineup[sourcePosition] = targetPlayerId;
    } else {
        lineup[targetPosition] = playerId;
    }

    saveLineup();
    renderLineup();
}

function handleDropOnSubs() {
    const { sourcePosition } = dragState;
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
renderLeaderboard();
renderDiensten();
renderSelectie();
