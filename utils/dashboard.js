// Izoh: Logout funksiyasi to'g'ri yozilgan, faqat HTML dagi
// buttonga moslash uchun .logout klassini o'zgartirdik.
const logoutBtn = document.querySelector(".sidebar button");

const Logout = () => {
  // 800ms kechikish bilan token o'chiriladi va bosh sahifaga yo'naltiriladi
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
  }, 800);
};

// HTML da log out tugmasi to'g'ridan-to'g'a button tagi bo'lgani uchun
// unga listener qo'yamiz
if (logoutBtn) {
  logoutBtn.addEventListener("click", Logout);
}


// --- API va Ma'lumotlarni Yuklash ---
const api = "https://fakestoreapi.com/products";
const elBody = document.querySelector('.table-body');

fetch(api)
  .then((response) => {
    // Agar javob (response) muvaffaqiyatli bo'lmasa, xatolikni tashlaymiz
    if (!response.ok) {
        throw new Error(`HTTP xatosi! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    InnerData(products);
  })
  .catch((error) => {
    console.error("Ma'lumotlarni yuklashda xatolik:", error);
    elBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Ma'lumotlar bazasi bilan bog'lanishda xato yuz berdi!</td></tr>`;
  });

// --- Jadvalga Ma'lumotlarni Joylash Funksiyasi ---
function InnerData(products) {
  // Jadval body ichidagi eski kontentni tozalaymiz (agar mavjud bo'lsa)
  elBody.innerHTML = '';
  
  // Mahsulotlar massivi ustida aylanib chiqish va HTML yaratish
  products.forEach(({ title, id, price, image, category, description }, index) => {
    
    // Tavsif juda uzun bo'lmasligi uchun uni qisqartiramiz
    const shortDescription = description.length > 80 
        ? description.substring(0, 77) + '...' 
        : description;

    // Harakat (Action) tugmalarini CSS uslublariga moslashtirish uchun
    // klasslar (action-buttons, edit, delete) qo'shildi.
    elBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${title}</td>
        <td>${category}</td>
        <td>${shortDescription}</td>
        <td>$${price.toFixed(2)}</td>
        <td>
          <img width="60" height="60" src=${image} alt=${title} style="object-fit: contain;">
        </td>
        <td class="action-buttons">
            <button class="view">
                <i class="ri-eye-line"></i> View
            </button>
            <button class="edit">
                <i class="ri-pencil-line"></i> Edit
            </button>
            <button class="delete">
                <i class="ri-delete-bin-line"></i> Delete
            </button>
        </td>
      </tr>
    `;
  });

  console.log(`Jadvalga ${products.length} ta mahsulot muvaffaqiyatli yuklandi.`);
}