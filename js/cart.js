async function cargarProductos() { //funcion que agarra los datos del json unicamente y los muestra
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");

        if (!response.ok) {
            throw new Error('No se pudo completar la solicitud.');
        }

        // si no hay errores en la solicitud se procede con:
        const data = await response.json(); // la info del .json
        const cartBody = document.getElementById("cart-products"); // toma la tabla donde van a ir los productos

        data.articles.forEach(article => {
            const newProduct = document.createElement("tr"); // se crea la celda para cada producto
            const subtotal = article.unitCost * article.count; // Calculamos el subtotal para cada producto

            // lo que se crea, esta todo, incluido el boton de eliminar la celda. Se agrega un evento que llama a la función actualizarSubtotal cuando el usuario cambie la cantidad. 
            newProduct.innerHTML = ` 
                <td><img src="${article.image}" alt="${article.name}" width="150"></td>
                <td>${article.name}</td>
                <td>${article.unitCost} ${article.currency}</td>
                <td><input class="form-control" type="number" min="0" value="${article.count}" 
                id="quantity-${article.id}" onchange="actualizarSubtotal(${article.id})"></td> 
                <td class="text-primary" id="subtotal-${article.id}">${subtotal.toFixed(2)} ${article.currency}</td>
                <td><button class="btn btn-danger" onclick="eliminarProducto(${article.id})">Eliminar</button></td>
            `;
            
            cartBody.appendChild(newProduct); // coloca la celda del producto en html mostrandose en la pagina
        });
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

document.addEventListener("DOMContentLoaded", cargarProductos); // se ejecuta la funcion con DOM

function actualizarSubtotal(productId) {
    const inputCantidad = document.getElementById(`quantity-${productId}`); // input para cantidad
    const subtotalArticulo = document.getElementById(`subtotal-${productId}`); // donde se muestra el subtotal
    const unitCost = parseFloat(inputCantidad.closest("tr").querySelector("td:nth-child(3)").textContent);
    const cantidad = inputCantidad.value; // el valor que se ingresa en el input de cantidad
    const subtotal = unitCost * cantidad; // subtotal - costo unitario * cantidad ingresada

    if (cantidad < 0 || cantidad.includes(".") || cantidad.includes(",")){ // condicion numero positivo y sin decimales
        subtotalArticulo.textContent = "Error en la cantidad de productos";
        subtotalArticulo.classList.add("text-danger");
    } else {
        subtotalArticulo.textContent = `${subtotal.toFixed(2)} USD`;
        subtotalArticulo.classList.remove("text-danger");   
    }
}



function eliminarProducto(productId) { // esta funcion elimina la celda que eligas 
    const eliminarProd = document.getElementById(`quantity-${productId}`).closest("tr"); // toma la celda de dicho producto
    if (eliminarProd) {
        eliminarProd.remove(); // verificacion siempre true, la elimina si damos click al boton
    }
}