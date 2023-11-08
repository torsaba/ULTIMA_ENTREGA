document.addEventListener("DOMContentLoaded", function () {
  const btnmode = document.getElementById("mode-toggle");
  let isEnabled = DarkReader.isEnabled();
  let selectedMode = localStorage.getItem("darkMode");
  const imgJumbotrons = document.getElementsByClassName("jumbotron");

  function imgDarkMode() {
    for (let i = 0; i < imgJumbotrons.length; i++) {
      imgJumbotrons[i].style.background = "url('../img/cover_back_black_mode.png')";
      imgJumbotrons[i].style.height = "30vw";
      imgJumbotrons[i].style.padding = "5em inherit";
      imgJumbotrons[i].style.marginBottom = "0";
      imgJumbotrons[i].style.backgroundSize = "cover";
      imgJumbotrons[i].style.backgroundPosition = "center";
      imgJumbotrons[i].style.backgroundRepeat = "no-repeat";
    }
  }

  function imgLightMode() {
    for (let i = 0; i < imgJumbotrons.length; i++) {
      imgJumbotrons[i].style.background = "url('../img/cover_back.png')";
      imgJumbotrons[i].style.height = "30vw";
      imgJumbotrons[i].style.padding = "5em inherit";
      imgJumbotrons[i].style.marginBottom = "0";
      imgJumbotrons[i].style.backgroundSize = "cover";
      imgJumbotrons[i].style.backgroundPosition = "center";
      imgJumbotrons[i].style.backgroundRepeat = "no-repeat";
    }
  }

  if (selectedMode === "true") {
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 0,
    });
    isEnabled = true;
    imgDarkMode();
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
      imgLightMode();
    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 0,
      });
      imgDarkMode();
    }
    isEnabled = !isEnabled;
    changeButton();

    localStorage.setItem("darkMode", isEnabled.toString());
  });
});
