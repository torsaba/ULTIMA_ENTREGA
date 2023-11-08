document.addEventListener("DOMContentLoaded", function () {
  const btnmode = document.getElementById("mode-toggle");
  let isEnabled = DarkReader.isEnabled();
  let selectedMode = localStorage.getItem("darkMode");
  const imgJumbo = document.querySelector("#jumbotron");

  if (selectedMode === "true") {
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 0,
    });
    isEnabled = true;
    imgJumbo.style.backgroundImage = "url(../img/cover_back_black_mode.png)";
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
      imgJumbo.style.backgroundImage = "url(../img/cover_back.png)";
    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 0,
      });
      imgJumbo.style.backgroundImage = "url(../img/cover_back_black_mode.png)";
    }
    isEnabled = !isEnabled;
    changeButton();

    localStorage.setItem("darkMode", isEnabled.toString());
  });
});
