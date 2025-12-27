const api = "https://fakestoreapi.com/carts";
const tableBody = document.querySelector("#carts-body");
const modal = document.querySelector(".show-product");
const overlay = document.querySelector("#overlay");

// 1. GET - Barcha savatlarni jadvalga chiqarish
const getCarts = async () => {
  const res = await fetch(api);
  const carts = await res.json();
  showCarts(carts);
};

function showCarts(carts) {
  tableBody.innerHTML = "";
  carts.forEach(({ userId, id, date, products }) => {
    tableBody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>User: ${userId}</td>
        <td>${new Date(date).toLocaleDateString()}</td>
        <td>${products.length} xil mahsulot</td>
        <td>
          <button class="btn-edit" style="color:#4cc9f0" onclick="getCartDetails(${id}, ${userId})">
            <i class="ri-eye-line"></i> View Detail
          </button>
          <button class="btn-delete" onclick="deleteCart(${id})"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>`;
  });
}

// 2. VIEW - Savat tafsilotlari, User va Total Price
async function getCartDetails(cartId, userId) {
  modal.innerHTML = "<p>Yuklanmoqda...</p>";
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  try {
    // A. User ma'lumotlarini olish
    const userRes = await fetch(`https://fakestoreapi.com/users/${userId}`);
    const userData = await userRes.json();

    // B. Savat ma'lumotlarini olish
    const cartRes = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
    const cartData = await cartRes.json();

    let totalPrice = 0;
    let productsHTML = "";

    // C. Har bir mahsulotning narxini olish va hisoblash
    for (let item of cartData.products) {
      const prodRes = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
      const prodData = await prodRes.json();
      
      const itemTotal = prodData.price * item.quantity;
      totalPrice += itemTotal;

      productsHTML += `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; border-bottom:1px solid #2e2e4e; padding-bottom:5px;">
          <img src="${prodData.image}" width="40" style="background:white; border-radius:5px">
          <div style="text-align:left; font-size:12px">
            <p>${prodData.title.slice(0, 20)}...</p>
            <p>${item.quantity} dona x $${prodData.price} = <strong>$${itemTotal.toFixed(2)}</strong></p>
          </div>
        </div>
      `;
    }

    // Modalni to'ldirish
    modal.innerHTML = `
      <h3 style="color:var(--hover-color)">Cart #${cartId} Details</h3>
      <div style="margin: 15px 0; padding: 10px; background: #1f4068; border-radius: 8px;">
        <p><i class="ri-user-line"></i> <strong>Mijoz:</strong> ${userData.name.firstname} ${userData.name.lastname}</p>
        <p><i class="ri-mail-line"></i> <strong>Email:</strong> ${userData.email}</p>
      </div>
      
      <div style="max-height: 200px; overflow-y: auto; margin-bottom: 15px;">
        ${productsHTML}
      </div>

      <div style="font-size: 20px; color: #4cc9f0; margin-bottom: 15px;">
        <strong>Total: $${totalPrice.toFixed(2)}</strong>
      </div>

      <button onclick="closeModal()" class="btn-close">Yopish</button>
    `;

  } catch (error) {
    modal.innerHTML = "<p>Xatolik yuz berdi!</p>";
  }
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

overlay.onclick = closeModal;
getCarts();