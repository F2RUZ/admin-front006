// Izoh: Logout funksiyasi to'g'ri yozilgan, faqat HTML dagi
// buttonga moslash uchun .logout klassini o'zgartirdik.
const logoutBtn = document.querySelector(".sidebar button");
let editId;
const Logout = () => {
  // 800ms kechikish bilan token o'chiriladi va bosh sahifaga yo'naltiriladi
  setTimeout(() => {
    localStorage.removeItem("token");
    // window.location.href = "../index.html";
  }, 800);
};

// HTML da log out tugmasi to'g'ridan-to'g'a button tagi bo'lgani uchun
// unga listener qo'yamiz
if (logoutBtn) {
  logoutBtn.addEventListener("click", Logout);
}

// --- API va Ma'lumotlarni Yuklash ---
const api = "https://fakestoreapi.com/products";
const elBody = document.querySelector(".table-body");

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
  elBody.innerHTML = "";

  // Mahsulotlar massivi ustida aylanib chiqish va HTML yaratish
  products.forEach(
    ({ title, id, price, image, category, description }, index) => {
      // Tavsif juda uzun bo'lmasligi uchun uni qisqartiramiz
      const shortDescription =
        description.length > 80
          ? description.substring(0, 77) + "..."
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
            <button onclick = 'editProduct(${id})' class="edit">
                <i class="ri-pencil-line"></i> Edit
            </button>
            <button onclick = "deleteProduct(${id})"  class="delete">
                <i class="ri-delete-bin-line"></i> Delete
            </button>
        </td>
      </tr>
    `;
    }
  );
}

//delete Products

const deleteProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        alert("Item successfull deleted");
      }
    });
};

//addProduct

const addProduct = document.querySelector(".addBtn");
const elModal = document.querySelector(".modal");
const elForm = document.querySelector(".addform");
const elCansel = document.querySelector(".cansel");

addProduct.addEventListener("click", (e) => {
  e.preventDefault();

  elModal.classList.toggle("none");
});

//closeModal

elCansel.addEventListener("click", (e) => {
  e.preventDefault();
  elModal.classList.toggle("none");
});

//elSubmit

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = elForm["title"].value.trim();
  const price = elForm["price"].value.trim();
  const description = elForm["description"].value.trim();
  const category = elForm["category"].value.trim();
  const image = elForm["image"].value.trim();

  const product = {
    title,
    price,
    description,
    category,
    image,
  };

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("successfull added");
    });
});

// edit Modal

const editModal = document.querySelector(".editModal");

const editProduct = (id) => {
  editModal.classList.toggle("none");

  editId = id;
};

//editSubmut
const editForm = document.querySelector(".editForm");

editForm.addEventListener("click", (e) => {
  e.preventDefault();

  const title = editForm["title"].value.trim();
  const price = editForm["price"].value.trim();
  const description = editForm["description"].value.trim();
  const category = editForm["category"].value.trim();
  const image = editForm["image"].value.trim();

  const pro = {
    title,
    image,
    price,
    description,
    category,
  };

  fetch(`https://fakestoreapi.com/products/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pro),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

const pathname = window.location.href;

if (pathname === "http://127.0.0.1:5501/pages/carts.html") {
  ElList.classList.add("active");
} else if (location === "http://127.0.0.1:5501/pages/dashboard.html")
  console.log(pathname);
