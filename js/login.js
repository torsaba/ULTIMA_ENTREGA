document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    window.location.href = "./index.html"; // Redirigir a la página de inicio
    return;
  } else {
    document.querySelector('input[name="email"]').value =
      localStorage.getItem("savedEmail");
    document.querySelector('input[name="password"]').value =
      localStorage.getItem("savedPassword");
  }
  const inicioSesion = document.getElementById("iniciar_sesion"); // submit

  inicioSesion.addEventListener("click", function (event) {
    event.preventDefault(); // para que el submit no funciona default y recargue la pagina

    const email = document.querySelector('input[name="email"]').value; // guarda el email
    const password = document.querySelector('input[name="password"]').value; // guarda el password

    if (email.includes("@") && password) {
      // evalua que sea correcto (condicion que siempre se cumple)
      if (document.getElementById("recordarme").checked) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }
      localStorage.setItem("isLoggedIn", true); // guarda el estado de la sesion
      window.location.href = "./index.html"; // redirecciona al index
      return;
    } else {
      const mensajeError = document.createElement("p"); // crea un mensaje de error
      mensajeError.textContent =
        "Usuario o contraseña incorrecta. Intente otra vez.";
      document.getElementById("formulario").appendChild(mensajeError);
      // esto es innecesario porque siempre da correcto el inicio

      setTimeout(function () {
        // para que el mensaje de error desaparezca
        mensajeError.remove();
      }, 2000);
    }
  });
});
