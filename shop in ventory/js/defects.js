let defects=getData('defects');function addDefect(){defects.push({product:dProduct.value,qty:+dQty.value,type:dType.value});saveData('defects',defects);renderDefects()}

function addDefect() {
    let defects = getData('defects');
    const pName = document.getElementById('defProduct').value;
    const qty = document.getElementById('defQty').value;
    const type = document.getElementById('defType').value;

    if (!pName || !qty) return alert("Product and Quantity are required");

    defects.push({
        id: Date.now(),
        product: pName,
        qty: parseInt(qty),
        type: type
    });

    saveData('defects', defects);
    renderAll();
    // Clear
    document.getElementById('defProduct').value = '';
    document.getElementById('defQty').value = '';
}