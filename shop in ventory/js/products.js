// State for the UI only
let editMode = { active: false, id: null };

function addProduct() {
    let products = getData('products');

    // Select elements explicitly
    const nameEl = document.getElementById('pName');
    const compEl = document.getElementById('pCompany');
    const qtyEl = document.getElementById('pQty');
    const priceEl = document.getElementById('pPrice');

    // Validation: Check if elements exist and have values
    if (!nameEl || !nameEl.value || isNaN(parseInt(qtyEl.value))) {
        alert('Product Name and valid Quantity are required.');
        return;
    }

    if (editMode.active) {
        // Find by Number ID
        const index = products.findIndex(p => Number(p.id) === Number(editMode.id));
        if (index !== -1) {
            products[index] = {
                id: Number(editMode.id),
                name: nameEl.value,
                company: compEl.value,
                qty: parseInt(qtyEl.value),
                price: parseFloat(priceEl.value) || 0
            };
        }
        editMode = { active: false, id: null };
        const btn = document.querySelector("button[onclick='addProduct()']");
        if(btn) btn.innerText = "Add Product";
    } else {
        products.push({
            id: Date.now(),
            name: nameEl.value,
            company: compEl.value || "General",
            qty: parseInt(qtyEl.value),
            price: parseFloat(priceEl.value) || 0
        });
    }

    saveData('products', products);
    renderAll();
    clearInputs();
}

function changeQty(id, d) {
    let products = getData('products'); // Get latest
    const p = products.find(x => x.id === id);
    if (!p) return;
    p.qty = Math.max(0, p.qty + d);
    saveData('products', products);
    renderAll();
}

function prepareEdit(id) {
    let products = getData('products'); // Get latest
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('pName').value = p.name;
    document.getElementById('pCompany').value = p.company;
    document.getElementById('pQty').value = p.qty;
    document.getElementById('pPrice').value = p.price;

    editMode = { active: true, id: id };
    document.querySelector("button[onclick='addProduct()']").innerText = "Update Product";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearInputs() {
    ['pName', 'pCompany', 'pQty', 'pPrice'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = '';
    });
}