document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "./login.html"; // Redirige al inicio de sesión si no está logueado
      return;
    }
  
    // Rellenar el campo de correo electrónico
    const email = localStorage.getItem("username");
    document.querySelector('input[name="email"]').value = email;
  
    // Obtener datos del perfil del localStorage (si existen)
    const nombre = localStorage.getItem("nombre") || "";
    const segundoNombre = localStorage.getItem("segundoNombre") || "";
    const apellido = localStorage.getItem("apellido") || "";
    const segundoApellido = localStorage.getItem("segundoApellido") || "";
    const telefono = localStorage.getItem("telefono") || "";
  
    // Rellenar los campos del perfil
    document.querySelector('input[name="nombre"]').value = nombre;
    document.querySelector('input[name="segundoNombre"]').value = segundoNombre;
    document.querySelector('input[name="apellido"]').value = apellido;
    document.querySelector('input[name="segundoApellido"]').value = segundoApellido;
    document.querySelector('input[name="telefono"]').value = telefono;
  });
  