const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Función para ordenar las categorías
function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
// Función para establecer el ID de categoría seleccionado en el almacenamiento local y redirigir a otra página
function setCatID(id) {
  localStorage.setItem("CatID", id);
  window.location = "products.html";
}

function showCategoriesList() {
  let htmlContentToAppend = "";
  const body = document.body;

  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(category.productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.productCount) <= maxCount))
    ) {
      // Agrega clases CSS específicas para el modo claro u oscuro
      const darkModeClass = body.classList.contains("dark-mode")
        ? "dark-mode" // Clase para el modo oscuro
        : ""; // Cadena vacía para el modo claro

      // Construye el HTML para cada categoría
      htmlContentToAppend += `
          <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active ${darkModeClass}">
            <div class="row">
              <div class="col-3">
                <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${category.name}</h4>
                  <small class="text-muted">${category.productCount} artículos</small>
                </div>
                <p class="mb-1">${category.description}</p>
              </div>
            </div>
          </div>
        `;
    }
  }
  // Inserta el HTML construido en el contenedor de la lista de categorías
  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
// Función para ordenar y mostrar las categorías según un criterio dado
function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

// Evento que se ejecuta cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data;
      showCategoriesList();
      //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  // Event listeners para los botones de ordenamiento
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });
  // Event listener para el botón de limpiar filtros de rango
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
    });
  // Event listener para el botón de aplicar filtro de rango
  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      // Obtiene los valores del filtro de rango y muestra la lista actualizada
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList();
    });
});
