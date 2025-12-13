const logout = document.querySelector(".logout");

const Logout = () => {
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
  }, 800);
};
logout.addEventListener("click", Logout);
