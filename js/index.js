document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Verifica si el usuario ha iniciado sesión consultando el valor almacenado localmente
  // Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
  }
});

// Configuración de eventos para cada elemento con id "autos", "juguetes", y "muebles" para redirigir a las paginas correspondientes cuando el usuario hace click
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
