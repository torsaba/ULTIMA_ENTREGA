document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html"; // Redirigir a la página de login
  }
    // Obtener el nombre de usuario guardado
  const username = localStorage.getItem("username");
    // Obtener el elemento donde se mostrará el nombre de usuario
  const usernameDisplay = document.getElementById("username-display");

    // Obtener el botón de cerrar sesión
    const logoutButton = document.getElementById("logout-button");


    // Si se ha encontrado un nombre de usuario, mostrarlo en la página
  if (username) {
    usernameDisplay.textContent = `${username}`;
  }
  
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("CatID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("CatID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("CatID", 103);
    window.location = "products.html";
  });
});
function logout() {
  localStorage.removeItem("isLoggedIn");
}

function toggleLogoutButton() {
  const logoutButton = document.getElementById("logout-button");

  // Alternar la visibilidad del botón de cierre de sesión
  if (logoutButton.style.display === "none") {
    logoutButton.style.display = "block";
  } else {
    logoutButton.style.display = "none";
  }
}
