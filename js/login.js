document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    window.location.href = "./index.html"; // Redirigir a la página de inicio
    return;
  } else {
    document.querySelector('input[name="user"]').value =
      localStorage.getItem("savedEmail");
    document.querySelector('input[name="password"]').value =
      localStorage.getItem("savedPassword");
  }

  const form = document.querySelector('form'); // Obtener el formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = document.querySelector('input[name="user"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (user === 'admin@admin.com' && password === 'admin123') {
      if (document.getElementById("recordarme").checked) {
        localStorage.setItem("savedEmail", user);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.setItem("savedEmail", user);
        localStorage.setItem("savedPassword", password);
      }

      const token = "tu-clave-secreta"; // Reemplaza con la lógica para generar el token
      localStorage.setItem("token", token);

      localStorage.setItem("isLoggedIn", true);
      window.location.href = "./index.html";
    } else {
      const msgError = document.getElementById("msgError");
      msgError.classList.remove("d-none");
    }
  });

  document.getElementById("eye").addEventListener("click", function (e) {
    e.preventDefault();
    let type = document.getElementById("password").type;
    if (type == "password") {
      document.getElementById("password").type = "text";
      e.target.classList.remove("fa-eye");
      e.target.classList.add("fa-eye-slash");
    } else {
      document.getElementById("password").type = "password";
      e.target.classList.remove("fa-eye-slash");
      e.target.classList.add("fa-eye");
    }
  });
});
