let cart = JSON.parse(localStorage.getItem("cart")) || {};

function calcTotal(cartObj){
  let total = 0;
  let count = 0;
  for(let key in cartObj){
    total += cartObj[key].qty * cartObj[key].price;
    count += cartObj[key].qty;
  }
  return {total,count};
}

function updateCartUI(){
  const r = calcTotal(cart);
  document.getElementById("count").textContent = r.count;
  document.getElementById("sum").textContent = r.total;
  localStorage.setItem("cart",JSON.stringify(cart));
}

function add(product){
  if(cart[product.name]){
    cart[product.name].qty++;
  }else{
    cart[product.name] = {price:product.price, qty:1};
  }
  updateCartUI();
}

fetch("products.json")
  .then(res => res.json())
  .then(PRODUCTS => {
    const shopBox = document.getElementById("shop");
    PRODUCTS.forEach((p,i)=>{
      const card = document.createElement("div");
      card.className="card";
      card.style.setProperty("--i",i);
      card.innerHTML=`
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <div class="price">${p.price} د.م</div>
        <button>أَضِفْ إِلَى السَّلَّة</button>
      `;
      card.querySelector("button").onclick=()=>add(p);
      shopBox.appendChild(card);
    });
  });

updateCartUI();
