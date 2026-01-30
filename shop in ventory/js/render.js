// ======== Universal Render Hub ========
// ======== Universal Render Hub ========
function renderAll() {
    renderProducts();
    renderSalesmen();
    renderCompanies();
    renderDefects();
    renderCustomers();
    renderPayments();
    renderPrices();
    fillSalesmanDropdown(); // <-- Add this here
    if (typeof renderDashboard === 'function') renderDashboard();
}

// Add the function at the bottom of the file
function fillSalesmanDropdown() {
    const salesmen = getData('salesmen');
    const select = document.getElementById('payName');
    if(!select) return; // Only runs if the element exists on the page
    
    select.innerHTML = '<option value="">Select Salesman</option>';
    salesmen.forEach(s => {
        select.innerHTML += `<option value="${s.name}">${s.name}</option>`;
    });
}
// 1. Products (Photo removed, Smooth Edit integrated)
function renderProducts() {
    const container = document.getElementById('productCards');
    if (!container) return;
    container.innerHTML = '';
    
    getData('products').forEach(p => {
        const isLow = p.qty <= 5;
        container.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p style="color: #94a3b8;">${p.company}</p>
            <p style="margin: 10px 0; font-weight: bold; color: ${isLow ? '#ef4444' : '#22c55e'}">
                Qty: ${p.qty} ${isLow ? '⚠️' : ''}
            </p>
            <p>Price: ₹${p.price}</p>
            <div class="card-actions">
                <button onclick="changeQty(${p.id},-1)">➖</button>
                <button onclick="changeQty(${p.id},1)">➕</button>
                <button onclick="prepareEdit(${p.id})">✏️</button>
                <button class="danger" onclick="deleteItem('products', ${p.id})">🗑️</button>
            </div>
        </div>`;
    });
}

// 2. Companies (Photo removed, Branch added, Smooth Edit integrated)
function renderCompanies() {
    const container = document.getElementById('companyCards');
    if (!container) return;
    container.innerHTML = '';
    getData('companies').forEach(c => {
        container.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>
            <p><strong>Branch:</strong> ${c.branch || 'Main'}</p>
            <div class="card-actions">
                <button onclick="prepareCompanyEdit(${c.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('companies', ${c.id})">🗑 Delete</button>
            </div>
        </div>`;
    });
}

// 3. Salesmen (Table View)
function renderSalesmen() {
    const table = document.getElementById('salesmanTable');
    if (!table) return;
    table.innerHTML = '';
    getData('salesmen').forEach(s => {
        table.innerHTML += `<tr>
            <td>${s.name}</td><td>${s.mobile}</td><td>${s.area}</td>
            <td>
                <button onclick="editItem('salesmen', ${s.id})">✏ Edit</button>
                <button class="danger" onclick="deleteItem('salesmen', ${s.id})">🗑 Delete</button>
            </td>
        </tr>`;
    });
}

// 4. Defective (Table View)
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

// 5. Customer Payments (Table View)
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

// 6. Salesman Payments (Table View)
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

// --- Universal Logic ---

function deleteItem(type, id) {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    // Force ID to be a number just in case
    const targetId = Number(id);
    let data = getData(type);
    
    const initialLength = data.length;
    data = data.filter(item => Number(item.id) !== targetId);
    
    if (data.length === initialLength) {
        console.warn(`Item with ID ${id} not found in ${type}`);
    }

    saveData(type, data);
    renderAll();
}

// Simple Edit for Table-based data
function editItem(type, id) {
    let arr = getData(type);
    const item = arr.find(i => i.id === id);
    if(!item) return;

    if(type === 'salesmen') {
        item.name = prompt('Name', item.name) || item.name;
        item.mobile = prompt('Mobile', item.mobile) || item.mobile;
        item.area = prompt('Area', item.area) || item.area;
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

function renderPrices(){
    const priceTable = document.getElementById('priceTable');
    if(!priceTable) return;
    priceTable.innerHTML='';
    getData('products').forEach(p=>priceTable.innerHTML+=`<tr><td>${p.name}</td><td>${p.company}</td><td>₹${p.price}</td></tr>`);
}