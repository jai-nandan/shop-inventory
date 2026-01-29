const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Global state to track what we are editing
let editMode = { active: false, id: null, category: null };

// Universal Delete function
function deleteItem(category, id) {
    if (confirm("Are you sure you want to delete this?")) {
        let items = getData(category);
        items = items.filter(i => i.id !== id);
        saveData(category, items);
        location.reload(); 
    }
}