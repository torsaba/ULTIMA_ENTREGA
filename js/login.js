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

      const username = obtenerNombreDeUsuario(email); // Obtener el nombre de usuario

      localStorage.setItem("username", username); // Guardar el nombre de usuario

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
  document
    .getElementById("eye")
    .addEventListener("click", function (e) {
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

function obtenerNombreDeUsuario(email) {
  // Aquí simulamos que obtenemos el nombre de usuario basado en el correo electrónico
  // Puedes reemplazar esto con llamadas a servicios, consultas a base de datos, etc.
  const usuariosRegistrados = {
    "usuario1@example.com": "Usuario1",
  };

  return usuariosRegistrados[email] || email; // Devuelve el nombre de usuario o el correo si no existe
}

$(function () {

  $("input[type='password'][data-eye]").each(function (i) {
    var $this = $(this),
      id = "eye-password-" + i,
      el = $("" + id);

    $this.wrap(
      $("<div/>", {
        style: "position:relative",
        id: id,
      })
    );

    $this.css({
      paddingRight: 60,
    });
    $this.after(
      $("<div/>", {
        html: "Show",
        class: "btn btn-primary btn-sm",
        id: "passeye-toggle-" + i,
      }).css({
        position: "absolute",
        right: 10,
        top: $this.outerHeight() / 2 - 12,
        padding: "2px 7px",
        fontSize: 12,
        cursor: "pointer",
      })
    );

    $this.after(
      $("<input/>", {
        type: "hidden",
        id: "passeye-" + i,
      })
    );

    var invalid_feedback = $this.parent().parent().find(".invalid-feedback");

    if (invalid_feedback.length) {
      $this.after(invalid_feedback.clone());
    }

    $this.on("keyup paste", function () {
      $("#passeye-" + i).val($(this).val());
    });
    $("#passeye-toggle-" + i).on("click", function () {
      if ($this.hasClass("show")) {
        $this.attr("type", "password");
        $this.removeClass("show");
        $(this).removeClass("btn-outline-primary");
      } else {
        $this.attr("type", "text");
        $this.val($("#passeye-" + i).val());
        $this.addClass("show");
        $(this).addClass("btn-outline-primary");
      }
    });
  });

  $(".my-login-validation").submit(function () {
    var form = $(this);
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.addClass("was-validated");
  });
});
