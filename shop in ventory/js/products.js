
let products=getData('products');
function addProduct(){
 if(!pName.value||!pImg.files[0]){alert('Name & image required');return;}
 const r=new FileReader();
 r.onload=()=>{
  products.push({id:Date.now(),name:pName.value,company:pCompany.value,qty:+pQty.value,price:+pPrice.value,img:r.result});
  saveData('products',products);renderProducts();
 };
 r.readAsDataURL(pImg.files[0]);
}
function changeQty(id,d){
 const p=products.find(x=>x.id===id); if(!p)return; p.qty=Math.max(0,p.qty+d); saveData('products',products); renderProducts();
}
function deleteProduct(id){products=products.filter(p=>p.id!==id);saveData('products',products);renderProducts();}

function renderProducts(){
    const div = document.getElementById('productCards');
    div.innerHTML = '';
    getData('products').forEach(p => {
        const low = p.qty <= 5 ? 'low' : '';
        div.innerHTML += `
        <div class="card">
            <img src="${p.img}" onclick="modalImg('${p.img}')">
            <h3>${p.name}</h3>
            <p>Company: ${p.company}</p>
            <p class="${low}">Qty: ${p.qty} ${low?'⚠ Low':''}</p>
            <p>Price: ₹${p.price}</p>
            <button onclick="editItem('products', ${p.id})">✏ Edit</button>
            <button class="danger" onclick="deleteItem('products', ${p.id})">🗑 Delete</button>
        </div>`;
    });
}
