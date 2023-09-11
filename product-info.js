
function reloadProductInfo(id) {
  localStorage.setItem("selectedProductId", id);
  location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  const productID = localStorage.getItem("selectedProductId");

  function chargeProductInfo(data) {
    const title = document.getElementById("prodTitle");
    const description = document.getElementById("prodDescription");
    const price = document.getElementById("prodPrice");
    const soldCount = document.getElementById("prodSoldCount");
    const productImages = document.getElementById("imgContainer");
    const oldPrice = document.getElementById("oldPrice");
    const relatedProducts = document.getElementById("relProdContainer");
    const carouselIndicators = document.getElementById("cIndicators");

    title.textContent = data.name;
    description.textContent = data.description;
    price.textContent =
      data.currency + " " + Intl.NumberFormat("es-ES").format(data.cost);
    soldCount.textContent += " " + data.soldCount;
    oldPrice.textContent =
      data.currency +
      " " +
      Intl.NumberFormat("es-ES").format(data.cost + data.cost * 0.5);
    data.images.forEach((image, index) => {
      productImages.innerHTML += `<div class="carousel-item">
              <img src="${image}" class="d-block img-thumbnail rounded mx-auto w-100" alt="..." />
            </div>`;
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" aria-current="true" aria-label="Slide ${index}"></button>`;
    });

    carouselIndicators.firstElementChild.classList.add("active");
    productImages.firstElementChild.classList.add("active");

    data.relatedProducts.forEach((product) => {
      relatedProducts.innerHTML += `<div class="col-md-3">
            <div class="card">
              <img src="${product.image}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <button class="btn btn-primary" onclick="reloadProductInfo(${product.id})">Comprar</button>
              </div>
            </div>
          </div>`;
    });
  }

  function fetchProductInfo(id) {
    getJSONData(`https://japceibal.github.io/emercado-api/products/${id}.json`)
      .then((result) => {
        chargeProductInfo(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  if (productID){
     fetchProductInfo(productID);
     fetchProductComment(productID);
  }
else{
  alert("No hay producto seleccionado.");
}


    function fetchProductComment(id) {
      getJSONData(`https://japceibal.github.io/emercado-api/products_comments/${id}.json`)
        .then((result) => {
          displayProductComments(result.data);
        })
        .catch((error) => {
          alert(error);
        });
    }

    
    function displayProductComments(comments) {
      const commentsContainer = document.getElementById("comments-container");
    
      commentsContainer.innerHTML = "";
    
      comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
    
        const userElement = document.createElement("p");
        userElement.textContent = `User: ${comment.user}`;
    
        const scoreElement = document.createElement("p");
        scoreElement.textContent = `Score: ${comment.score}`;
    
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${comment.description}`;
    
        const dateTimeElement = document.createElement("p");
        dateTimeElement.textContent = `Date and Time: ${comment.dateTime}`;
    
        commentDiv.appendChild(userElement);
        commentDiv.appendChild(scoreElement);
        commentDiv.appendChild(descriptionElement);
        commentDiv.appendChild(dateTimeElement);
    
        commentsContainer.appendChild(commentDiv);
      });
    }
    



})
