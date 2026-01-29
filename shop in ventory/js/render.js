// ======== Universal Render Hub ========
function renderAll() {
    renderProducts();
    renderSalesmen();
    renderCompanies();
    renderDefects();
    renderCustomers();
    renderPayments();
    renderPrices();
    if (typeof renderDashboard === 'function') renderDashboard();
}

// 1. Products
function renderProducts() {
    const container = document.getElementById('productCards');
    if (!container) return;
    container.innerHTML = '';
    getData('products').forEach(p => {
        const low = p.qty <= 5 ? 'low' : '';
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}" onclick="modalImg('${p.img}')">
            <h3>${p.name}</h3>
            <p>Company: ${p.company}</p>
            <p class="${low}">Qty: ${p.qty} ${low ? '⚠ Low' : ''}</p>
            <button onclick="changeQty(${p.id},-1)">➖</button>
            <button onclick="changeQty(${p.id},1)">➕</button>
            <button onclick="editItem('products', ${p.id})">✏ Edit</button>
            <button class="danger" onclick="deleteItem('products', ${p.id})">🗑 Delete</button>
        </div>`;
    });
}

// 2. Companies
function renderCompanies() {
    const container = document.getElementById('companyCards');
    if (!container) return;
    container.innerHTML = '';
    getData('companies').forEach(c => {
        container.innerHTML += `
        <div class="card">
            <img class="card-logo" src="${c.logo}">
            <h3>${c.name}</h3>
            <div class="card-actions">
                <button onclick="editItem('companies', ${c.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('companies', ${c.id})">🗑 Delete</button>
            </div>
        </div>`;
    });
}

// 3. Salesmen
function renderSalesmen() {
    const table = document.getElementById('salesmanTable');
    if (!table) return;
    table.innerHTML = '';
    const salesmen = getData('salesmen');
    salesmen.forEach(s => {
        table.innerHTML += `<tr>
            <td>${s.name}</td><td>${s.mobile}</td><td>${s.area}</td>
            <td>
                <button onclick="editItem('salesmen', ${s.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('salesmen', ${s.id})">🗑 Delete</button>
            </td>
        </tr>`;
    });
}

// 4. Defective
function renderDefects() {
    const table = document.getElementById('defectTable');
    if (!table) return;
    table.innerHTML = '';
    getData('defects').forEach(d => {
        table.innerHTML += `<tr>
            <td>${d.product}</td><td>${d.qty}</td><td>${d.type}</td>
            <td>
                <button onclick="editItem('defects', ${d.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('defects', ${d.id})">🗑 Delete</button>
            </td>
        </tr>`;
    });
}

// 5. Customer Payments
function renderCustomers() {
    const table = document.getElementById('customerTable');
    if (!table) return;
    table.innerHTML = '';
    getData('customers').forEach(c => {
        table.innerHTML += `<tr>
            <td>${c.name}</td><td>₹${c.amount}</td><td>${c.date}</td>
            <td>
                <button onclick="editItem('customers', ${c.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('customers', ${c.id})">🗑 Delete</button>
            </td>
        </tr>`;
    });
}

// 6. Salesman Payments
function renderPayments() {
    const table = document.getElementById('paymentTable');
    if (!table) return;
    table.innerHTML = '';
    getData('payments').forEach(p => {
        table.innerHTML += `<tr>
            <td>${p.salesman}</td><td>₹${p.amount}</td><td>${p.date}</td>
            <td>
                <button onclick="editItem('payments', ${p.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('payments', ${p.id})">🗑 Delete</button>
            </td>
        </tr>`;
    });
}

// Universal Delete
function deleteItem(type, id) {
    if(!confirm("Are you sure?")) return;
    let data = getData(type);
    data = data.filter(item => item.id !== id);
    saveData(type, data);
    renderAll();
}

// Universal Edit
function editItem(type, id) {
    let arr = getData(type);
    const item = arr.find(i => i.id === id);
    if(!item) return alert('Error: Item ID missing. Delete and re-add this item.');

    if(type === 'products') {
        item.name = prompt('Product Name', item.name) || item.name;
        item.company = prompt('Company', item.company) || item.company;
        item.qty = +prompt('Quantity', item.qty) || item.qty;
        item.price = +prompt('Price', item.price) || item.price;
    } else if (type === 'salesmen') {
        item.name = prompt('Name', item.name) || item.name;
        item.mobile = prompt('Mobile', item.mobile) || item.mobile;
        item.area = prompt('Area', item.area) || item.area;
    } else if (type === 'companies') {
        item.name = prompt('Company Name', item.name) || item.name;
    } else if (type === 'defects') {
        item.qty = +prompt('Quantity', item.qty) || item.qty;
        item.type = prompt('Type (Defective/Replacement)', item.type) || item.type;
    } else if (type === 'customers' || type === 'payments') {
        const field = item.name ? 'name' : 'salesman';
        item[field] = prompt('Name', item[field]) || item[field];
        item.amount = +prompt('Amount', item.amount) || item.amount;
    }

    saveData(type, arr);
    renderAll();
}

// Prices and Modal Helpers
function renderPrices(){
    const priceTable = document.getElementById('priceTable');
    if(!priceTable) return;
    priceTable.innerHTML='';
    getData('products').forEach(p=>priceTable.innerHTML+=`<tr><td>${p.name}</td><td>${p.company}</td><td>₹${p.price}</td></tr>`);
}
function modalImg(src){document.getElementById('modal').style.display='flex';document.getElementById('modalImg').src=src}
