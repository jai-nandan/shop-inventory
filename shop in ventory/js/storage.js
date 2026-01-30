// Ensure this file is loaded FIRST in your HTML
function getData(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error parsing data from localStorage", e);
        return [];
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
