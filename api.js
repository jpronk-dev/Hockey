// ===== API HELPER (browser) =====

async function fetchData(key) {
    try {
        const res = await fetch(`/api/data?key=${encodeURIComponent(key)}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error(`fetchData(${key}) failed:`, error);
        return null;
    }
}

async function saveData(key, data) {
    const pin = sessionStorage.getItem('adminPin');
    if (!pin) {
        console.error('No admin PIN in session');
        return false;
    }
    try {
        const res = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin, key, data })
        });
        if (!res.ok) {
            const err = await res.json();
            console.error('saveData failed:', err.error);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`saveData(${key}) failed:`, error);
        return false;
    }
}

async function verifyPin(pin) {
    try {
        const res = await fetch('/api/verify-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
        });
        if (!res.ok) return false;
        const json = await res.json();
        return json.valid;
    } catch (error) {
        console.error('verifyPin failed:', error);
        return false;
    }
}
