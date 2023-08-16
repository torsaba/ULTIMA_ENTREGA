<<<<<<< Updated upstream
=======
// colocamos la URL de la lista de productos

const LIST_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let productsArray;


// Función para mostrar la lista de productos en la página
function showProductList(array) {
  let htmlContentToAppend = "";

// Recorriendo la colección de productos y construyendo los elementos HTML

  array.forEach((product) => {
    htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
        <div class="row">
          <div class="col-3">
            <img src="${product.image}" alt="product image" class="img-thumbnail">
          </div>
          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <div class="mb-1">
                <h4>${product.name} - ${product.currency} ${product.cost}</h4>
                <p>${product.description}</p>
              </div>
              <small class="text-muted">${product.soldCount} artículos</small>
            </div>
          </div>
        </div>
      </div>`;
  });

// Mostrando los elementos en el contenedor

  document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
}

// Esperando a que el contenido de la página esté cargado

document.addEventListener("DOMContentLoaded", function (e) {

// Obteniendo el ID de la categoría seleccionada desde el almacenamiento local

  const selectedCatID = localStorage.getItem("selectedCatID");
  if (selectedCatID) {

// Construyendo la URL de la lista de productos de la categoría seleccionada

      const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${selectedCatID}.json`;

// Haciendo una solicitud HTTP para obtener los datos JSON

      getJSONData(LIST_URL)
          .then(function (resultObj) {
              if (resultObj.status === "ok") {
                  if (Array.isArray(resultObj.data.products)) {

 // Almacenando los productos en un arreglo y mostrándolos en la página

                      productsArray = resultObj.data.products;
                      showProductList(productsArray);

// Mostrando el nombre de la categoría en la página

                      console.log(resultObj.data.products)
                      document.getElementById("nombre_articulo");
                      nombre_articulo.innerHTML = resultObj.data.catName;
                  } else {
                      console.error("Data.products is not an array:", resultObj.data.products);
                  }
              } else {
                  console.error("Error retrieving data:", resultObj.error);
              }
          })
          .catch(function (error) {
              console.error("Error retrieving data:", error);
          });
  }
});
>>>>>>> Stashed changes
