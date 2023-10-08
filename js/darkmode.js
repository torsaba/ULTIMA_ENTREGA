document.addEventListener("DOMContentLoaded", function () {
  const btnmode = document.getElementById("mode-toggle");
  let isEnabled = DarkReader.isEnabled();
  let selectedMode = localStorage.getItem("darkMode");

  if (selectedMode === "true") {
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 0,
    });
    isEnabled = true;
  } else {
    DarkReader.disable();
    isEnabled = false;
  }

  function changeButton() {
    if (isEnabled) {
      btnmode.innerHTML = `<i class="fa fa-sun"></i> Modo Claro`;
    } else {
      btnmode.innerHTML = `<i class="fa fa-moon"></i> Modo Oscuro`;
    }
  }

  changeButton();

  btnmode.addEventListener("click", () => {
    if (isEnabled) {
      DarkReader.disable();
    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 0,
      });
    }
    isEnabled = !isEnabled;
    changeButton();

    localStorage.setItem("darkMode", isEnabled.toString());
  });
});