const LIST_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let productsArray;

function showProductList(array) {
  let htmlContentToAppend = "";
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
  document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  const selectedCatID = localStorage.getItem("selectedCatID");
  if (selectedCatID) {
      const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${selectedCatID}.json`;

      getJSONData(LIST_URL)
          .then(function (resultObj) {
              if (resultObj.status === "ok") {
                  if (Array.isArray(resultObj.data.products)) {
                      productsArray = resultObj.data.products;
                      showProductList(productsArray);
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