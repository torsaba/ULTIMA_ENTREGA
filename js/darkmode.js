document.addEventListener("DOMContentLoaded", function () {
  const btnmode = document.getElementById("mode-toggle"); // Obtiene referencia al botón de cambio de modo
  let isEnabled = DarkReader.isEnabled(); // Verifica el estado actual del modo oscuro
  let selectedMode = localStorage.getItem("darkMode"); // Obtiene el modo seleccionado almacenado localmente
  const imgJumbo = document.querySelector("#jumbotron"); // Obtiene referencia al elemento con id "jumbotron"

   // Si se seleccionó el modo oscuro previamente, lo habilita y ajusta el estilo del jumbotron y si no, lo deshabilita
  if (selectedMode === "true") {
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 0,
    });
    isEnabled = true;
    imgJumbo.classList.remove("jumbotron")
    imgJumbo.classList.add("jumbotronDark")
  } else {
    DarkReader.disable();
    isEnabled = false;
  }
  // Función para cambiar el texto del botón según el estado del modo oscuro
  function changeButton() {
    if (isEnabled) {
      btnmode.innerHTML = `<i class="fa fa-sun"></i> Modo Claro`;
    } else {
      btnmode.innerHTML = `<i class="fa fa-moon"></i> Modo Oscuro`;
    }
  }

  changeButton();
  // Agrega un evento click al botón para alternar entre modos oscuro y claro
  btnmode.addEventListener("click", () => {
    if (isEnabled) {
      DarkReader.disable();
      imgJumbo.classList.add("jumbotron")
      imgJumbo.classList.remove("jumbotronDark")

    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 0,
      });
      imgJumbo.classList.remove("jumbotron")
      imgJumbo.classList.add("jumbotronDark")
    }
    isEnabled = !isEnabled; // Invierte el estado del modo oscuro y actualiza el texto del botón
    changeButton();

    localStorage.setItem("darkMode", isEnabled.toString()); // Almacena el estado actual del modo oscuro localmente
  });
});
