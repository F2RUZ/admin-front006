const elForm = document.querySelector(".login-form");
const api = `https://fakestoreapi.com/auth/login`;
const handleSubmit = (e) => {
  e.preventDefault();

  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();

  const user = {
    username,
    password,
  };

  axios.post(api, user).then((data) => {
    const token = data.data.token;

    localStorage.setItem("token", token);

    window.location.href = "../pages/dashboard.html";
  });

  //fetch request

  // fetch(api, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(user),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const token = data.token;

  //     if (token) {
  //       localStorage.setItem("token", token);

  //       alert("success");

  //       window.location.href = "../pages/dashboard.html";
  //     }
  // //   });

  // const request = new XMLHttpRequest();

  // request.addEventListener("readystatechange", () => {
  //   if (request.readyState === 4) {
  //     const token = JSON.parse(request.responseText);
  //     localStorage.setItem("token", token.token);
  //     alert("success");

  //     window.location.href = "../pages/dashboard.html";
  //   }
  // });

  // request.open("POST", api);
  // request.setRequestHeader("Content-Type", "application/json");

  // request.send(JSON.stringify(user));

  // console.log(username, password);
};

elForm.addEventListener("submit", handleSubmit);
