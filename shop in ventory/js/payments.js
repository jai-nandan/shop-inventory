function addSalesmanPayment() {
    let payments = getData('payments');
    const name = document.getElementById('payName').value; // Matches HTML ID
    const amount = document.getElementById('payAmount').value;

    if (!name || !amount) return alert("Please enter both Name and Amount");

    const newPayment = {
        id: Date.now(), // Unique ID added
        salesman: name,
        amount: Number(amount),
        date: new Date().toLocaleDateString()
    };

    payments.push(newPayment);
    saveData('payments', payments);
    
    // Clear inputs and refresh
    document.getElementById('payName').value = '';
    document.getElementById('payAmount').value = '';
    renderPayments(); 
}