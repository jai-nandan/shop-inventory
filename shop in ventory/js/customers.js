let customers=getData('customers');function addCustomerPayment(){customers.push({name:custName.value,amount:+custAmount.value,date:new Date().toLocaleDateString()});saveData('customers',customers);renderCustomers()}
function addCustomerPayment() {
    let customers = getData('customers');
    const name = document.getElementById('custName').value;
    const amount = document.getElementById('custAmount').value;

    if (!name || !amount) return alert("Name and Amount are required");

    customers.push({
        id: Date.now(),
        name: name,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
    });

    saveData('customers', customers);
    renderAll();
    document.getElementById('custName').value = '';
    document.getElementById('custAmount').value = '';
}