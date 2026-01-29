let defects=getData('defects');function addDefect(){defects.push({product:dProduct.value,qty:+dQty.value,type:dType.value});saveData('defects',defects);renderDefects()}

function renderDefects(){
    const tbody = document.getElementById('defectTable');
    tbody.innerHTML = '';
    getData('defects').forEach(d => {
        tbody.innerHTML += `<tr>
            <td>${d.product}</td><td>${d.qty}</td><td>${d.type}</td>
            <td><button onclick="editItem('defects', ${d.id})">✏ Edit</button>
            <button class="danger" onclick="deleteItem('defects', ${d.id})">🗑 Delete</button></td>
        </tr>`;
    });
}
