function addSalesman() {
    let salesmen = getData('salesmen');
    const name = document.getElementById('sName').value;
    const mobile = document.getElementById('sMobile').value;
    const area = document.getElementById('sArea').value;

    if (editMode.active && editMode.category === 'salesmen') {
        // Find the old one and update it
        const index = salesmen.findIndex(s => s.id === editMode.id);
        salesmen[index] = { id: editMode.id, name, mobile, area };
        editMode = { active: false, id: null, category: null };
        document.querySelector("button[onclick='addSalesman()']").innerText = "Add";
    } else {
        // Add new with unique ID
        salesmen.push({ id: Date.now(), name, mobile, area });
    }

    saveData('salesmen', salesmen);
    renderSalesmen();
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