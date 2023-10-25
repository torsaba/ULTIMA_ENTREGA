async function cargarProductos() {
  //funcion que agarra los datos del json unicamente y los muestra
  try {
    const response = await fetch(
      "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    );

    if (!response.ok) {
      throw new Error("No se pudo completar la solicitud.");
    }

    // si no hay errores en la solicitud se procede con:
    const data = await response.json(); // la info del .json
    const cartBody = document.getElementById("cart-products"); // toma la tabla donde van a ir los productos

    data.articles.forEach((article) => {
      const newProduct = document.createElement("tr"); // se crea la celda para cada producto
      const subtotal = article.unitCost * article.count; // Calculamos el subtotal para cada producto

      // lo que se crea, esta todo, incluido el boton de eliminar la celda. Se agrega un evento que llama a la función actualizarSubtotal cuando el usuario cambie la cantidad.
      newProduct.innerHTML = ` 
                <td><img src="${article.image}" alt="${
        article.name
      }" width="150"></td>
                <td>${article.name}</td>
                <td>${article.unitCost} ${article.currency}</td>
                <td><input class="form-control" type="number" min="0" value="${
                  article.count
                }" 
                id="quantity-${article.id}" onchange="actualizarSubtotal(${
        article.id
      })"></td> 
                <td class="text-primary" id="subtotal-${
                  article.id
                }">${subtotal.toFixed(2)} ${article.currency}</td>
                <td><button class="btn btn-danger" onclick="eliminarProducto(${
                  article.id
                })">Eliminar</button></td>
            `;

      cartBody.appendChild(newProduct); // coloca la celda del producto en html mostrandose en la pagina
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
  actualizarTotales(); // Llamamos a la función para actualizar los totales
}

function actualizarTotales() {
  let subtotalGeneral = 0;

  let costoEnvio = 0;
  let totalPagar;

  const currencyType = document.querySelector(
    'input[name="currencyType"]:checked'
  );

  const subtotales = document.querySelectorAll("[id^='subtotal-']");
  subtotales.forEach((subtotal) => {
    const subtotalValue = parseFloat(subtotal.textContent.split(" ")[0]);
    const subtotalCurrency = subtotal.textContent.split(" ")[1];
    if (subtotalCurrency == "UYU") {
      subtotalGeneral += subtotalValue / 40;
    } else {
      subtotalGeneral += subtotalValue;
    }
  });

  if (currencyType.value == "UYU") {
    subtotalGeneral *= 40;
  }

  const shippingType = document.querySelector(
    'input[name="shippingType"]:checked'
  );

  if (shippingType) {
    costoEnvio = subtotalGeneral * parseFloat(shippingType.value);
    totalPagar = subtotalGeneral + costoEnvio;

    document.getElementById("subtotal").textContent =
      currencyType.value +
      " " +
      Intl.NumberFormat("es-ES").format(subtotalGeneral);
    document
      .getElementById("shippingCost")
      .classList.remove("text-danger", "fw-bold");

    document.getElementById("shippingCost").textContent =
      currencyType.value + " " + Intl.NumberFormat("es-ES").format(costoEnvio);
    document.getElementById("total").textContent =
      currencyType.value + " " + Intl.NumberFormat("es-ES").format(totalPagar);
  } else {
    document.getElementById("subtotal").textContent =
      currencyType.value +
      " " +
      Intl.NumberFormat("es-ES").format(subtotalGeneral);
    document
      .getElementById("shippingCost")
      .classList.add("text-danger", "fw-bold");

    document.getElementById("shippingCost").textContent = "Seleccione envío";
    document.getElementById("total").textContent =
      currencyType.value +
      " " +
      Intl.NumberFormat("es-ES").format(subtotalGeneral.toFixed(2));
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos); // se ejecuta la funcion con DOM

function actualizarSubtotal(productId) {
  const inputCantidad = document.getElementById(`quantity-${productId}`); // input para cantidad
  const subtotalArticulo = document.getElementById(`subtotal-${productId}`); // donde se muestra el subtotal
  const unitCost = parseFloat(
    inputCantidad.closest("tr").querySelector("td:nth-child(3)").textContent
  );
  const cantidad = inputCantidad.value; // el valor que se ingresa en el input de cantidad
  const subtotal = unitCost * cantidad; // subtotal - costo unitario * cantidad ingresada

  if (cantidad < 0 || cantidad.includes(".") || cantidad.includes(",")) {
    // condicion numero positivo y sin decimales
    subtotalArticulo.textContent = "Error en la cantidad de productos";
    subtotalArticulo.classList.add("text-danger");
  } else {
    subtotalArticulo.textContent = `${subtotal.toFixed(2)} USD`;
    subtotalArticulo.classList.remove("text-danger");
  }
  actualizarTotales(); // Llamamos a la función para actualizar los totales
}

function eliminarProducto(productId) {
  // esta funcion elimina la celda que eligas
  const eliminarProd = document
    .getElementById(`quantity-${productId}`)
    .closest("tr"); // toma la celda de dicho producto
  if (eliminarProd) {
    eliminarProd.remove(); // verificacion siempre true, la elimina si damos click al boton
  }

  actualizarTotales(); // Llamamos a la función para actualizar los totales
}

document.addEventListener("DOMContentLoaded", function () {
  const cartTable = document.getElementById("cart-products");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartWithIndexes = cart.map((product, index) => ({
    ...product,
    index: index,
  }));

  cartWithIndexes.forEach((product) => {
    const row = document.createElement("tr");
    let productCount = 1;
    const subtotal = product.cost * product.count;
    row.innerHTML = `
            <td><img src="${product.image}" alt="${
      product.name
    }" width="150"></td>
            <td>${product.name}</td>
            <td>${product.cost} ${product.currency}
            <td><input class="form-control" type="number" min="0" value="${
              product.count
            }" 
            id="quantity-${product.index}" onchange="actualizarSubtotalNew(${
      product.index
    })"></td> 
            <td class="text-primary" id="subtotal-${
              product.index
            }">${subtotal.toFixed(2)} ${product.currency}</td>
            <td><button id="${
              product.index
            }" class="btn btn-danger" onclick="eliminarProductoNew(${
      product.index
    })">Eliminar</button></td>
        `;

    cartTable.appendChild(row);
  });
});

function actualizarSubtotalNew(productId) {
  const inputCantidad = document.getElementById(`quantity-${productId}`);
  const subtotalArticulo = document.getElementById(`subtotal-${productId}`);
  const unitCost = parseFloat(
    inputCantidad.closest("tr").querySelector("td:nth-child(3)").textContent
  );
  const cantidad = inputCantidad.value;

  if (
    cantidad === "" ||
    cantidad < 0 ||
    cantidad.includes(".") ||
    cantidad.includes(",")
  ) {
    subtotalArticulo.textContent = "Error en la cantidad de productos";
    subtotalArticulo.classList.add("text-danger");
  } else {
    const currency = inputCantidad
      .closest("tr")
      .querySelector("td:nth-child(3)")
      .textContent.split(" ")[1];
    const subtotal = unitCost * cantidad;
    subtotalArticulo.textContent = `${subtotal.toFixed(2)} ${currency}`;
    subtotalArticulo.classList.remove("text-danger");
  }
  actualizarTotales(); // Llamamos a la función para actualizar los totales
}

document.querySelectorAll('input[name="shippingType"]').forEach((input) => {
  input.addEventListener("change", actualizarTotales);
});

function eliminarProductoNew(productId) {
  // Obtén el carrito actual del Local Storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let itemRemoved = false; // Variable para rastrear si se ha eliminado un producto

  // Filtra el carrito para eliminar el producto con el mismo ID
  const updatedCart = cart.filter((item) => {
    if (item.id != productId && !itemRemoved) {
      itemRemoved = true; // Marca que se ha eliminado un producto con el mismo ID
      return false; // No incluir este producto en el carrito actualizado
    }
    return true; // Incluir otros productos en el carrito actualizado
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda el carrito actualizado en el Local Storage

  // Elimina la fila de la tabla (celda) correspondiente al producto eliminado
  const eliminarProd = document
    .getElementById(`quantity-${productId}`)
    .closest("tr");
  if (eliminarProd) {
    eliminarProd.remove();
  }
}

// Consigna 2 (Modal)
let estadoDePago = "Aún no ha seleccionado la forma de pago";
function mostrarModalDePago() {
  const modalDePago = new bootstrap.Modal(
    document.getElementById("paymentModal"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  modalDePago.show();
}

document.getElementById("confirmarPago").addEventListener("click", function () {
  const formularioDePago = document.getElementById("paymentForm");
  const formaDePagoSeleccionada = formularioDePago.querySelector(
    'input[name="tipoDePago"]:checked'
  );
  if (formaDePagoSeleccionada) {
    const tipoDePago = formaDePagoSeleccionada.value;
    estadoDePago = `Forma de pago seleccionada: ${tipoDePago}`; // Actualiza la descripción con la forma de pago seleccionada
    document.getElementById("estadoDePago").textContent = estadoDePago;
    mostrarModalDePago.hide(); // Cierra el modal después de realizar alguna acción
  } else {
    alert("Por favor, seleccione una forma de pago.");
  }
});

document.querySelectorAll('input[name="tipoDePago"]').forEach((item) => {
  item.addEventListener("change", (e) => {
    const camposTarjetaDeCredito = document.getElementById(
      "camposTarjetaDeCredito"
    );
    const camposTransferencia = document.getElementById("camposTransferencia");
    if (e.target.value === "Tarjeta de Crédito") {
      camposTarjetaDeCredito.style.display = "block"; // Muestra los campos de tarjeta de crédito
      camposTransferencia.style.display = "none"; // Oculta los campos de transferencia bancaria
    } else if (e.target.value === "Transferencia Bancaria") {
      camposTarjetaDeCredito.style.display = "none"; // Oculta los campos de tarjeta de crédito
      camposTransferencia.style.display = "block"; // Muestra los campos de transferencia bancaria
    }
    estadoDePago = `Forma de pago seleccionada: ${e.target.value}`;
    document.getElementById("estadoDePago").textContent = estadoDePago;
    actualizarTotales(); // Llamamos a la función para actualizar los totales
  });
});

document
  .getElementById("formCurrency")
  .querySelectorAll("input")
  .forEach((input) => {
    input.addEventListener("change", actualizarTotales);
  });
