function addSalesman() {
    let salesmen = getData('salesmen');
    const name = document.getElementById('sName').value;
    const mobile = document.getElementById('sMobile').value;
    const area = document.getElementById('sArea').value;

    if (!name || !mobile) return alert("Name and Mobile are required");

    salesmen.push({ 
        id: Date.now(), 
        name: name, 
        mobile: mobile, 
        area: area 
    });

    saveData('salesmen', salesmen);
    renderAll(); // Refresh the table
    // Clear inputs
    document.getElementById('sName').value = '';
    document.getElementById('sMobile').value = '';
    document.getElementById('sArea').value = '';
}

function prepareEdit(category, id) {
    const item = getData(category).find(i => i.id === id);
    if (!item) return alert("Item not found. Please delete and re-add.");

    editMode = { active: true, id: id, category: category };

    if (category === 'salesmen') {
        document.getElementById('sName').value = item.name;
        document.getElementById('sMobile').value = item.mobile;
        document.getElementById('sArea').value = item.area;
        document.querySelector("button[onclick='addSalesman()']").innerText = "Update";
    }
}