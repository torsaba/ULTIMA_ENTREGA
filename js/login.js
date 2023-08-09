document.addEventListener("DOMContentLoaded", () => {
  const inicioSesion = document.getElementById("iniciar_sesion"); // submit

  inicioSesion.addEventListener("click", function (event) {
    event.preventDefault(); // para que el submit no funciona default y recargue la pagina

    const email = document.querySelector('input[name="email"]').value; // guarda el email
    const password = document.querySelector('input[name="password"]').value; // guarda el password

    if (email.includes("@") && password) {
      // evalua que sea correcto (condicion que siempre se cumple)
      window.location.href = "./index.html"; // redirecciona al index
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

/* faltaría que guarde el "Recordarme", y si eso pasa, que el usuario al entrar al login,
lo rediriga a la pagina, no se como hacerlo */

regBtn.addEventListener("click", function loginUser() {
  // *PENDIENTE* Validar login

  // Guarda el estado de la sesión en el storage del navegador
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html"; // Ir a la página principal
});
