function renderDashboard(){
    const products = getData('products');
    const companies = getData('companies');
    const salesmen = getData('salesmen');
    const customers = getData('customers');
    const payments = getData('payments');

    const lowStock = products.filter(p => p.qty <= 5).length;
    const totalReceived = customers.reduce((sum, c) => sum + c.amount, 0);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const balance = totalReceived - totalPaid;

    // Render cards
    const cards = document.getElementById('dashboardCards');
    cards.innerHTML = `
      <div class="card-dashboard">Total Products<br>${products.length}</div>
      <div class="card-dashboard">Low Stock<br>${lowStock}</div>
      <div class="card-dashboard">Companies<br>${companies.length}</div>
      <div class="card-dashboard">Salesmen<br>${salesmen.length}</div>
      <div class="card-dashboard">Money Received<br>₹${totalReceived}</div>
      <div class="card-dashboard">Money Paid<br>₹${totalPaid}</div>
      <div class="card-dashboard">Balance<br>₹${balance}</div>
    `;

    // Products per company chart
    const productCounts = {};
    products.forEach(p => { productCounts[p.company] = (productCounts[p.company] || 0) + 1; });

    new Chart(document.getElementById('productsChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(productCounts),
            datasets: [{ label: 'Products per Company', data: Object.values(productCounts), backgroundColor: '#38bdf8' }]
        },
        options: { responsive:true, plugins:{legend:{display:false}} }
    });

    // Money received vs paid chart
    new Chart(document.getElementById('moneyChart'), {
        type: 'line',
        data: {
            labels: ['Received', 'Paid'],
            datasets: [{ label: 'Money Flow', data: [totalReceived, totalPaid], backgroundColor: ['#22c55e','#ef4444'], borderColor: ['#22c55e','#ef4444'], fill:false }]
        },
        options: { responsive:true }
    });
}
