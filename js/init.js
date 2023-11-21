const CATEGORIES_URL = "http://localhost:3000/cats";
// const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
// const PRODUCTS_URL = `https://localhost:3000/cats_products/${id}.json`;
// const PRODUCT_INFO_URL = `https://localhost:3000/products/${id}.json`;
// const PRODUCT_INFO_COMMENTS_URL = `https://localhost:3000/products_comments/${id}.json`;
// const CART_INFO_URL = "";
// const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
// const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}